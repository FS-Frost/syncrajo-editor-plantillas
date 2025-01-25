<script lang="ts">
    import Modal from "$lib/gui/Modal.svelte";
    import type { Proyecto } from "./plantillaLista";

    type Props = {
        proyecto: Proyecto;
    };

    let { proyecto = $bindable() }: Props = $props();

    let modal = $state<Modal>();

    export function open() {
        modal?.open();
    }

    export function close() {
        modal?.close();
    }
</script>

<Modal bind:this={modal} title="Editar proyecto" cancelButtonText="Cerrar">
    <!-- Nombre -->
    <div class="field">
        <label class="label" for="">Nombre</label>
        <div class="control">
            <input class="input" type="text" bind:value={proyecto.Nombre} />
        </div>
    </div>

    <!-- URL de imagen -->
    <div class="field">
        <label class="label" for="">URL de imagen</label>
        <div class="control">
            <input class="input" type="text" bind:value={proyecto.UrlImagen} />
        </div>
    </div>

    <!-- URL del proyecto -->
    <div class="field">
        <label class="label" for="">URL del proyecto</label>
        <div class="control">
            <input
                class="input"
                type="text"
                bind:value={proyecto.UrlProyecto}
            />
        </div>
    </div>

    <!-- Color -->
    <div class="field">
        <label class="label" for="">Color</label>
        <div class="control">
            <input class="input" type="color" bind:value={proyecto.Color} />
        </div>
    </div>
</Modal>
