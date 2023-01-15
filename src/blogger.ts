import { z } from "zod";
import Cache from "./cache";
import { waitUntil } from "./utils";

export const TOKEN_NAME = "gat";

export const bloggerError = z.object({
    code: z.number(),
    message: z.string(),
    status: z.string(),
    errors: z.object({
        message: z.string(),
        domain: z.string(),
        reason: z.string(),
    }).array(),
});

export const bloggerPost = z.object({
    kind: z.string(),
    id: z.string(),
    status: z.string().optional(),
    blog: z.object({
        id: z.string(),
    }),
    published: z.string(),
    updated: z.string(),
    url: z.string(),
    selfLink: z.string(),
    title: z.string(),
    content: z.string(),
    author: z.object({
        id: z.string(),
        displayName: z.string(),
        url: z.string(),
        image: z.object({
            url: z.string(),
        }),
    }),
    labels: z.string().array().optional(),
});

export type bloggerPost = z.infer<typeof bloggerPost>;

export async function getPostByPath(apiKey: string, blogId: string, path: string): Promise<bloggerPost | null> {
    const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/bypath?key=${apiKey}&path=${path}`;
    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) {
        console.log("ERROR", response);
        return null;
    }

    const maybePost = await response.json();
    const parseResult = bloggerPost.safeParse(maybePost);
    if (!parseResult.success) {
        console.error("ERROR: get blog id, parse post response", {
            error: parseResult.error.errors[0],
            response: maybePost,
        });
        return null;
    }

    return parseResult.data;
}

export async function patchPost(accessToken: string, blogId: string, postId: string, content: string): Promise<bloggerPost | null> {
    const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}`;
    const patchPayload = {
        content,
    };

    const response = await fetch(url, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(patchPayload),
    });

    if (!response.ok) {
        console.log("ERROR", response);
        return null;
    }

    const maybePost = await response.json();
    const parseResult = bloggerPost.safeParse(maybePost);
    if (!parseResult.success) {
        console.error("ERROR: get blog id, parse post response", {
            error: parseResult.error.errors[0],
            response: maybePost,
        });
        return null;
    }

    return parseResult.data;
}

export async function getAccessToken(): Promise<string> {
    let token = Cache.get(TOKEN_NAME) ?? "";

    if (token.length > 0) {
        return token;
    }

    let redirectUrl = `${document.location.protocol}//${document.location.host}${document.location.pathname}`;

    if (redirectUrl.endsWith("/")) {
        redirectUrl = redirectUrl.substring(0, redirectUrl.length - 1);
    }

    const url = `https://accounts.google.com/o/oauth2/auth?response_type=token&state=&client_id=897770756068-9idjsioh9ejl72vi8fn4vddlnpva7kle.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/blogger&redirect_uri=${redirectUrl}`;

    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.click();

    await waitUntil(() => {
        token = Cache.get(TOKEN_NAME) ?? "";
        return token.length > 0;
    }, 1000, 30000);

    return token;
}
