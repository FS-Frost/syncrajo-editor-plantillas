<script lang="ts">
    import {
        BotonDescarga,
        BotonDescargaColorDefault,
        DatosDescarga,
    } from "../plantilla";

    export let datos: DatosDescarga;
    let indexBotonActivo = -1;

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

    function quitarBoton(indexQuitar: number) {
        datos.Botones = datos.Botones.filter(
            (_, index) => index != indexQuitar
        );
    }
</script>

<div class="editor">
    <!-- Opciones -->
    <div>
        <button
            class="button is-primary"
            title="Agregar nuevo botón"
            on:click={() => agregarBoton()}
        >
            <span class="icon">
                <i class="fa-solid fa-plus" />
            </span>
        </button>
    </div>

    {#each datos.Botones as boton, index}
        <!-- Cabecera -->
        <p
            class="cabecera-boton"
            title={indexBotonActivo == index ? "Ocultar" : "Mostrar"}
            on:click={() => alternatBoton(index)}
        >
            {index + 1}. {boton.Texto == "" ? "[Sin texto]" : boton.Texto}
        </p>

        {#if indexBotonActivo == index}
            <div class="cuerpo-boton">
                <!-- Quitar -->
                <div class="mt-1">
                    <button
                        class="button is-danger is-small"
                        title="Quitar este botón{boton.Texto != ''
                            ? `: "${boton.Texto}"`
                            : ''}"
                        on:click={() => quitarBoton(index)}
                    >
                        <span class="icon">
                            <i class="fa-solid fa-xmark" />
                        </span>
                    </button>
                </div>

                <!-- Texto -->
                <div class="field">
                    <label class="label" for="">Texto</label>
                    <div class="control">
                        <input
                            class="input"
                            type="text"
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
    .cabecera-boton {
        font-size: medium;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.3rem;
    }

    .cabecera-boton:hover {
        background-color: rgb(241, 241, 241);
    }

    .cuerpo-boton {
        margin-left: 1rem;
    }
</style>
