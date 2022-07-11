const prefijoBotonDescarga = "Carpeta en MEGA";

export interface Plantilla {
    DatosBasicos: DatosBasicos;
    DatosDescarga: DatosDescarga;
    DatosStaff: DatosStaff;
    DatosTecnicos: DatosTecnicos;
}

export interface DatosBasicos {
    Proyecto: string;
    UrlImagen: string;
    Sinopsis: string;
}

export const BotonDescargaColorDefault = "#df5228";

export interface BotonDescarga {
    Texto: string;
    Url: string;
    Color: string;
}

export interface DatosDescarga {
    Botones: BotonDescarga[];
}

export interface Integrante {
    Cargo: string;
    Nombre: string;
}

export interface DatosStaff {
    Integrantes: Integrante[];
}

export enum Categoria {
    Serie = "Serie",
    SerieBluray = "Serie Blu-ray",
    Ova = "OVA",
    Pelicula = "Película",
}

export interface DatosTecnicos {
    NombreJapones: string;
    NombreJaponesRomaji: string;
    NombreAlternativo: string;
    NombreAlternativoTraduccion: string;
    Categoria: Categoria;
    Genero: string;
    Episodios: string;
    Estudio: string;
    FormatosArchivos: string;
    TamanoArchivos: string;
    HtmlGraficoAvance: string;
}

export function newPlantilla(): Plantilla {
    const cargos = ["Traducción", "Corrección", "Carteles", "Karaokes", "Compresión MP4", "Compresión AVI"];

    const plantilla: Plantilla = {
        DatosBasicos: {
            Proyecto: "",
            UrlImagen: "",
            Sinopsis: "No disponible",
        },
        DatosDescarga: {
            Botones: [
                {
                    Texto: `${prefijoBotonDescarga} MP4`,
                    Url: "",
                    Color: BotonDescargaColorDefault,
                },
                {
                    Texto: `${prefijoBotonDescarga} AVI`,
                    Url: "",
                    Color: BotonDescargaColorDefault,
                },
            ],
        },
        DatosStaff: {
            Integrantes: [
                ...cargos.map(cargo => {
                    const integrante: Integrante = {
                        Cargo: cargo,
                        Nombre: "",
                    };
                    return integrante;
                }),
            ],
        },
        DatosTecnicos: {
            NombreJapones: "",
            NombreJaponesRomaji: "",
            NombreAlternativo: "",
            NombreAlternativoTraduccion: "",
            Categoria: Categoria.Serie,
            Genero: "",
            Episodios: "1",
            Estudio: "",
            FormatosArchivos: "[.AVI 704×396 xVID] [.MP4 1280x720 x264]",
            TamanoArchivos: "[.AVI 180 MB] [.MP4 Peso variable]",
            HtmlGraficoAvance: "",
        },
    };
    return plantilla;
}

export function newPlantillaEjemplo(): Plantilla {
    const plantilla: Plantilla = {
        DatosBasicos: {
            Proyecto:
                "Yahari Ore no Seishun Rabu Kome wa Machigatteiru. Zoku",
            UrlImagen:
                "http://i1302.photobucket.com/albums/ag138/inazuma_seikatsu/Banners/Yahari%202_zpstxdkzd5i.jpg",
            Sinopsis:
                "Hikigaya Hachiman es un estudiante de secundaria antisocial sin amigos ni novia y, como resultado, tiene una visión distorsionada de la vida. Cuando ve a sus compañeros hablando animadamente sobre sus vidas de adolescentes, susurra: “Todos son un puñado de mentirosos”. Cuando se le pregunta acerca de sus sueños, responde: “sin trabajar”. Una profesora hace que Hachiman se una al “club de voluntarios”, que casualmente tiene a la chica más bella de la escuela, Yukino Yukinoshita.",
        },
        DatosDescarga: {
            Botones: [
                {
                    Texto: `${prefijoBotonDescarga} MP4`,
                    Url: "https://mega.co.nz/#F!iMB3AZQB!dw_pm_qhHkenj0EkdW3zpQ",
                    Color: BotonDescargaColorDefault,
                },
                {
                    Texto: `${prefijoBotonDescarga} AVI`,
                    Url: "https://mega.co.nz/#F!tpxwkDCS!Gq_0gNRcAEHYlu5Od-xvVg",
                    Color: BotonDescargaColorDefault,
                },
            ],
        },
        DatosStaff: {
            Integrantes: [
                {
                    Cargo: "Traducción",
                    Nombre: "[KG] Kurogi (01 al 03), [FS] Frost (04 al 13 + OVA)",
                },
                {
                    Cargo: "Corrección",
                    Nombre: "[MK] Mikoyan",
                },
                {
                    Cargo: "Carteles",
                    Nombre: "[NS] NeoSt",
                },
                {
                    Cargo: "Karaokes y revisión",
                    Nombre: "[FS] Frost",
                },
                {
                    Cargo: "Compresión AVI",
                    Nombre: "[GX] Gonxas",
                },
                {
                    Cargo: "Compresión MP4",
                    Nombre: "[SV] Suarez523",
                },
                {
                    Cargo: "Latigazos",
                    Nombre: "[Sr] Duende",
                },
            ],
        },
        DatosTecnicos: {
            NombreJapones: "やはり俺の青春ラブコメはまちがっている。続",
            NombreJaponesRomaji:
                "Yahari Ore no Seishun Rabu Kome wa Machigatteiru. Zoku",
            NombreAlternativo:
                "My Youth Romantic Comedy Is Wrong As I Expected.",
            NombreAlternativoTraduccion:
                "Mi comedia romántica juvenil está tan mal como esperaba. La secuela",
            Categoria: Categoria.SerieBluray,
            Genero: "Comedia romántica, recuentos de la vida",
            Episodios: "13 + OVA",
            Estudio: "Feel",
            FormatosArchivos:
                "[.AVI 704×396 xVID] [.MP4 1280x720 x264] [.MP4 1920x1080 x264]",
            TamanoArchivos:
                "[.AVI 300 MB] [.MP4 720p Peso variable] [.MP4 1080p Peso variable]",
            HtmlGraficoAvance:
                "<iframe width='600' height='371' seamless frameborder='0' scrolling='no' src='https://docs.google.com/spreadsheets/d/1vdYD1nhj2Xt3Chem1pINDe_Soc_9p8g3ddv9J__NsrI/pubchart?oid=1270762129&amp;format=interactive'></iframe>",
        },
    };

    return plantilla;
}