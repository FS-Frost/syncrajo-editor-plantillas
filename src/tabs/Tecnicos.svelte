<script lang="ts">
    import type { DatosTecnicos } from "../plantilla";
    import { Categoria } from "../plantilla";

    export let datos: DatosTecnicos;
</script>

<div class="editor">
    <!-- Nombre japonés -->
    <div class="field">
        <label class="label" for="">Nombre japonés</label>
        <div class="control">
            <input class="input" type="text" bind:value={datos.NombreJapones} />
        </div>
    </div>

    <!-- Nombre japonés (romaji) -->
    <div class="field">
        <label class="label" for="">Nombre japonés (romaji)</label>
        <div class="control">
            <input
                class="input"
                type="text"
                bind:value={datos.NombreJaponesRomaji}
            />
        </div>
    </div>

    <!-- Nombre alternativo -->
    <div class="field">
        <label class="label" for="">Nombre alternativo</label>
        <div class="control">
            <input
                class="input"
                type="text"
                bind:value={datos.NombreAlternativo}
            />
        </div>
    </div>

    <!-- Nombre alternativo (traducción) -->
    <div class="field">
        <label class="label" for="">Nombre alternativo (traducción)</label>
        <div class="control">
            <input
                class="input"
                type="text"
                bind:value={datos.NombreAlternativoTraduccion}
            />
        </div>
    </div>

    <!-- Categoría -->
    <div class="field">
        <label class="label" for="">Categoría</label>
        <div class="control">
            <div class="select is-fullwidth">
                <select bind:value={datos.Categoria}>
                    <option value={Categoria.Enum.Serie}
                        >{Categoria.Enum.Serie}</option
                    >
                    <option value={Categoria.Enum["Serie Blu-ray"]}
                        >{Categoria.Enum["Serie Blu-ray"]}</option
                    >
                    <option value={Categoria.Enum.OVA}
                        >{Categoria.Enum.OVA}</option
                    >
                    <option value={Categoria.Enum.Película}
                        >{Categoria.Enum.Película}</option
                    >
                </select>
            </div>
        </div>
    </div>

    <!-- Género -->
    <div class="field">
        <label class="label" for="">Género</label>
        <div class="control">
            <input
                class="input"
                type="text"
                title="Recuentos de la vida, aventura, escolar, etc."
                bind:value={datos.Genero}
            />
        </div>
    </div>

    <!-- Cantidad de episodios -->
    <div class="field">
        <label class="label" for="">Cantidad de episodios</label>
        <div class="control">
            <input class="input" type="text" bind:value={datos.Episodios} />
        </div>
    </div>

    <!-- Estudio -->
    <div class="field">
        <label class="label" for="">Estudio de producción</label>
        <div class="control">
            <input class="input" type="text" bind:value={datos.Estudio} />
        </div>
    </div>

    <!-- Formatos de archivos -->
    <div class="field">
        <label class="label" for="">Formatos de archivos</label>
        <div class="control">
            <input
                class="input"
                type="text"
                bind:value={datos.FormatosArchivos}
            />
        </div>
    </div>

    <!-- Tamaños de archivos -->
    <div class="field">
        <label class="label" for="">Tamaños de archivos</label>
        <div class="control">
            <input
                class="input"
                type="text"
                bind:value={datos.TamanoArchivos}
            />
        </div>
    </div>

    <!-- Gráfico de avance -->
    <div class="field">
        <label class="label" for="">Gráfico de avance</label>
        <div class="control">
            <input
                class="input"
                type="text"
                bind:value={datos.HtmlGraficoAvance}
            />
        </div>
    </div>
</div>

<style>
</style>
