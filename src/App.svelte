<script lang="ts">
    import { onMount } from "svelte";

    import Editor from "./Editor.svelte";

    const urlFansub = "http://www.syncrajo.net/";

    interface BuildInfo {
        sha: string;
        ref: string;
        actor: string;
    }

    let buildInfo: BuildInfo | null = null;
    $: shortSha = buildInfo?.sha.substring(0, 7) ?? "";
    $: linkCommit = `https://github.com/FS-Frost/syncrajo-editor-plantillas/commit/${
        buildInfo?.sha ?? ""
    }`;
    $: linkBranch = `https://github.com/FS-Frost/syncrajo-editor-plantillas/tree/${
        buildInfo?.ref ?? ""
    }`;
    $: linkActor = `https://github.com/${buildInfo?.actor ?? ""}`;

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

    onMount(() => {
        loadBuildInfo();
    });
</script>

<main>
    <h1 class="title">Editor de plantillas</h1>

    <Editor />

    <div class="footer">
        <div class="container">
            <p class="text-muted text-center">
                <a href={urlFansub} target="_blank"
                    >Visítanos en SyncRajo Fansub</a
                >
            </p>

            {#if buildInfo != null}
                <p class="text-muted text-center">
                    Versión <a href={linkBranch} target="_blank"
                        ><b>{buildInfo.ref}</b></a
                    >.<a href={linkCommit} target="_blank"
                        ><b title={buildInfo.sha}>{shortSha}</b></a
                    >, desplegada por
                    <a href={linkActor} target="_blank"
                        ><b>{buildInfo.actor}</b></a
                    >
                </p>
            {/if}
        </div>
    </div>
</main>

<style>
    main {
        padding: 1em;
        margin: 0 auto;
    }

    .title {
        text-transform: uppercase;
        text-align: center;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }

        .title {
            font-size: 1.6em;
        }
    }

    .footer {
        background: white;
    }
</style>
