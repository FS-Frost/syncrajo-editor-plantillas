<script lang="ts">
    import Modal from "../Modal.svelte";
    import { createEventDispatcher } from "svelte";
    import { GitHub } from "../github";
    import _ from "lodash";
    import Swal from "sweetalert2";
    import { prevent_default, text } from "svelte/internal";
    import { Color } from "../color";

    const KEY_REMEMBER = "remember";
    const KEY_TOKEN = "pat";
    const KEY_REPO = "repo";
    const dispatch = createEventDispatcher();
    export let nombrePlantilla: string = "";
    export let plantillaSerializada: string = "";
    let modal: Modal;
    let token: string = "";
    let rememberSettings: boolean;
    let repos: string[] = [];
    let owner: string = "";
    let selectedRepo: string = "";
    let filePath: string = "";
    let debouncedTokenChanged = _.debounce(tokenChanged, 1000);
    let github: GitHub;
    let isOpen = false;

    $: token, debouncedTokenChanged();
    $: saveButtonIsDisabled =
        repos.length == 0 || selectedRepo?.length == 0 || filePath?.length == 0;
    $: rememberSettings, selectedRepo, saveSettings();

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

            filePath = `${nombrePlantilla}.yml`;
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
    }

    function deleteSettings() {
        localStorage.removeItem(KEY_TOKEN);
        localStorage.removeItem(KEY_REPO);
    }

    async function save() {
        try {
            github = GitHub.new(token);
            const user = await github.getUser();

            try {
                await github.getContent(user.login, selectedRepo, filePath);
            } catch (error) {
                console.info("El archivo no existe", error);
            }

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
                plantillaSerializada
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

            modal.close();
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "Error al guardar",
                text: `Error: ${error}`,
                confirmButtonText: "Aceptar",
                confirmButtonColor: Color.Primary,
            });
        }

        if (Swal.isVisible()) {
            Swal.close();
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
</script>

<Modal
    bind:this={modal}
    title="Guardar en GitHub"
    acceptButtonText="Guardar"
    cancelButtonText="Cerrar"
    bind:acceptButtonDisabled={saveButtonIsDisabled}
    accept={() => save()}
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
            <label class="label" for="">Ruta de guardado</label>
            <div class="control">
                <input
                    class="input"
                    type="text"
                    bind:value={filePath}
                    placeholder="carpeta/subcarpeta/Superplantilla.yml"
                />
            </div>
        </div>
    {/if}
</Modal>
