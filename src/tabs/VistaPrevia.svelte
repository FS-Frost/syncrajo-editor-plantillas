<script lang="ts">
    import type { Plantilla } from "../plantilla";

    export let plantilla: Plantilla;
    export let divPlantilla: HTMLDivElement | null;
    export let scrollVisible: boolean = false;
    export let mensajesValidacion: string[];

    let divGrafico: HTMLDivElement;
    $: plantilla.DatosTecnicos.HtmlGraficoAvance, actualizarGrafico(plantilla);

    function actualizarGrafico(plantilla: Plantilla) {
        if (divGrafico == null) {
            return;
        }

        divGrafico.innerHTML = plantilla.DatosTecnicos.HtmlGraficoAvance;
    }
</script>

<div style={scrollVisible ? "max-height: 100vh; overflow: auto;" : ""}>
    <div>
        {#each mensajesValidacion as mensaje}
            <p class="has-text-danger">{mensaje}</p>
        {/each}
    </div>

    <div bind:this={divPlantilla}>
        <!-- Plantilla generada en Asu -->
        <div
            style="font-family: Arial, Helvetica, sans-serif; text-align: left"
        >
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
                <blockquote class="tr_bq" style="font: unset !important;">
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
                    <b>Nombre Japonés: </b><span
                        class="t_nihongo_kanji"
                        lang="ja"
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
            <div
                style="display: flex; flex-direction: column; justify-content: center; align-items: center;"
            >
                {#each plantilla.DatosDescarga.Botones as boton}
                    <div style="display: flex; flex-direction: row;">
                        <a href={boton.Url} target="_blank">
                            <button
                                class="boton"
                                style="background-color: {boton.Color};color: white;border: 0px;border-radius: 0.2rem;width: 20rem;height: 3rem;font-weight: bold;font-size: 1.2rem;cursor:pointer; margin-bottom: 10px"
                                >{boton.Texto}</button
                            ></a
                        >
                    </div>
                {/each}
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
</div>

<style>
    blockquote {
        font: unset !important;
        margin: 1em 20px;
        background-color: #f9f9f9;
        border-color: #cccccc;
        border-left: 4px solid #cccccc;
        border-style: dashed dashed dashed solid;
        border-width: 1px 1px 1px 4px;
        padding: 10px;
    }

    ul {
        display: block;
        list-style-type: disc;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 40px;
    }

    fieldset {
        display: block;
        margin-inline-start: 2px;
        margin-inline-end: 2px;
        padding-block-start: 0.35em;
        padding-inline-start: 0.75em;
        padding-inline-end: 0.75em;
        padding-block-end: 0.625em;
        min-inline-size: min-content;
        border-width: 2px;
        border-style: groove;
        border-color: rgb(192, 192, 192);
        border-image: initial;
    }
</style>
