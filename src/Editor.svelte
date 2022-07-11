<script lang="ts">
    import { newPlantillaEjemplo, Plantilla } from "./plantilla";
    import Basicos from "./tabs/Basicos.svelte";
    import Descarga from "./tabs/Descarga.svelte";
    import Opciones from "./tabs/Opciones.svelte";
    import Staff from "./tabs/Staff.svelte";
    import { Section, Tab } from "./tabs/tabs";
    import Tecnicos from "./tabs/Tecnicos.svelte";
    import VistaPrevia from "./tabs/VistaPrevia.svelte";

    const sections: Section[] = [
        {
            Tab: Tab.Basicos,
            Name: "Básicos",
        },
        {
            Tab: Tab.Descarga,
            Name: "Descarga",
        },
        {
            Tab: Tab.Staff,
            Name: "Staff",
        },
        {
            Tab: Tab.Tecnicos,
            Name: "Técnicos",
        },
        {
            Tab: Tab.VistaPrevia,
            Name: "Vista previa",
        },
    ];

    let divPlantilla: HTMLDivElement | null = null;
    let plantilla: Plantilla = newPlantillaEjemplo();
    let activeTab: Tab = Tab.Basicos;
    $: esTabVistaPrevia = activeTab == Tab.VistaPrevia;
    $: mensajesValidacion = validarPlantilla(plantilla);

    function setTab(tab: Tab) {
        activeTab = tab;
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

        for (let i = 0; i < plantilla.DatosDescarga.Botones.length; i++) {
            const numeroBoton = i + 1;
            seccion = `Datos de descarga, botón ${numeroBoton}`;
            const boton = plantilla.DatosDescarga.Botones[i];

            if (boton.Texto == "") {
                mensajes.push(`${seccion}: texto no definido.`);
            }

            if (boton.Url == "") {
                mensajes.push(`${seccion}: URL no definida.`);
            }

            if (boton.Color == "") {
                mensajes.push(`${seccion}: color no definido.`);
            }
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

        if (plantilla.DatosTecnicos.HtmlGraficoAvance == "") {
            mensajes.push(`${seccion}: gráfico de avance no definido.`);
        }

        return mensajes;
    }
</script>

<div class="editor">
    <Opciones bind:plantilla bind:divPlantilla bind:mensajesValidacion />

    <div class="tabs is-centered">
        <ul>
            {#each sections as section}
                <li
                    class={activeTab == section.Tab ? "is-active" : ""}
                    on:click={() => setTab(section.Tab)}
                >
                    <a href={`#${section.Name.toLowerCase()}`}>{section.Name}</a
                    >
                </li>
            {/each}
        </ul>
    </div>

    <div class="columns">
        <div
            class="column {esTabVistaPrevia ? 'is-hidden' : 'is-6'} mr-3"
            style="max-height: 100vh; overflow: auto;"
        >
            {#if activeTab == Tab.Basicos}
                <Basicos bind:datos={plantilla.DatosBasicos} />
            {:else if activeTab == Tab.Descarga}
                <Descarga bind:datos={plantilla.DatosDescarga} />
            {:else if activeTab == Tab.Staff}
                <Staff bind:datos={plantilla.DatosStaff} />
            {:else if activeTab == Tab.Tecnicos}
                <Tecnicos bind:datos={plantilla.DatosTecnicos} />
            {/if}
        </div>

        <div class="column {esTabVistaPrevia ? 'is-12' : 'is-6'}">
            <VistaPrevia
                bind:plantilla
                bind:divPlantilla
                bind:mensajesValidacion
                scrollVisible={!esTabVistaPrevia}
            />
        </div>
    </div>
</div>

<style>
    .editor {
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 5%;
        margin-right: 5%;
    }
</style>
