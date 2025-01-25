<script lang="ts">
    import {
        newPlantillaEjemplo,
        Plantilla,
        validarPlantilla,
    } from "$lib//plantilla";
    import Basicos from "./tabs/Basicos.svelte";
    import Descarga from "./tabs/Descarga.svelte";
    import Opciones from "./tabs/Opciones.svelte";
    import Staff from "./tabs/Staff.svelte";
    import { type Section, Tab } from "./tabs/tabs";
    import Tecnicos from "./tabs/Tecnicos.svelte";
    import VistaPrevia from "./tabs/VistaPrevia.svelte";

    const sections: Section[] = [
        {
            Tab: Tab.Basicos,
            Name: "Datos básicos",
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
            Name: "Datos técnicos",
        },
        {
            Tab: Tab.VistaPrevia,
            Name: "Vista previa",
        },
    ];

    let divPlantilla = $state<HTMLDivElement>();
    let plantilla = $state<Plantilla>(newPlantillaEjemplo());
    let activeTab = $state<Tab>(Tab.Basicos);

    let esTabVistaPrevia: boolean = $derived(activeTab == Tab.VistaPrevia);

    let mensajesValidacion: string[] = $derived(validarPlantilla(plantilla));

    function setTab(tab: Tab) {
        activeTab = tab;
    }
</script>

<div class="editor">
    <h1 class="title">Editor de plantillas</h1>

    <Opciones bind:plantilla bind:divPlantilla {mensajesValidacion} />

    <div class="tabs is-centered">
        <ul>
            {#each sections as section}
                <li class={activeTab == section.Tab ? "is-active" : ""}>
                    <a
                        href={`#${section.Name.toLowerCase()}`}
                        onclick={() => setTab(section.Tab)}
                        onkeydown={() => {}}
                    >
                        {section.Name}
                    </a>
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
                {mensajesValidacion}
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

    .title {
        width: 100%;
        text-align: center;
    }
</style>
