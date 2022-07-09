<script lang="ts">
    import type { DatosDescarga } from "../plantilla";

    export let datos: DatosDescarga;
</script>

<div class="editor">
    <!-- Botón MP4 -->
    <div class="field">
        <label class="label" for="">Botón MP4</label>
        <div class="control">
            <input class="input" type="text" bind:value={datos.BotonMp4} />
        </div>
    </div>

    <!-- Enlace MP4 -->
    <div class="field">
        <label class="label" for="">Enlace MP4</label>
        <div class="control">
            <input class="input" type="text" bind:value={datos.EnlaceMp4} />
        </div>
    </div>

    <!-- Botón AVI -->
    <div class="field">
        <label class="label" for="">Botón AVI</label>
        <div class="control">
            <input class="input" type="text" bind:value={datos.BotonAvi} />
        </div>
    </div>

    <!-- Enlace AVI -->
    <div class="field">
        <label class="label" for="">Enlace AVI</label>
        <div class="control">
            <input class="input" type="text" bind:value={datos.EnlaceAvi} />
        </div>
    </div>
</div>

<style>
</style>
