<script lang="ts">
    import yaml from "js-yaml";
    import {
        newPlantilla,
        newPlantillaEjemplo,
        Plantilla,
        validarPlantilla,
    } from "../plantilla";
    import ModalDescarga from "./ModalDescarga.svelte";
    import Swal from "sweetalert2";
    import { Color } from "../color";

    export let plantilla: Plantilla;
    export let divPlantilla: HTMLDivElement | null;
    export let mensajesValidacion: string[];
    let plantillaSerializada: string = "";
    let nombrePlantilla: string = "";
    let modalDescarga: ModalDescarga;
    let fileButton: HTMLInputElement;
    $: esPlantillaValida = mensajesValidacion.length == 0;

    async function cargarEjemplo() {
        plantilla = newPlantillaEjemplo();

        await Swal.fire({
            icon: "success",
            title: "Ejemplo cargado",
            confirmButtonText: "Aceptar",
            confirmButtonColor: Color.Primary,
        });
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
            const errores = validarPlantilla(plantillaCargada);
            if (errores.length > 0) {
                throw new Error(
                    `"Plantilla inválida: ${errores.join("<br><br>")}"`
                );
            }
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "Error al cargar",
                html: `Error al cargar plantilla desde ${file.name}<br><br>${error}`,
                confirmButtonText: "Aceptar",
                confirmButtonColor: Color.Primary,
            });
            return;
        }

        plantilla = plantillaCargada;
        await Swal.fire({
            icon: "success",
            title: "Plantilla cargada",
            confirmButtonText: "Aceptar",
            confirmButtonColor: Color.Primary,
        });
    }

    function serializarPlantilla(): string {
        const plantillaSerializada = yaml.dump(plantilla, {
            indent: 2,
        });

        return plantillaSerializada;
    }

    async function generarPlantilla() {
        if (divPlantilla == null) {
            await Swal.fire({
                icon: "error",
                title: "Error al generar",
                text: "La plantilla es inválida",
                confirmButtonText: "Aceptar",
                confirmButtonColor: Color.Primary,
            });
            return;
        }

        let html = "<!-- Plantilla generada en Asu -->";
        html += divPlantilla.innerHTML;
        navigator.clipboard.writeText(html);
        await Swal.fire({
            icon: "success",
            title: "Plantilla copiada",
            text: "Plantilla HTML copiada al portapapeles",
            confirmButtonText: "Aceptar",
            confirmButtonColor: Color.Primary,
        });
    }

    function guardarComo() {
        const categoria = plantilla.DatosTecnicos.Categoria;
        const proyecto = plantilla.DatosBasicos.Proyecto;
        nombrePlantilla = `[${categoria}] ${proyecto}`;
        console.log(nombrePlantilla);
        plantillaSerializada = serializarPlantilla();
        modalDescarga.open();
        return;
    }

    async function limpiar() {
        const swalResult = await Swal.fire({
            icon: "question",
            title: "¿Limpiar todos los campos?",
            showCancelButton: true,
            confirmButtonText: "Limpiar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: Color.Danger,
        });

        if (swalResult.isConfirmed) {
            plantilla = newPlantilla();
        }
    }

    function verPlantillaDesplegada() {
        const url = "http://www.syncrajo.net/2013/01/clannad-bd.html";
        let element = document.createElement("a");
        element.setAttribute("href", url);
        element.setAttribute("target", "_blank");
        element.click();
    }
</script>

<ModalDescarga
    bind:this={modalDescarga}
    {nombrePlantilla}
    {plantillaSerializada}
/>

<div class="opciones">
    <button
        class="button is-info"
        title="Generar el código HTML y lo copia al portapapeles"
        disabled={!esPlantillaValida}
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
        disabled={!esPlantillaValida}
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
