<script lang="ts">
    import Modal from "$lib/gui/Modal.svelte";
    import ModalAbrirGitHub from "./ModalAbrirGitHub.svelte";

    type Props = {
        onOpen?: () => void;
        onClose?: () => void;
        onFileLoaded?: (val: string) => void;
    };

    let { onOpen, onClose, onFileLoaded }: Props = $props();

    let modal = $state<Modal>();
    let fileButton = $state<HTMLInputElement>();
    let modalGitHub = $state<ModalAbrirGitHub>();

    export function open() {
        modal?.open();
    }

    export function close() {
        modal?.close();
    }

    function abrirLocal() {
        if (fileButton == null) {
            return;
        }

        fileButton.value = "";
        fileButton.click();
    }

    function handleFileLoaded(detail: string) {
        if (modalGitHub == null) {
            return;
        }

        modalGitHub.close();
        onFileLoaded && onFileLoaded(detail);
    }

    async function onFileInputChange() {
        if (fileButton == null) {
            return;
        }

        const files = fileButton.files;

        if (files == null || files.length == 0) {
            return;
        }

        const file = files[0];
        const text = await file.text();
        onFileLoaded && onFileLoaded(text);
    }
</script>

<ModalAbrirGitHub
    bind:this={modalGitHub}
    onClose={() => open()}
    onFileLoaded={handleFileLoaded}
/>

<input
    class="is-hidden"
    bind:this={fileButton}
    type="file"
    accept=".json"
    onchange={() => onFileInputChange()}
/>

<Modal
    bind:this={modal}
    title="Abrir"
    cancelButtonText="Cerrar"
    onOpen={() => onOpen && onOpen()}
    onClose={() => onClose && onClose()}
>
    <p class="mb-3">Seleccione desde dónde abrir la plantilla:</p>

    <div class="buttons">
        <button
            class="button is-info"
            title="Desde este equipo"
            onclick={() => abrirLocal()}
        >
            Local
        </button>

        <button
            class="button is-info"
            title="Desde GitHub"
            onclick={() => {
                close();
                modalGitHub?.open();
            }}
        >
            GitHub
        </button>
    </div>
</Modal>
