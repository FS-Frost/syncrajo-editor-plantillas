<script lang="ts">
    import EditorProyecto from "./EditorProyecto.svelte";
    import type { Categoria } from "./plantillaLista";

    type Props = {
        categoria: Categoria;
        isSelected: boolean;
        onOpen: () => void;
        onClose: () => void;
    };

    let {
        categoria = $bindable(),
        isSelected,
        onOpen,
        onClose,
    }: Props = $props();
</script>

<!-- <div class="editor"> -->
<span
    role="button"
    tabindex="0"
    onclick={() => {
        if (isSelected) {
            onClose();
            return;
        }

        onOpen();
    }}
    onkeydown={() => {}}
>
    <h1>
        {categoria.Nombre}
    </h1>
</span>

{#if isSelected || true}
    <!-- Nombre -->
    <div class="field">
        <!-- <label class="label" for="">Nombre</label> -->
        <div class="control">
            <input class="input" type="text" bind:value={categoria.Nombre} />
        </div>
    </div>

    <div class="proyectos">
        {#each categoria.Proyectos as _, indexProyecto}
            <EditorProyecto
                bind:proyecto={categoria.Proyectos[indexProyecto]}
            />
        {/each}
    </div>
{/if}

<!-- </div> -->
<style>
    .proyectos {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    h1 {
        font-weight: bold;
        text-align: center;
        font-size: larger;
    }

    h1:hover {
        text-decoration: underline;
        background-color: rgb(228, 228, 228);
        cursor: pointer;
    }
</style>
