<script lang="ts">
    import Modal from "$lib/gui/Modal.svelte";
    import { GitHub } from "$lib/github";
    import _ from "lodash";
    import Swal from "sweetalert2";
    import { Color } from "$lib/color";

    type Props = {
        nombrePlantilla: string;
        plantillaSerializada: string;
        onOpen?: () => void;
        onClose?: () => void;
        onFileSaved?: () => void;
    };

    let {
        nombrePlantilla,
        plantillaSerializada,
        onOpen,
        onClose,
        onFileSaved,
    }: Props = $props();

    const KEY_REMEMBER = "remember";
    const KEY_TOKEN = "pat";
    const KEY_REPO = "repo";

    let modal = $state<Modal>();
    let token = $state<string>("");
    let rememberSettings = $state<boolean>(false);
    let repos = $state<string[]>([]);
    let owner = $state<string>("");
    let selectedRepo = $state<string>("");
    let filePath = $state<string>("");
    let github = $state<GitHub>();
    let isOpen = $state<boolean>(false);

    let debouncedTokenChanged = $state<
        _.DebouncedFunc<(token: string) => Promise<void>>
    >(_.debounce(tokenChanged, 1000));

    $effect(() => {
        debouncedTokenChanged(token);
    });

    let saveButtonIsDisabled: boolean = $derived(
        repos.length == 0 || selectedRepo?.length == 0 || filePath?.length == 0,
    );

    $effect(() => saveSettings());

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
                    ? (responseRepos[0].owner.login ?? "")
                    : "";

            const savedRepo = localStorage.getItem(KEY_REPO);
            if (
                rememberSettings &&
                savedRepo != null &&
                repos.includes(savedRepo)
            ) {
                selectedRepo = savedRepo;
            }

            filePath = `${nombrePlantilla}.json`;
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
    }

    function deleteSettings() {
        localStorage.removeItem(KEY_TOKEN);
        localStorage.removeItem(KEY_REPO);
    }

    async function save() {
        try {
            github = GitHub.new(token);
            const user = await github.getUser();
            let fileExists = false;

            try {
                fileExists =
                    (await github.getContent(
                        user.login,
                        selectedRepo,
                        filePath,
                    )) != null;
            } catch (error) {
                console.info("El archivo no existe", error);
            }

            if (fileExists) {
                let swalResult = await Swal.fire({
                    icon: "question",
                    title: "El archivo ya existe",
                    text: "¿Sobrescribir?",
                    showCancelButton: true,
                    confirmButtonText: "Sobrescribir",
                    cancelButtonText: "Cancelar",
                    confirmButtonColor: Color.Danger,
                });

                if (!swalResult.isConfirmed) {
                    return;
                }
            }

            Swal.fire({
                icon: "info",
                title: "Guardando en GitHub",
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const responseCreateCommit = await github.createCommit(
                user.login,
                selectedRepo,
                filePath,
                plantillaSerializada,
            );

            if (!responseCreateCommit.status) {
                throw new Error("Error al guardar en GitHub");
            }

            await Swal.fire({
                icon: "success",
                title: "Guardado",
                confirmButtonText: "Aceptar",
                confirmButtonColor: Color.Primary,
            });

            onFileSaved && onFileSaved();
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "Error al guardar",
                text: `Error: ${error}`,
                confirmButtonText: "Aceptar",
                confirmButtonColor: Color.Primary,
            });
        }
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
</script>

<Modal
    bind:this={modal}
    title="Guardar en GitHub"
    acceptButtonText="Guardar"
    cancelButtonText="Cerrar"
    acceptButtonDisabled={saveButtonIsDisabled}
    onAccept={() => save()}
    onOpen={() => onOpen && onOpen()}
    onClose={() => onClose && onClose()}
>
    <div class="field">
        <label class="label" for="">Planilla</label>
        <div class="control">
            <input class="input" type="text" value={nombrePlantilla} readonly />
        </div>
    </div>

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
                            <option>{repo}</option>
                        {/each}
                    </select>
                </div>
            </div>
        </div>
    {/if}

    {#if selectedRepo.length > 0}
        <div class="field">
            <label class="label" for="">Ruta de guardado</label>
            <div class="control">
                <input
                    class="input"
                    type="text"
                    bind:value={filePath}
                    placeholder="carpeta/subcarpeta/Superplantilla.json"
                />
            </div>
        </div>
    {/if}
</Modal>
