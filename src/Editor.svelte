<script lang="ts">
    import {
        newPlantillaEjemplo,
        Plantilla,
        validarPlantilla,
    } from "./plantilla";
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
