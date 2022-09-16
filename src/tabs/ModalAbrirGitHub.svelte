<script lang="ts">
    import Modal from "../Modal.svelte";
    import { createEventDispatcher } from "svelte";
    import { GitHub } from "../github";
    import _ from "lodash";
    import Swal from "sweetalert2";
    import { Color } from "../color";
    import { decode } from "js-base64";

    interface GitHubFile {
        name: string;
        sha: string;
        size: number;
        type: string;
    }

    const KEY_REMEMBER = "remember";
    const KEY_TOKEN = "pat";
    const KEY_REPO = "repo";
    const KEY_SHA = "sha";
    const dispatch = createEventDispatcher();
    let modal: Modal;
    let token: string = "";
    let rememberSettings: boolean;
    let repos: string[] = [];
    let files: GitHubFile[] = [];
    let owner: string = "";
    let selectedRepo: string = "";
    let selectedSha: string = "";
    let debouncedTokenChanged = _.debounce(tokenChanged, 1000);
    let github: GitHub;
    let isOpen = false;

    $: token, debouncedTokenChanged();
    $: openButtonIsDisabled =
        repos.length == 0 ||
        selectedRepo?.length == 0 ||
        selectedSha?.length == 0;
    $: rememberSettings, selectedRepo, selectedSha, saveSettings();
    $: selectedRepo, onSelectedRepo();

    async function tokenChanged() {
        if (!isOpen) {
            return;
        }

        if (token == "") {
            reset();
            return;
        }

        Swal.fire({
            title: "Cargando datos de usuario",
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            github = GitHub.new(token);
            const user = await github.getUser();
            const responseRepos = await github.listRepos(user.login);
            repos = responseRepos.map((repo) => repo.name);
            owner =
                responseRepos.length > 0
                    ? responseRepos[0].owner.login ?? ""
                    : "";

            const savedRepo = localStorage.getItem(KEY_REPO);
            if (
                rememberSettings &&
                savedRepo != null &&
                repos.includes(savedRepo)
            ) {
                selectedRepo = savedRepo;
            }

            saveSettings();
        } catch (error) {
            if (Swal.isVisible()) {
                Swal.close();
            }

            await Swal.fire({
                icon: "error",
                title: "Error",
                text: `Error: ${error}`,
                confirmButtonText: "Aceptar",
                confirmButtonColor: Color.Primary,
            });
            reset();
            return;
        }

        Swal.close();
    }

    function saveSettings() {
        console.log("save settings");

        if (rememberSettings == undefined) {
            return;
        }

        localStorage.setItem(KEY_REMEMBER, rememberSettings ? "true" : "false");

        if (!rememberSettings) {
            deleteSettings();
            return;
        }

        if (token?.length > 0) {
            localStorage.setItem(KEY_TOKEN, token);
        }

        if (selectedRepo?.length > 0) {
            localStorage.setItem(KEY_REPO, selectedRepo);
        }

        if (selectedSha?.length > 0) {
            localStorage.setItem(KEY_SHA, selectedSha);
        }
    }

    function deleteSettings() {
        localStorage.removeItem(KEY_TOKEN);
        localStorage.removeItem(KEY_REPO);
        localStorage.removeItem(KEY_SHA);
    }

    export function reset() {
        selectedRepo = "";
        repos = [];
        owner = "";
        deleteSettings();
    }

    export function open() {
        rememberSettings =
            (localStorage.getItem(KEY_REMEMBER) ?? "false") == "true";

        if (rememberSettings) {
            token = localStorage.getItem(KEY_TOKEN) ?? "";
        }

        modal.open();
        isOpen = true;
    }

    export function close() {
        modal.close();
        isOpen = false;
    }

    async function handleRememberMe() {
        if (rememberSettings) {
            rememberSettings = false;
            return;
        }

        const swalResult = await Swal.fire({
            icon: "question",
            title: "¿Guardar Personal Access Token?",
            text: "Se guardará en el almacenamiento local del dispositivo",
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: Color.Primary,
        });

        rememberSettings = swalResult.isConfirmed;
    }

    async function onSelectedRepo() {
        if (selectedRepo?.length == 0) {
            return;
        }

        const user = await github.getUser();
        const responseListFiles = await github.listFiles(
            user.login,
            selectedRepo
        );

        if (Array.isArray(responseListFiles.data)) {
            files = [
                ...responseListFiles.data.filter((f) => f.type == "dir"),
                ...responseListFiles.data.filter(
                    (f) =>
                        f.type == "file" &&
                        (f.name.endsWith(".yml") || f.name.endsWith(".yaml"))
                ),
            ];

            const savedSha = localStorage.getItem(KEY_SHA);
            if (
                rememberSettings &&
                savedSha != null &&
                files.find((f) => f.sha == savedSha)
            ) {
                selectedSha = savedSha;
            }
        }
    }

    async function openFile() {
        const user = await github.getUser();
        const responseGetContent = await github.getBlob(
            user.login,
            selectedRepo,
            selectedSha
        );

        if (!responseGetContent?.content) {
            console.error("no content");
            return;
        }

        const decodedContent = decode(responseGetContent.content);
        dispatch<string>("fileLoaded", decodedContent);
    }
</script>

<Modal
    bind:this={modal}
    title="Guardar en GitHub"
    acceptButtonText="Abrir"
    cancelButtonText="Cerrar"
    bind:acceptButtonDisabled={openButtonIsDisabled}
    accept={() => openFile()}
    on:open={() => dispatch(modal.EVENT_OPEN)}
    on:close={() => dispatch(modal.EVENT_CLOSE)}
>
    <div class="field">
        <label class="label" for="">Personal Access Token</label>
        <div class="control">
            <input class="input" type="password" bind:value={token} />
        </div>
    </div>

    <div class="field">
        <label class="checkbox">
            <input
                type="checkbox"
                bind:checked={rememberSettings}
                on:click={() => handleRememberMe()}
            />
            Recuérdame
        </label>
    </div>

    {#if owner?.length > 0}
        <div class="field">
            <label class="label" for="">Usuario</label>
            <div class="control">
                <input class="input" type="text" value={owner} readonly />
            </div>
        </div>
    {/if}

    {#if repos.length > 0}
        <div class="field">
            <label class="label" for="">Repositorios</label>
            <div class="control">
                <div class="select">
                    <select bind:value={selectedRepo}>
                        {#each repos as repo}
                            <option>{repo}</option>
                        {/each}
                    </select>
                </div>
            </div>
        </div>
    {/if}

    {#if selectedRepo.length > 0}
        <div class="field">
            <label class="label" for="">Archivos</label>
            <div class="control">
                <div class="select">
                    <select bind:value={selectedSha}>
                        {#each files as file}
                            <option value={file.sha}>{file.name}</option>
                        {/each}
                    </select>
                </div>
            </div>
        </div>
    {/if}
</Modal>
