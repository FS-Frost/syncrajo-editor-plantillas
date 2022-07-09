<script lang="ts">
    import type { DatosBasicos } from "../plantilla";

    export let datos: DatosBasicos;
</script>

<div class="editor">
    <!-- Proyecto -->
    <div class="field">
        <label class="label" for="">Proyecto</label>
        <div class="control">
            <input class="input" type="text" bind:value={datos.Proyecto} />
        </div>
    </div>

    <!-- Imagen -->
    <div class="field">
        <label class="label" for="">Imagen</label>
        <div class="control">
            <input class="input" type="text" bind:value={datos.Imagen} />
        </div>
    </div>

    <!-- Descripción -->
    <div class="field">
        <label class="label" for="">Sinopsis</label>
        <div class="control">
            <textarea class="textarea" bind:value={datos.Descripcion} />
        </div>
    </div>
</div>

<style>
</style>
