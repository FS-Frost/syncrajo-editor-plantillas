<script lang="ts">
    import {
        newPlantilla,
        newPlantillaEjemplo,
        Plantilla,
        validarPlantilla,
    } from "$lib/plantilla";
    import ModalDescarga from "./ModalDescarga.svelte";
    import Swal from "sweetalert2";
    import { Color } from "$lib/color";
    import ModalAbrir from "./ModalAbrir.svelte";
    import ModalBlogger from "./blogger/ModalBlogger.svelte";

    type Props = {
        plantilla: Plantilla;
        divPlantilla?: HTMLDivElement;
        mensajesValidacion: string[];
    };

    let {
        plantilla = $bindable(),
        divPlantilla = $bindable(),
        mensajesValidacion,
    }: Props = $props();

    let plantillaSerializada = $state<string>("");
    let nombrePlantilla = $state<string>("");
    let modalAbrir = $state<ModalAbrir>();
    let modalDescarga = $state<ModalDescarga>();
    let modalBlogger = $state<ModalBlogger>();
    let esPlantillaValida: boolean = $derived(mensajesValidacion.length == 0);

    async function abrirPlantilla() {
        modalAbrir?.open();
    }

    async function cargarEjemplo() {
        const swalResult = await Swal.fire({
            icon: "question",
            title: "¿Cargar plantilla de ejemplo?",
            text: "Se perderán los cambios actuales",
            showCancelButton: true,
            confirmButtonText: "Cargar ejemplo",
            cancelButtonText: "Cancelar",
            confirmButtonColor: Color.Primary,
        });

        if (!swalResult.isConfirmed) {
            return;
        }

        plantilla = newPlantillaEjemplo();

        await Swal.fire({
            icon: "success",
            title: "Ejemplo cargado",
            confirmButtonText: "Aceptar",
            confirmButtonColor: Color.Primary,
        });
    }

    function serializarPlantilla(): string {
        return JSON.stringify(plantilla, null, 2);
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
        plantillaSerializada = serializarPlantilla();
        modalDescarga?.open();
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

    async function handleFileLoaded(text: string) {
        try {
            const parseResult = Plantilla.safeParse(JSON.parse(text));

            if (!parseResult.success) {
                let errorMessage = "";

                parseResult.error.errors.forEach((error) => {
                    const msg = `${error.path.join(".")}: ${error.code}: ${
                        error.message
                    }`;

                    errorMessage += `<br>${msg}`;
                });

                throw new Error(`Plantilla inválida: ${errorMessage}`);
            }

            const errores = validarPlantilla(parseResult.data);
            if (errores.length > 0) {
                await Swal.fire({
                    icon: "error",
                    title: "Error al cargar",
                    html: `Error al cargar plantilla desde GitHub.<br><br>${errores.join("<br>")}`,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: Color.Primary,
                });
            }

            plantilla = parseResult.data;
        } catch (error) {
            console.error("error al cargar plantilla", error);
            console.log(text);
            await Swal.fire({
                icon: "error",
                title: "Error al cargar",
                html: `Error al cargar plantilla desde GitHub.<br><br>${error}`,
                confirmButtonText: "Aceptar",
                confirmButtonColor: Color.Primary,
            });
            return;
        }

        modalAbrir?.close();
        await Swal.fire({
            icon: "success",
            title: "Plantilla cargada",
            confirmButtonText: "Aceptar",
            confirmButtonColor: Color.Primary,
        });
    }

    async function publicarEnBlogger() {
        modalBlogger?.open();
    }
</script>

<ModalAbrir bind:this={modalAbrir} onFileLoaded={handleFileLoaded} />

<ModalDescarga
    bind:this={modalDescarga}
    {nombrePlantilla}
    {plantillaSerializada}
/>

<ModalBlogger bind:this={modalBlogger} bind:plantilla bind:divPlantilla />

<div class="opciones">
    <button
        class="button is-info"
        title="Generar el código HTML y copiarlo al portapapeles"
        disabled={!esPlantillaValida}
        onclick={() => generarPlantilla()}
    >
        Generar
    </button>

    <button
        class="button is-info"
        title="Abrir plantilla"
        onclick={() => abrirPlantilla()}
    >
        Abrir
    </button>

    <button
        class="button is-info"
        title="Guardar plantilla"
        disabled={!esPlantillaValida}
        onclick={() => guardarComo()}
    >
        Guardar
    </button>

    <button
        class="button is-info"
        title="Cargar plantilla de ejemplo"
        onclick={() => cargarEjemplo()}
    >
        Cargar ejemplo
    </button>

    <button
        class="button is-danger"
        title="Vaciar todos los campos"
        onclick={() => limpiar()}
    >
        Limpiar
    </button>

    <button
        class="button is-info"
        title="Ver una plantilla ya desplegada como HTML"
        onclick={() => verPlantillaDesplegada()}
    >
        Ver una plantilla en SyncRajo
    </button>

    <button
        class="button is-info"
        title="Publicar HTML en Blogger"
        disabled={!esPlantillaValida}
        onclick={() => publicarEnBlogger()}
    >
        Publicar en Blogger
    </button>
</div>

<style>
    .opciones {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.2rem;
    }
</style>
