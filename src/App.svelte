<script lang="ts">
    import Editor from "./Editor.svelte";

    const urlFansub = "http://www.syncrajo.net/";
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
