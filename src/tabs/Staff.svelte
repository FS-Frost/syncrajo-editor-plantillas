<script lang="ts">
    import type { DatosStaff, Integrante } from "../plantilla";

    export let datos: DatosStaff;
    let indexIntegranteActivo: number;
    let inputCargo: HTMLInputElement;

    function manejarCargoActualizado(
        e: Event & {
            currentTarget: EventTarget & HTMLInputElement;
        }
    ) {
        const input = e.target as HTMLInputElement;
        const cargoModificado = input.value;
        let integranteActivo = datos.Integrantes[indexIntegranteActivo];

        if (integranteActivo == null) {
            console.warn("no se encontró el integrante activo");
            return;
        }

        integranteActivo.Cargo = cargoModificado;
        datos.Integrantes = [...datos.Integrantes];
        integranteActivo.Cargo = cargoModificado;
    }

    function manejarNombreActualizado(
        e: Event & {
            currentTarget: EventTarget & HTMLInputElement;
        }
    ) {
        const input = e.target as HTMLInputElement;
        const nombreModificado = input.value;
        let integranteActivo = datos.Integrantes[indexIntegranteActivo];

        if (integranteActivo == null) {
            console.warn("no se encontró el integrante activo");
            return;
        }

        integranteActivo.Nombre = nombreModificado;
        datos.Integrantes = [...datos.Integrantes];
        integranteActivo.Nombre = nombreModificado;
    }

    function agregarIntegrante() {
        const nuevoIntegrante: Integrante = {
            Cargo: "",
            Nombre: "",
        };

        datos.Integrantes = [...datos.Integrantes, nuevoIntegrante];
        indexIntegranteActivo = datos.Integrantes.length - 1;
        inputCargo.focus();
    }

    function quitarIntegrante() {
        datos.Integrantes = datos.Integrantes.filter(
            (_, index) => index != indexIntegranteActivo
        );
        indexIntegranteActivo =
            indexIntegranteActivo > 0 ? indexIntegranteActivo - 1 : 0;

        if (datos.Integrantes.length == 0) {
            agregarIntegrante();
            return;
        }

        inputCargo.focus();
    }
</script>

<div class="editor">
    <!-- Integrantes -->
    <div class="field">
        <!-- Cargo -->
        <label class="label" for="">Cargo</label>
        <div class="control">
            <div class="select is-fullwidth">
                <select bind:value={indexIntegranteActivo}>
                    {#each datos.Integrantes as integrante, index}
                        <option value={index}
                            >{`${integrante.Cargo}: ${integrante.Nombre}`}</option
                        >
                    {/each}
                </select>
            </div>
        </div>

        <div class="control mt-3">
            <input
                class="input"
                type="text"
                value={datos.Integrantes[indexIntegranteActivo]?.Cargo ?? ""}
                bind:this={inputCargo}
                on:input={manejarCargoActualizado}
            />
        </div>

        <!-- Nombre -->
        <label class="label" for="">Integrantes</label>
        <div class="control">
            <input
                class="input"
                type="text"
                value={datos.Integrantes[indexIntegranteActivo]?.Nombre ?? ""}
                on:input={manejarNombreActualizado}
            />
        </div>

        <!-- Opciones -->
        <div>
            <button
                class="button is-primary"
                title="Agregar integrante"
                on:click={() => agregarIntegrante()}
            >
                <span class="icon">
                    <i class="fa-solid fa-plus" />
                </span>
            </button>

            <button
                class="button is-danger"
                title="Quitar integrante"
                on:click={() => quitarIntegrante()}
            >
                <span class="icon">
                    <i class="fa-solid fa-xmark" />
                </span>
            </button>
        </div>
    </div>
</div>

<style>
</style>
