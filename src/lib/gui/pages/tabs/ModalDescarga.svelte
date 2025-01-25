<script lang="ts">
    import Modal from "$lib/gui/Modal.svelte";
    import ModalDescargaGitHub from "./ModalDescargaGitHub.svelte";

    type Props = {
        nombrePlantilla: string;
        plantillaSerializada: string;
        onOpen?: () => void;
        onClose?: () => void;
    };

    let { nombrePlantilla, plantillaSerializada, onOpen, onClose }: Props =
        $props();

    let modal = $state<Modal>();
    let modalGitHub = $state<ModalDescargaGitHub>();

    export function open() {
        modal?.open();
    }

    export function close() {
        modal?.close();
    }

    function guardarLocal() {
        let element = document.createElement("a");
        element.setAttribute(
            "href",
            "data:text/plain;charset=utf-8," +
                encodeURIComponent(plantillaSerializada),
        );

        element.setAttribute("download", `${nombrePlantilla}.json`);
        element.click();
    }

    function handleFileSaved() {
        modalGitHub?.close();
        close();
    }
</script>

<ModalDescargaGitHub
    bind:this={modalGitHub}
    {nombrePlantilla}
    {plantillaSerializada}
    onClose={() => open()}
    onFileSaved={() => handleFileSaved()}
/>

<Modal
    bind:this={modal}
    title="Guardar"
    cancelButtonText="Cerrar"
    onOpen={() => onOpen && onOpen()}
    onClose={() => onClose && onClose()}
>
    <p class="mb-3">Seleccione dónde guardar la plantilla {nombrePlantilla}:</p>

    <div class="buttons">
        <button
            class="button is-info"
            title="Guardar en este equipo"
            onclick={() => guardarLocal()}
        >
            Local
        </button>

        <button
            class="button is-info"
            title="Guardar en GitHub"
            onclick={() => {
                close();
                modalGitHub?.open();
            }}
        >
            GitHub
        </button>
    </div>
</Modal>
