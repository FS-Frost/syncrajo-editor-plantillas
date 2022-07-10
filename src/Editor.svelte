<script lang="ts">
    import { newPlantilla, Plantilla } from "./plantilla";
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
    let plantilla: Plantilla = newPlantilla();
    let activeTab: Tab = Tab.VistaPrevia;

    function setTab(tab: Tab) {
        activeTab = tab;
    }
</script>

<div class="editor">
    <Opciones bind:plantilla bind:divPlantilla />

    <div class="tabs">
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

    {#if activeTab == Tab.Basicos}
        <Basicos bind:datos={plantilla.DatosBasicos} />
    {:else if activeTab == Tab.Descarga}
        <Descarga bind:datos={plantilla.DatosDescarga} />
    {:else if activeTab == Tab.Staff}
        <Staff bind:datos={plantilla.DatosStaff} />
    {:else if activeTab == Tab.Tecnicos}
        <Tecnicos bind:datos={plantilla.DatosTecnicos} />
    {:else}
        <VistaPrevia bind:plantilla bind:divPlantilla />
    {/if}
</div>

<style>
    .editor {
        margin: 5%;
    }
</style>
