<script lang="ts">
    import Swal from "sweetalert2";
    import { Color } from "$lib/color";
    import {
        type BotonDescarga,
        BotonDescargaColorDefault,
        type DatosDescarga,
    } from "$lib/plantilla";

    type Props = {
        datos: DatosDescarga;
    };

    let { datos = $bindable() }: Props = $props();

    const sinTexto: string = "[Sin texto]";

    let indexBotonActivo = $state<number>(-1);

    function alternatBoton(index: number) {
        if (indexBotonActivo == index) {
            indexBotonActivo = -1;
            return;
        }

        indexBotonActivo = index;
    }

    function agregarBoton() {
        const boton: BotonDescarga = {
            Texto: "",
            Url: "",
            Color: BotonDescargaColorDefault,
        };

        datos.Botones = [...datos.Botones, boton];
        indexBotonActivo = -1;
    }

    async function quitarBoton(indexBoton: number) {
        const boton = datos.Botones[indexBoton];
        const result = await Swal.fire({
            title: `¿Quitar botón '${boton.Texto}'?`,
            text: "Este cambio es irreversible.",
            icon: "question",
            confirmButtonText: "Quitar",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            confirmButtonColor: Color.Danger,
        });

        if (!result.isConfirmed) {
            return;
        }

        datos.Botones = datos.Botones.filter((_, index) => index != indexBoton);
    }

    function moverBoton(currentIndex: number, newIndex: number) {
        if (newIndex < 0 || newIndex >= datos.Botones.length) {
            return;
        }

        const boton = datos.Botones[currentIndex];
        datos.Botones.splice(currentIndex, 1);
        datos.Botones.splice(newIndex, 0, boton);
        datos.Botones = [...datos.Botones];

        if (indexBotonActivo == currentIndex) {
            alternatBoton(newIndex);
        }
    }

    function subirBoton(indexBoton: number) {
        const newIndex = indexBoton - 1;
        moverBoton(indexBoton, newIndex);
    }

    function bajarBoton(indexBoton: number) {
        const newIndex = indexBoton + 1;
        moverBoton(indexBoton, newIndex);
    }
</script>

<div class="editor">
    <!-- Opciones -->
    <div>
        <button
            aria-label="agregar botón"
            class="button is-primary"
            title="Agregar nuevo botón"
            onclick={() => agregarBoton()}
        >
            <span class="icon">
                <i class="fa-solid fa-plus"></i>
            </span>
        </button>
    </div>

    {#each datos.Botones as boton, index}
        <div class="cabecera">
            <div class="mt-1 mr-1">
                <!-- Subir -->
                <button
                    aria-label="subir"
                    class="button is-primary is-small"
                    title="Subir este botón{boton.Texto != ''
                        ? `: "${boton.Texto}"`
                        : ''}"
                    onclick={() => subirBoton(index)}
                    disabled={index <= 0}
                >
                    <span class="icon">
                        <i class="fa-solid fa-arrow-up"></i>
                    </span>
                </button>

                <!-- Bajar -->
                <button
                    aria-label="bajar"
                    class="button is-primary is-small"
                    title="Subir este botón{boton.Texto != ''
                        ? `: "${boton.Texto}"`
                        : ''}"
                    onclick={() => bajarBoton(index)}
                    disabled={index >= datos.Botones.length - 1}
                >
                    <span class="icon">
                        <i class="fa-solid fa-arrow-down"></i>
                    </span>
                </button>

                <!-- Quitar -->
                <button
                    aria-label="quitar"
                    class="button is-danger is-small"
                    title="Quitar este botón{boton.Texto != ''
                        ? `: "${boton.Texto}"`
                        : ''}"
                    onclick={() => quitarBoton(index)}
                >
                    <span class="icon">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </button>
            </div>

            <span
                role="button"
                tabindex="0"
                onclick={() => alternatBoton(index)}
                onkeydown={() => {}}
            >
                <p
                    class="cabecera-boton"
                    title={indexBotonActivo == index ? "Ocultar" : "Mostrar"}
                >
                    {index + 1}. {boton.Texto == "" ? sinTexto : boton.Texto}
                </p>
            </span>
        </div>

        {#if indexBotonActivo == index}
            <div class="cuerpo-boton">
                <!-- Texto -->
                <div class="field">
                    <label class="label" for="">Texto</label>
                    <div class="control">
                        <input
                            class="input"
                            type="text"
                            placeholder={sinTexto}
                            bind:value={boton.Texto}
                        />
                    </div>
                </div>

                <!-- URL -->
                <div class="field">
                    <label class="label" for="">URL</label>
                    <div class="control">
                        <input
                            class="input"
                            type="text"
                            bind:value={boton.Url}
                            disabled={boton.Texto == ""}
                        />
                    </div>
                </div>

                <!-- Color -->
                <div class="field">
                    <label class="label" for="">Color</label>
                    <div class="control">
                        <input
                            class="input"
                            type="color"
                            bind:value={boton.Color}
                        />
                    </div>
                </div>
            </div>
        {/if}
    {/each}
</div>

<style>
    .cabecera {
        display: flex;
    }

    .cabecera-boton {
        font-size: medium;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.3rem;
        padding-top: 0.4rem;
    }

    .cabecera-boton:hover {
        background-color: rgb(241, 241, 241);
    }
</style>
