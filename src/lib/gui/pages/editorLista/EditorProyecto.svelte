<script lang="ts">
    import ModalEditarProyecto from "./ModalEditarProyecto.svelte";
    import type { Proyecto } from "./plantillaLista";

    type Props = {
        proyecto: Proyecto;
    };

    let { proyecto = $bindable() }: Props = $props();

    let modalEditarProyecto = $state<ModalEditarProyecto>();
</script>

<ModalEditarProyecto bind:this={modalEditarProyecto} bind:proyecto />

<!-- href={proyecto.UrlProyecto.length > 0
            ? proyecto.UrlProyecto
            : `#${proyecto.Nombre.replace(" ", "-").toLowerCase()}`}
        target={proyecto.UrlProyecto.length > 0 ? "_blank" : ""} -->

<a
    href={`#${proyecto.Nombre.toLowerCase()}`}
    id={proyecto.Nombre.replace(" ", "-").toLowerCase()}
    role="button"
    tabindex="0"
    class="editor"
    onclick={() => {
        modalEditarProyecto?.open();
    }}
    onkeydown={() => {}}
>
    <div class="proyecto">
        <img src={proyecto.UrlImagen} alt={proyecto.Nombre} />
        <div class="nombre" style="background-color: {proyecto.Color};">
            {proyecto.Nombre}
        </div>
    </div>
</a>

<style>
    .editor {
        display: flex;
        margin-bottom: 0.5rem;
    }

    .proyecto {
        width: 320px;
        height: 380px;
    }

    .editor:hover {
        outline: 0.15rem solid rgba(0, 0, 0, 0.37);
        text-decoration: none;
    }

    .proyecto img {
        width: 320px;
        height: 380px;
    }

    .proyecto .nombre {
        text-align: center;
        font-size: larger;
        /* background-color: #18185e; */
        color: white;
        position: relative;
        height: 28px;
        bottom: 32px;
    }
</style>
