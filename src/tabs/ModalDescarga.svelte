<script lang="ts">
    import Modal from "../Modal.svelte";
    import ModalDescargaGitHub from "./ModalDescargaGitHub.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let nombrePlantilla: string = "";
    export let plantillaSerializada: string = "";
    let modal: Modal;
    let modalGitHub: ModalDescargaGitHub;

    export function open() {
        modal.open();
    }

    export function close() {
        modal.close();
    }

    function guardarLocal() {
        let element = document.createElement("a");
        element.setAttribute(
            "href",
            "data:text/plain;charset=utf-8," +
                encodeURIComponent(plantillaSerializada)
        );

        element.setAttribute("download", `${nombrePlantilla}.yaml`);
        element.click();
    }
</script>

<ModalDescargaGitHub
    bind:this={modalGitHub}
    {nombrePlantilla}
    {plantillaSerializada}
    on:close={() => open()}
/>

<Modal
    bind:this={modal}
    title="Guardar"
    cancelButtonText="Cerrar"
    on:open={() => dispatch(modal.EVENT_OPEN)}
    on:close={() => dispatch(modal.EVENT_CLOSE)}
>
    <p class="mb-3">Seleccione dónde guardar la plantilla:</p>

    <div class="buttons">
        <button
            class="button is-info"
            title="Guardar en este equipo"
            on:click={() => guardarLocal()}>Local</button
        >

        <button
            class="button is-info"
            title="Guardar en GitHub"
            on:click={() => {
                close();
                modalGitHub.open();
            }}>GitHub</button
        >
    </div>
</Modal>
