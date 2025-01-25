<script lang="ts">
    import Modal from "$lib/gui/Modal.svelte";
    import { GitHub } from "$lib/github";
    import _ from "lodash";
    import Swal from "sweetalert2";
    import { Color } from "$lib/color";
    import { decode } from "js-base64";

    type Props = {
        onFileLoaded?: (format: string) => void;
        onOpen?: () => void;
        onClose?: () => void;
    };

    let { onFileLoaded, onOpen, onClose }: Props = $props();

    type GitHubFile = {
        name: string;
        sha: string;
        size: number;
        type: string;
    };

    const KEY_REMEMBER = "remember";
    const KEY_TOKEN = "pat";
    const KEY_REPO = "repo";
    const KEY_SHA = "sha";

    let modal = $state<Modal>();
    let token = $state<string>("");
    let rememberSettings = $state<boolean>(false);
    let repos = $state<string[]>([]);
    let files = $state<GitHubFile[]>([]);
    let owner = $state<string>("");
    let selectedRepo = $state<string>("");
    let selectedSha = $state<string>("");
    let github = $state<GitHub>();
    let isOpen = $state<boolean>(false);

    let debouncedTokenChanged = $state<
        _.DebouncedFunc<(token: string) => Promise<void>>
    >(_.debounce(tokenChanged, 1000));

    $effect(() => {
        debouncedTokenChanged(token);
    });

    let openButtonIsDisabled: boolean = $derived(
        repos.length == 0 ||
            selectedRepo?.length == 0 ||
            selectedSha?.length == 0,
    );

    $effect(() => saveSettings());

    $effect(() => {
        onSelectedRepo(selectedRepo);
    });

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
            owner = user.login;

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

        modal?.open();
        isOpen = true;
    }

    export function close() {
        modal?.close();
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

    async function onSelectedRepo(selectedRepo: string) {
        if (selectedRepo.length == 0) {
            return;
        }

        if (github == null) {
            console.error("github is undefined");
            return;
        }

        const user = await github.getUser();
        const responseListFiles = await github.listFiles(
            user.login,
            selectedRepo,
        );

        if (Array.isArray(responseListFiles.data)) {
            files = [
                ...responseListFiles.data.filter((f) => f.type == "dir"),
                ...responseListFiles.data.filter(
                    (f) => f.type == "file" && f.name.endsWith(".json"),
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
        if (github == null) {
            console.error("github is undefined");
            return;
        }

        const user = await github.getUser();
        const responseGetContent = await github.getBlob(
            user.login,
            selectedRepo,
            selectedSha,
        );

        if (!responseGetContent?.content) {
            console.error("no content");
            return;
        }

        const decodedContent = decode(responseGetContent.content);

        if (onFileLoaded != null) {
            onFileLoaded(decodedContent);
        }
    }
</script>

<Modal
    bind:this={modal}
    title="GitHub"
    acceptButtonText="Abrir"
    cancelButtonText="Cerrar"
    acceptButtonDisabled={openButtonIsDisabled}
    onAccept={() => openFile()}
    onOpen={() => {
        if (onOpen != null) {
            onOpen();
        }
    }}
    onClose={() => {
        if (onClose != null) {
            onClose();
        }
    }}
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
                onclick={() => handleRememberMe()}
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
                            <option value={repo}>{repo}</option>
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
