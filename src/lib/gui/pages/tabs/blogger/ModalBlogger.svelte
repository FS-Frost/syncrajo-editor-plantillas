<script lang="ts">
    import Modal from "$lib/gui/Modal.svelte";
    import { getPostByPath, patchPost, getAccessToken } from "$lib/blogger";
    import Swal from "sweetalert2";
    import { Color } from "$lib/color";
    import type { Plantilla } from "$lib/plantilla";

    type Props = {
        plantilla: Plantilla;
        divPlantilla?: HTMLDivElement;
        onOpen?: () => void;
        onClose?: () => void;
    };

    let {
        plantilla = $bindable(),
        divPlantilla = $bindable(),
        onOpen,
        onClose,
    }: Props = $props();

    const API_KEY = "AIzaSyDhhGHRI-oCAmzVI2gI1o-5agTv8ZvhgdA";
    const BLOG_ID = "7611653098802621655";

    let modal = $state<Modal>();

    let pathBlogger: string = $derived(
        getUrlPath(plantilla.DatosBasicos.UrlBlogger),
    );

    export function open() {
        modal?.open();
    }

    export function close() {
        modal?.close();
    }

    function getUrlPath(url: string): string {
        try {
            return new URL(url).pathname;
        } catch (error) {
            return "";
        }
    }

    async function publicar() {
        const result = await Swal.fire({
            title: "¿Publicar en Blogger?",
            text: "Esta acción es irreversible.",
            confirmButtonText: "Publicar",
            confirmButtonColor: Color.Primary,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
        });

        if (!result.isConfirmed) {
            return;
        }

        Swal.fire("Obteniendo URL de Blogger...");
        Swal.showLoading();
        const currentPost = await getPostByPath(API_KEY, BLOG_ID, pathBlogger);

        if (Swal.isVisible()) {
            Swal.close();
        }

        if (!currentPost) {
            await Swal.fire({
                title: "Error",
                icon: "error",
                text: "La URL de Blogger es inválida.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: Color.Primary,
            });
            return;
        }

        Swal.fire("Autorizando...");
        Swal.showLoading();
        const accessToken = await getAccessToken();

        if (Swal.isVisible()) {
            Swal.close();
        }

        if (accessToken == "") {
            await Swal.fire({
                title: "Error",
                icon: "error",
                text: "No se pudo autenticar la solicitud.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: Color.Primary,
            });
            return;
        }

        Swal.fire("Actualizando en Blogger...");
        Swal.showLoading();

        const plantillaHTML = divPlantilla?.innerHTML ?? "";
        const updatedPost = await patchPost(
            accessToken,
            BLOG_ID,
            currentPost.id,
            plantillaHTML,
        );

        if (Swal.isVisible()) {
            Swal.close();
        }

        if (!updatedPost) {
            await Swal.fire({
                title: "Error",
                icon: "error",
                text: "No se pudo realizar la actualización.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: Color.Primary,
            });
            return;
        }

        await Swal.fire({
            title: "Éxito",
            icon: "success",
            text: "Actualización realizada.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: Color.Primary,
        });
    }
</script>

<Modal
    bind:this={modal}
    title="Publicar en Blogger"
    cancelButtonText="Cerrar"
    onOpen={() => {
        if (onOpen != null) {
            onOpen();
        }
    }}
    onClose={() => {
        if (onClose != null) {
            onClose();
        }
    }}
>
    <!-- URL Blogger -->
    <div class="field">
        <label class="label" for="">URL de Blogger</label>
        <div class="control">
            <input
                class="input"
                type="text"
                bind:value={plantilla.DatosBasicos.UrlBlogger}
            />
        </div>
    </div>

    <div class="buttons">
        <button
            class="button is-info"
            title="Desde este equipo"
            onclick={() => publicar()}
            disabled={plantilla.DatosBasicos.UrlBlogger.length == 0}
        >
            Publicar
        </button>
    </div>
</Modal>
