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
            <input class="input" type="text" bind:value={datos.UrlImagen} />
        </div>
    </div>

    <!-- Descripción -->
    <div class="field">
        <label class="label" for="">Sinopsis</label>
        <div class="control">
            <textarea class="textarea" bind:value={datos.Sinopsis} />
        </div>
    </div>

    <!-- URL de Blogger -->
    <div class="field">
        <label class="label" for="">URL de Blogger</label>
        <div class="control">
            <input class="input" type="text" bind:value={datos.UrlBlogger} />
        </div>
    </div>
</div>

<style>
</style>
