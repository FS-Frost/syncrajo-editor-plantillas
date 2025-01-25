import type { Octokit } from "@octokit/rest";
import { Base64 } from "js-base64";

type ListReposItem = Awaited<ReturnType<InstanceType<typeof Octokit>["rest"]["repos"]["listForUser"]>>["data"][0];

export class GitHub {
    octokit: Octokit;

    constructor(token: string) {
        this.octokit = new window.Octokit({
            auth: token,
        });
    }

    static new(token: string): GitHub {
        return new GitHub(token);
    }

    async getUser() {
        const response = await this.octokit.rest.users.getAuthenticated();
        return response.data;
    };

    async listRepos(userName: string): Promise<ListReposItem[]> {
        const data: ListReposItem[] = [];
        let requestPage = 1;

        while (requestPage < 100) {
            const response = await this.octokit.rest.repos.listForUser({
                username: userName,
                page: requestPage,
            });

            if (response.status != 200) {
                console.error("failed to list repos", { response, data });
                return data;
            }

            data.push(...response.data);

            const isLastPage: boolean = response.headers["link"]?.includes(`rel="first"`) ?? false;
            if (isLastPage) {
                break;
            }

            if (response.data.length == 0) {
                break;
            }

            requestPage++;
        }

        return data;
    };

    async getContent(owner: string, repo: string, path: string) {
        const response = await this.octokit.repos.getContent({
            owner: owner,
            repo: repo,
            path: path,
        });

        if (response.status != 200) {
            return null;
        }

        if (Array.isArray(response.data) || response.data.type !== "file") {
            return null;
        }

        return response.data;
    };

    async getBlob(owner: string, repo: string, sha: string) {
        const response = await this.octokit.git.getBlob({
            owner: owner,
            repo: repo,
            file_sha: sha,
        });

        if (!Array.isArray(response.data)) {
            return response.data;
        }

        return null;
    };

    async listFiles(owner: string, repo: string) {
        const response = await this.octokit.rest.repos.getContent({
            owner: owner,
            repo: repo,
            path: "",
        });

        return response;
    };

    async createCommit(owner: string, repo: string, path: string, content: string) {
        let sha: string | undefined;

        try {
            const actualContent = await this.getContent(owner, repo, path);
            sha = actualContent?.sha;
        } catch (error) {
            console.error(error);
        }

        const base64Content = Base64.encode(content);
        const message = `updated by octokit/rest.js at ${new Date().toLocaleString()}`;

        const response = await this.octokit.rest.repos.createOrUpdateFileContents({
            owner: owner,
            repo: repo,
            path: path,
            message: message,
            content: base64Content,
            sha: sha,
        });

        return response;
    };
}
