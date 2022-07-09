<script lang="ts">
    import yaml from "js-yaml";
    import { Categoria, newPlantilla, Plantilla } from "../plantilla";

    export let plantilla: Plantilla;
    let fileButton: HTMLInputElement;

    function cargarEjemplo() {
        plantilla = {
            DatosBasicos: {
                Proyecto:
                    "Yahari Ore no Seishun Rabu Kome wa Machigatteiru. Zoku",
                Imagen: "http://i1302.photobucket.com/albums/ag138/inazuma_seikatsu/Banners/Yahari%202_zpstxdkzd5i.jpg",
                Descripcion:
                    "Hikigaya Hachiman es un estudiante de secundaria antisocial sin amigos ni novia y, como resultado, tiene una visión distorsionada de la vida. Cuando ve a sus compañeros hablando animadamente sobre sus vidas de adolescentes, susurra: “Todos son un puñado de mentirosos”. Cuando se le pregunta acerca de sus sueños, responde: “sin trabajar”. Una profesora hace que Hachiman se una al “club de voluntarios”, que casualmente tiene a la chica más bella de la escuela, Yukino Yukinoshita.",
            },
            DatosDescarga: {
                BotonMp4:
                    "https://3.bp.blogspot.com/-LNecaZS2Xeg/U7y4vXn2RTI/AAAAAAAABNU/TWQ7EQiS3eY/s1600/mega.png",
                EnlaceMp4:
                    "https://mega.co.nz/#F!iMB3AZQB!dw_pm_qhHkenj0EkdW3zpQ",
                BotonAvi:
                    "https://4.bp.blogspot.com/-gNc_vnGu3eY/U7y4zzFemvI/AAAAAAAABNc/CKv-PeeI3Sk/s1600/megaavi.png",
                EnlaceAvi:
                    "https://mega.co.nz/#F!tpxwkDCS!Gq_0gNRcAEHYlu5Od-xvVg",
            },
            DatosStaff: {
                Integrantes: [
                    {
                        Cargo: "Traducción",
                        Nombre: "[KG] Kurogi (01 al 03), [FS] Frost (04 al 13 + OVA)",
                    },
                    {
                        Cargo: "Corrección",
                        Nombre: "[MK] Mikoyan",
                    },
                    {
                        Cargo: "Carteles",
                        Nombre: "[NS] NeoSt",
                    },
                    {
                        Cargo: "Karaokes y revisión",
                        Nombre: "[FS] Frost",
                    },
                    {
                        Cargo: "Compresión AVI",
                        Nombre: "[GX] Gonxas",
                    },
                    {
                        Cargo: "Compresión MP4",
                        Nombre: "[SV] Suarez523",
                    },
                    {
                        Cargo: "Latigazos",
                        Nombre: "[Sr] Duende",
                    },
                ],
            },
            DatosTecnicos: {
                NombreJapones: "やはり俺の青春ラブコメはまちがっている。続",
                NombreJaponesRomaji:
                    "Yahari Ore no Seishun Rabu Kome wa Machigatteiru. Zoku",
                NombreAlternativo:
                    "My Youth Romantic Comedy Is Wrong As I Expected.",
                NombreAlternativoTraduccion:
                    "Mi comedia romántica juvenil está tan mal como esperaba. La secuela",
                Categoria: Categoria.SerieBluray,
                Genero: "Comedia romántica, recuentos de la vida",
                Episodios: "13 + OVA",
                Estudio: "Feel",
                FormatosArchivos:
                    "[.AVI 704×396 xVID] [.MP4 1280x720 x264] [.MP4 1920x1080 x264]",
                TamanoArchivos:
                    "[.AVI 300 MB] [.MP4 720p Peso variable] [.MP4 1080p Peso variable]",
                GraficoAvance:
                    "<iframe width='600' height='371' seamless frameborder='0' scrolling='no' src='https://docs.google.com/spreadsheets/d/1vdYD1nhj2Xt3Chem1pINDe_Soc_9p8g3ddv9J__NsrI/pubchart?oid=1270762129&amp;format=interactive'></iframe>",
            },
        };
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
        const plantillaSerializada = serializarPlantilla();
        navigator.clipboard.writeText(plantillaSerializada);
        alert("Plantilla copiada al portapapeles");
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
</style>
