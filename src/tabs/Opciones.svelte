<script lang="ts">
    import yaml from "js-yaml";
    import { newPlantilla, newPlantillaEjemplo, Plantilla } from "../plantilla";

    export let plantilla: Plantilla;
    export let divPlantilla: HTMLDivElement | null;
    let fileButton: HTMLInputElement;

    function cargarEjemplo() {
        plantilla = newPlantillaEjemplo();
    }

    async function cargarPlantilla() {
        const files = fileButton.files;

        if (files == null || files.length == 0) {
            return;
        }

        const file = files[0];
        const text = await file.text();
        let plantillaCargada: Plantilla;

        try {
            plantillaCargada = yaml.load(text) as Plantilla;
        } catch (error) {
            console.error(error);
            alert(`Error al cargar plantilla desde ${file.name}`);
            return;
        }

        plantilla = plantillaCargada;
        // alert("Planilla cargada correctamente");
    }

    function serializarPlantilla(): string {
        const plantillaSerializada = yaml.dump(plantilla, {
            indent: 2,
        });

        return plantillaSerializada;
    }

    function generarPlantilla() {
        if (divPlantilla == null) {
            alert("La plantilla es inválida");
            return;
        }

        let html = "<!-- Plantilla generada en Asu -->";
        html += divPlantilla.innerHTML;
        navigator.clipboard.writeText(html);
        alert("Plantilla HTML copiada al portapapeles");
    }

    function guardarComo() {
        const plantillaSerializada = serializarPlantilla();
        let element = document.createElement("a");
        element.setAttribute(
            "href",
            "data:text/plain;charset=utf-8," +
                encodeURIComponent(plantillaSerializada)
        );
        element.setAttribute("download", "Plantilla.yaml");
        element.click();
    }

    function limpiar() {
        plantilla = newPlantilla();
    }

    function verPlantillaDesplegada() {
        const url = "http://www.syncrajo.net/2013/01/clannad-bd.html";
        let element = document.createElement("a");
        element.setAttribute("href", url);
        element.setAttribute("target", "_blank");
        element.click();
    }
</script>

<div class="opciones">
    <button
        class="button is-info"
        title="Generar el código HTML y lo copia al portapapeles"
        on:click={() => generarPlantilla()}>Generar</button
    >

    <button
        class="button is-info"
        title="Abrir plantilla local"
        on:click={() => fileButton.click()}>Abrir</button
    >
    <input
        class="is-hidden"
        bind:this={fileButton}
        type="file"
        accept=".yaml,.yml"
        on:change={() => cargarPlantilla()}
    />

    <button
        class="button is-info"
        title="Guardar plantilla en formato YAML"
        on:click={() => guardarComo()}>Guardar</button
    >

    <button
        class="button is-info"
        title="Cargar plantilla de ejemplo"
        on:click={() => cargarEjemplo()}>Cargar ejemplo</button
    >

    <button
        class="button is-danger"
        title="Reiniciar todos los campos"
        on:click={() => limpiar()}>Limpiar</button
    >

    <button
        class="button is-info"
        title="Ver una plantilla ya desplegada como HTML"
        on:click={() => verPlantillaDesplegada()}
        >Ver una plantilla en SyncRajo</button
    >
</div>

<style>
    .opciones {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.2rem;
    }
</style>
