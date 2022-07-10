<script lang="ts">
    import type { Plantilla } from "../plantilla";

    export let plantilla: Plantilla;
    export let divPlantilla: HTMLDivElement | null;

    let divGrafico: HTMLDivElement;
    $: plantilla.DatosTecnicos.GraficoAvance, actualizarGrafico(plantilla);
    $: mensajesValidacion = validarPlantilla(plantilla);

    function actualizarGrafico(plantilla: Plantilla) {
        if (divGrafico == null) {
            return;
        }

        divGrafico.innerHTML = plantilla.DatosTecnicos.GraficoAvance;
    }

    function validarPlantilla(plantilla: Plantilla): string[] {
        const mensajes: string[] = [];
        let seccion = "Datos básicos";

        if (plantilla.DatosBasicos.Proyecto == "") {
            mensajes.push(`${seccion}: Nombre del proyecto no definido.`);
        }

        if (plantilla.DatosBasicos.UrlImagen == "") {
            mensajes.push(`${seccion}: URL de imagen no definida.`);
        }

        if (plantilla.DatosBasicos.Sinopsis == "") {
            mensajes.push(`${seccion}: Sinopsis no definida.`);
        }

        seccion = "Datos de descarga";

        if (plantilla.DatosDescarga.UrlBotonMp4 == "") {
            mensajes.push(`${seccion}: URL del botón MP4 no definida.`);
        }

        if (plantilla.DatosDescarga.UrlArchivosMp4 == "") {
            mensajes.push(`${seccion}: URL de los archivos MP4 no definida.`);
        }

        if (plantilla.DatosDescarga.UrlBotonAvi == "") {
            mensajes.push(`${seccion}: URL del botón AVI no definida.`);
        }

        if (plantilla.DatosDescarga.UrlArchivosAvi == "") {
            mensajes.push(`${seccion}: URL de los archivos AVI no definida.`);
        }

        seccion = "Datos del staff";

        if (plantilla.DatosStaff.Integrantes.length == 0) {
            mensajes.push(`${seccion}: 0 integrantes definidos.`);
        }

        for (let i = 0; i < plantilla.DatosStaff.Integrantes.length; i++) {
            const integrante = plantilla.DatosStaff.Integrantes[i];
            const numIntegrante = i + 1;

            if (integrante.Cargo == "") {
                mensajes.push(
                    `${seccion}: integrante ${numIntegrante}, cargo no definido.`
                );
            }

            if (integrante.Nombre == "") {
                mensajes.push(
                    `${seccion}: integrante ${numIntegrante}, nombre no definido.`
                );
            }
        }

        seccion = "Datos técnicos";

        if (plantilla.DatosTecnicos.NombreJapones == "") {
            mensajes.push(`${seccion}: nombre japonés no definido.`);
        }

        if (plantilla.DatosTecnicos.NombreJaponesRomaji == "") {
            mensajes.push(`${seccion}: nombre japonés (romaji) no definido.`);
        }

        if (plantilla.DatosTecnicos.NombreAlternativo == "") {
            mensajes.push(`${seccion}: nombre alternativo no definido.`);
        }

        if (plantilla.DatosTecnicos.NombreAlternativoTraduccion == "") {
            mensajes.push(
                `${seccion}: nombre alternativo (traducción) no definido.`
            );
        }

        if (plantilla.DatosTecnicos.Genero == "") {
            mensajes.push(`${seccion}: género no definido.`);
        }

        if (plantilla.DatosTecnicos.Episodios == "") {
            mensajes.push(`${seccion}: cantidad de episodios no definida.`);
        }

        if (plantilla.DatosTecnicos.Estudio == "") {
            mensajes.push(`${seccion}: estudio no definido.`);
        }

        if (plantilla.DatosTecnicos.FormatosArchivos == "") {
            mensajes.push(`${seccion}: formatos de archivos no definidos.`);
        }

        if (plantilla.DatosTecnicos.TamanoArchivos == "") {
            mensajes.push(`${seccion}: tamaños de archivos no definidos.`);
        }

        if (plantilla.DatosTecnicos.GraficoAvance == "") {
            mensajes.push(`${seccion}: gráfico de avance no definido.`);
        }

        return mensajes;
    }
</script>

<div>
    {#each mensajesValidacion as mensaje}
        <p class="has-text-danger">{mensaje}</p>
    {/each}
</div>

<div bind:this={divPlantilla}>
    <!-- Plantilla generada en Asu -->
    <div style="font-family: Arial, Helvetica, sans-serif; text-align: left">
        <!-- Imagen del proyecto -->
        <div class="separator" style="clear: both; text-align: center">
            <a href={plantilla.DatosBasicos.UrlImagen} target="_blank">
                <img
                    alt=""
                    width="640"
                    src={plantilla.DatosBasicos.UrlImagen}
                />
            </a>
        </div>
        <br />
        <!-- Alineando a la izquierda -->
        <div style="text-align: left">
            <!-- Sinopsis -->
            <b>Sinopsis:</b>
            <blockquote class="tr_bq">
                {plantilla.DatosBasicos.Sinopsis}
            </blockquote>
        </div>

        <!-- Datos del proyecto -->
        <div>
            <fieldset>
                <legend>
                    <b>Datos Técnicos</b>
                </legend>
                <br />
                <b>Nombre Japonés: </b><span class="t_nihongo_kanji" lang="ja"
                    >{plantilla.DatosTecnicos.NombreJapones}
                </span>
                <i>{plantilla.DatosTecnicos.NombreJaponesRomaji}</i>
                <br />
                <b>Nombres Alternativos: </b>{plantilla.DatosTecnicos
                    .NombreAlternativo}
                <i>{plantilla.DatosTecnicos.NombreAlternativoTraduccion}</i>
                <br />
                <b>Categoría: </b>{plantilla.DatosTecnicos.Categoria}
                <br />
                <b>Género: </b>{plantilla.DatosTecnicos.Genero}
                <br />
                <b>Episodios: </b>{plantilla.DatosTecnicos.Episodios}
                <br />
                <b>Producción: </b>{plantilla.DatosTecnicos.Estudio}
                <br />
                <b>Idioma: </b>Japonés (subtitulos en español)
                <br />
                <b>Códec y formato de video: </b>{plantilla.DatosTecnicos
                    .FormatosArchivos}
                <br />
                <b>Tamaño capítulos: </b>{plantilla.DatosTecnicos
                    .TamanoArchivos}
            </fieldset>
            <br />
        </div>

        <!-- Botones de descarga
		 Alineando al centro -->
        <div style="text-align: center">
            <a href={plantilla.DatosDescarga.UrlArchivosMp4} target="_blank"
                ><img
                    height="49"
                    alt={plantilla.DatosDescarga.UrlArchivosMp4}
                    src={plantilla.DatosDescarga.UrlBotonMp4}
                    width="320"
                /></a
            >

            <a href={plantilla.DatosDescarga.UrlArchivosAvi} target="_blank"
                ><img
                    height="49"
                    alt={plantilla.DatosDescarga.UrlArchivosAvi}
                    src={plantilla.DatosDescarga.UrlBotonAvi}
                    width="320"
                /></a
            >
        </div>

        <!-- Alineando a la izquierda -->
        <div style="text-align: left">
            <fieldset>
                <legend>
                    <b>Staff del proyecto</b>
                </legend>
                <ul>
                    {#each plantilla.DatosStaff.Integrantes as integrante}
                        <li>{integrante.Cargo}: {integrante.Nombre}</li>
                    {/each}
                </ul>
            </fieldset>
        </div>

        <!-- Gráfico de avance -->
        <div style="text-align: left">
            <br />
            <fieldset>
                <legend>
                    <b>Estado de avance</b>
                </legend>
                <div bind:this={divGrafico} />
            </fieldset>
        </div>
    </div>
</div>

<style>
    ul {
        list-style-type: disc;
    }
</style>
