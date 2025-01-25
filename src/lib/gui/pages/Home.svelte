<script lang="ts">
    import { onMount } from "svelte";
    import { TOKEN_NAME } from "$lib/blogger";
    import Cache from "$lib/cache";
    import EditorLista from "./editorLista/EditorLista.svelte";
    import EditorProyecto from "./EditorProyecto.svelte";

    const urlFansub = "http://www.syncrajo.net/";

    type BuildInfo = {
        sha: string;
        ref: string;
        actor: string;
    };

    let buildInfo = $state<BuildInfo>({
        sha: "",
        ref: "",
        actor: "",
    });

    let shortSha: string = $derived(buildInfo?.sha.substring(0, 7) ?? "");

    let linkCommit: string = $derived(
        `https://github.com/FS-Frost/syncrajo-editor-plantillas/commit/${buildInfo?.sha ?? ""}`,
    );

    let linkBranch: string = $derived(
        `https://github.com/FS-Frost/syncrajo-editor-plantillas/tree/${buildInfo?.ref ?? ""}`,
    );

    let linkActor: string = $derived(
        `https://github.com/${buildInfo?.actor ?? ""}`,
    );

    async function loadBuildInfo() {
        const url = "build-info.json";
        const response = await fetch(url);

        if (!response.ok) {
            console.info(`Could not fectch ${url}`);
            return;
        }

        const info: BuildInfo = await response.json();

        if (info == null) {
            console.error("Invalid build info");
        }

        buildInfo = info;
    }

    function checkAccessToken() {
        const url = document.location.href;
        const exp = `access_token=(?<token>[^&]*).*expires_in=(?<secondsToExpire>\\d+)`;
        const regex = new RegExp(exp);
        const result = regex.exec(url);

        if (!result?.groups) {
            return;
        }

        const token = result.groups["token"] ?? "";
        const secondsToExpire = Number.parseInt(
            result.groups["secondsToExpire"],
        );

        if (token.length > 0) {
            Cache.set(TOKEN_NAME, token, secondsToExpire);
            window.close();
        }
    }

    onMount(() => {
        loadBuildInfo();
        checkAccessToken();
    });
</script>

<main>
    <EditorProyecto />
    <!-- <EditorLista /> -->

    <div class="bottom">
        <div class="container">
            <p class="text-muted text-center">
                <a href={urlFansub} target="_blank"
                    >Visítanos en SyncRajo Fansub</a
                >
            </p>

            {#if buildInfo != null}
                <p class="text-muted text-center">
                    Versión
                    <a href={linkBranch} target="_blank">
                        <b>
                            {buildInfo.ref}
                        </b>
                    </a>.<a href={linkCommit} target="_blank">
                        <b title={buildInfo.sha}>
                            {shortSha}
                        </b>
                    </a>, desplegada por
                    <a href={linkActor} target="_blank">
                        <b>
                            {buildInfo.actor}
                        </b>
                    </a>
                </p>
            {/if}
        </div>
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-rows: auto auto;
        width: 100%;
        padding: 1em;
        margin: 0 auto;
    }

    .bottom {
        background: white;
        margin-top: 0.5rem;
    }
</style>
