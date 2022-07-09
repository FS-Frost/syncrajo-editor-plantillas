<script lang="ts">
    import { newPlantilla, Plantilla } from "./plantilla";
    import Basicos from "./tabs/Basicos.svelte";
    import Descarga from "./tabs/Descarga.svelte";
    import Opciones from "./tabs/Opciones.svelte";
    import Staff from "./tabs/Staff.svelte";
    import Tecnicos from "./tabs/Tecnicos.svelte";

    let plantilla: Plantilla = newPlantilla();

    enum tabs {
        Basicos,
        Descarga,
        Staff,
        Tenicos,
    }

    let activeTab: tabs = tabs.Basicos;

    function setTab(tab: tabs) {
        activeTab = tab;
    }

    function classIsActiveTab(tab: tabs): string {
        return activeTab == tab ? "is-active" : "";
    }
</script>

<div class="editor">
    <Opciones bind:plantilla />

    <div class="tabs">
        <ul>
            <li
                class={classIsActiveTab(tabs.Basicos)}
                on:click={() => setTab(tabs.Basicos)}
            >
                <a href="#basicos">Básicos</a>
            </li>

            <li
                class={classIsActiveTab(tabs.Descarga)}
                on:click={() => setTab(tabs.Descarga)}
            >
                <a href="#descarga">Descarga</a>
            </li>

            <li
                class={classIsActiveTab(tabs.Staff)}
                on:click={() => setTab(tabs.Staff)}
            >
                <a href="#staff">Staff</a>
            </li>

            <li
                class={classIsActiveTab(tabs.Tenicos)}
                on:click={() => setTab(tabs.Tenicos)}
            >
                <a href="#tecnicos">Técnicos</a>
            </li>
        </ul>
    </div>

    {#if activeTab == tabs.Basicos}
        <Basicos bind:datos={plantilla.DatosBasicos} />
    {:else if activeTab == tabs.Descarga}
        <Descarga bind:datos={plantilla.DatosDescarga} />
    {:else if activeTab == tabs.Staff}
        <Staff bind:datos={plantilla.DatosStaff} />
    {:else}
        <Tecnicos bind:datos={plantilla.DatosTecnicos} />
    {/if}
</div>

<style>
    .editor {
        margin: 5%;
    }
</style>
