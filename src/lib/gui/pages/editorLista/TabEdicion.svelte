<script lang="ts">
    import EditorCategoria from "./EditorCategoria.svelte";
    import type { PlantillaProyectos } from "./plantillaLista";

    type Props = {
        plantilla: PlantillaProyectos;
    };

    let { plantilla = $bindable() }: Props = $props();

    let categoriaActiva = $state<string>("");
</script>

<!-- <div class="editor"> -->
<!-- Nombre -->
<div class="field">
    <label class="label" for="">Nombre</label>
    <div class="control">
        <input class="input" type="text" bind:value={plantilla.Nombre} />
    </div>
</div>

<!-- <p>{categoriaActiva}</p> -->

{#each plantilla.Categorias as categoria, indexCategoria}
    <EditorCategoria
        bind:categoria={plantilla.Categorias[indexCategoria]}
        isSelected={categoriaActiva == categoria.Nombre}
        onOpen={() => {
            console.log("llega");
            categoriaActiva = categoria.Nombre;
        }}
        onClose={() => {
            categoriaActiva = "";
        }}
    />
{/each}

<!-- </div> -->
<style>
    /* .editor {
        padding: 0.5rem;
    } */
</style>
