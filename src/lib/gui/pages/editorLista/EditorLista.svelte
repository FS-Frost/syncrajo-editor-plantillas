<script lang="ts">
    import { type Section, Tab } from "../tabs/tabs";
    import {
        newPlantillaProyectosEjemplo,
        PlantillaProyectos,
        validarPlantillaProyectos,
    } from "./plantillaLista";
    import TabEdicion from "./TabEdicion.svelte";

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

    let divPlantilla = $state<HTMLDivElement>();
    let plantilla = $state<PlantillaProyectos>(newPlantillaProyectosEjemplo());
    let activeTab = $state<Tab>(Tab.Basicos);

    let esTabVistaPrevia: boolean = $derived(activeTab == Tab.VistaPrevia);

    let mensajesValidacion: string[] = $derived(
        validarPlantillaProyectos(plantilla),
    );

    function setTab(tab: Tab) {
        activeTab = tab;
    }
</script>

<!-- <div class="editor"> -->
<h1 class="title">Editor de listas</h1>

<!-- <Opciones bind:plantilla bind:divPlantilla bind:mensajesValidacion /> -->

<div class="tabs is-centered">
    <ul>
        {#each sections as section}
            <li class={activeTab == section.Tab ? "is-active" : ""}>
                <a
                    href={`#${section.Name.toLowerCase()}`}
                    onclick={() => setTab(section.Tab)}
                    onkeydown={() => {}}>{section.Name}</a
                >
            </li>
        {/each}
    </ul>
</div>

<!-- <div class="columns"> -->
<!-- <div class="column mr-3" style="max-height: 100vh; overflow: auto;"> -->
{#if activeTab == Tab.Basicos}
    <TabEdicion bind:plantilla />
{/if}

<!-- </div> -->
<!-- </div> -->

<!-- </div> -->
<style>
    /* .editor {
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 5%;
        margin-right: 5%;
    } */
</style>
