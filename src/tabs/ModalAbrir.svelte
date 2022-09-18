<script lang="ts">
    import Modal from "../Modal.svelte";
    import { createEventDispatcher } from "svelte";
    import ModalAbrirGitHub from "./ModalAbrirGitHub.svelte";

    const dispatch = createEventDispatcher();
    const dispatchString = createEventDispatcher<{ fileLoaded: string }>();
    let modal: Modal;
    let fileButton: HTMLInputElement;
    let modalGitHub: ModalAbrirGitHub;

    export function open() {
        modal.open();
    }

    export function close() {
        modal.close();
    }

    function abrirLocal() {
        fileButton.value = "";
        fileButton.click();
    }

    function handleFileLoaded(e: CustomEvent<string>) {
        modalGitHub.close();
        dispatchString("fileLoaded", e.detail);
    }

    async function onFileInputChange() {
        const files = fileButton.files;

        if (files == null || files.length == 0) {
            return;
        }

        const file = files[0];
        const text = await file.text();
        dispatchString("fileLoaded", text);
    }
</script>

<ModalAbrirGitHub
    bind:this={modalGitHub}
    on:close={() => open()}
    on:fileLoaded={handleFileLoaded}
/>

<input
    class="is-hidden"
    bind:this={fileButton}
    type="file"
    accept=".yaml,.yml"
    on:change={() => onFileInputChange()}
/>

<Modal
    bind:this={modal}
    title="Abrir"
    cancelButtonText="Cerrar"
    on:open={() => dispatch(modal.EVENT_OPEN)}
    on:close={() => dispatch(modal.EVENT_CLOSE)}
>
    <p class="mb-3">Seleccione desde dónde abrir la plantilla:</p>

    <div class="buttons">
        <button
            class="button is-info"
            title="Desde este equipo"
            on:click={() => abrirLocal()}>Local</button
        >

        <button
            class="button is-info"
            title="Desde GitHub"
            on:click={() => {
                close();
                modalGitHub.open();
            }}>GitHub</button
        >
    </div>
</Modal>
