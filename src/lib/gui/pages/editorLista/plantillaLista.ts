import { z } from "zod";

const DEFAULT_COLOR_PROYECTO = "#18185e";

export const Proyecto = z.object({
    Nombre: z.string(),
    UrlImagen: z.string(),
    UrlProyecto: z.string(),
    Color: z.string().default(DEFAULT_COLOR_PROYECTO),
});

export type Proyecto = z.infer<typeof Proyecto>;

export const Categoria = z.object({
    Nombre: z.string(),
    Proyectos: Proyecto.array(),
});

export type Categoria = z.infer<typeof Categoria>;

export const PlantillaProyectos = z.object({
    Nombre: z.string(),
    Categorias: Categoria.array(),
});

export type PlantillaProyectos = z.infer<typeof PlantillaProyectos>;

export function newPlantillaProyectos(): PlantillaProyectos {
    const plantilla: PlantillaProyectos = {
        Nombre: "Proyectos Anime",
        Categorias: [
            {
                Nombre: "Proyectos futuros",
                Proyectos: [],
            },
            {
                Nombre: "Proyectos actuales",
                Proyectos: [],
            },
            {
                Nombre: "Proyectos terminados",
                Proyectos: [],
            },
        ],
    };
    return plantilla;
}

export function newPlantillaProyectosEjemplo(): PlantillaProyectos {
    const plantilla: PlantillaProyectos = {
        Nombre: "Proyectos Anime",
        Categorias: [
            {
                Nombre: "Proyectos futuros",
                Proyectos: [
                    {
                        Nombre: "Eromanga-sensei",
                        UrlImagen: "https://1.bp.blogspot.com/-KP6hQ8r3Y7I/WVPZtvB_mzI/AAAAAAAAGX0/beToXpzRlm4U_T4VpycGB_YyFRKMiWOSQCLcBGAs/s1600/Eromanga.png",
                        UrlProyecto: "",
                        Color: DEFAULT_COLOR_PROYECTO,
                    },
                    {
                        Nombre: "Yami Shibai S6",
                        UrlImagen: "https://cdn.myanimelist.net/images/anime/1911/95045.jpg",
                        UrlProyecto: "",
                        Color: DEFAULT_COLOR_PROYECTO,
                    },
                ],
            },
            {
                Nombre: "Proyectos actuales",
                Proyectos: [
                    {
                        Nombre: "Plastic Memories",
                        UrlImagen: "https://2.bp.blogspot.com/-uTu0GPxK-e0/WnNnk7HwciI/AAAAAAAACY8/9oTkmQPh-AEXLhaSVjm5WGwmHiVdUJoKACLcBGAs/s320/Plastic%2BMemories.png",
                        UrlProyecto: "http://www.syncrajo.net/2015/03/plastic-memories.html",
                        Color: DEFAULT_COLOR_PROYECTO,
                    },
                    {
                        Nombre: "One Room S2",
                        UrlImagen: "https://cdn.myanimelist.net/images/anime/1630/97029.jpg",
                        UrlProyecto: "",
                        Color: DEFAULT_COLOR_PROYECTO,
                    },
                    {
                        Nombre: "Tonari no Seki-kun",
                        UrlImagen: "https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/38bb57dd62113be9d617e3444caa27d5.jpeg",
                        UrlProyecto: "",
                        Color: DEFAULT_COLOR_PROYECTO,
                    }
                ],
            },
            {
                Nombre: "Proyectos terminados",
                Proyectos: [
                    {
                        Nombre: "Angel Beats!",
                        UrlImagen: "https://4.bp.blogspot.com/-lmAZXmHbkqo/VEbvn7mkR8I/AAAAAAAABXA/HH_hjFl0RMM/s1600/1.png",
                        UrlProyecto: "http://www.syncrajo.net/2014/03/angel-beats.html",
                        Color: DEFAULT_COLOR_PROYECTO,
                    },
                    {
                        Nombre: "Ano Hana",
                        UrlImagen: "https://m.media-amazon.com/images/M/MV5BYmQ5Y2RiOTAtMzg2Ni00MzE0LWE0NTItNzExNmMzOGQyY2NjL2ltYWdlXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_.jpg",
                        UrlProyecto: "https://4.bp.blogspot.com/-idP8T9Pj5dE/VF0DyAPOLkI/AAAAAAAABoI/RGaXu2Yr6zQ/s1600/anohana.png",
                        Color: DEFAULT_COLOR_PROYECTO,
                    },
                    {
                        Nombre: "Charlotte",
                        UrlImagen: "https://ih1.redbubble.net/image.3122454902.1029/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
                        UrlProyecto: "http://www.syncrajo.net/2000/07/charlotte.html",
                        Color: DEFAULT_COLOR_PROYECTO,
                    },
                    {
                        Nombre: "Golden Time",
                        UrlImagen: "https://cdn.myanimelist.net/images/about_me/ranking_items/8037243-8515c8ed-3630-4929-9df8-4a8a02503124.jpg?t=1664754434",
                        UrlProyecto: "",
                        Color: DEFAULT_COLOR_PROYECTO,
                    }
                ],
            },
            {
                Nombre: "Proyectos cancelados",
                Proyectos: [
                    {
                        Nombre: "K-On!",
                        UrlImagen: "https://cdn.myanimelist.net/images/about_me/ranking_items/11550474-b28c35e5-da8c-4c18-b322-7414f297de71.jpg?t=1672934352",
                        UrlProyecto: "",
                        Color: DEFAULT_COLOR_PROYECTO,
                    },
                ],
            }
        ],
    };

    return plantilla;
}

export function validarPlantillaProyectos(plantilla: PlantillaProyectos): string[] {
    const mensajes: string[] = [];

    if (plantilla == null) {
        mensajes.push("PlantillaProyectos inválida");
        return mensajes;
    }

    return mensajes;
}
