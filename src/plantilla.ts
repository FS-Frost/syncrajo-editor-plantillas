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
            Sinopsis: "No disponible.",
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
            HtmlGraficoAvance: "-",
        },
    };
    return plantilla;
}

export function newPlantillaEjemplo(): Plantilla {
    const plantilla: Plantilla = {
        DatosBasicos: {
            Proyecto:
                "Sakamichi no Apollon",
            UrlImagen:
                "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiOjtNbe0KysRGHFwjL3NZF32OvQ70CArrb6AMqnJuf66Pc2-QZvXoNK_EcWRUJqOhPvzXWUyS2tVBNl-FpbFvfOvS-VAVuhnlL4BiqjtnsjU1kNempYsbwUZNIFbNbf50-pJ3rNcAfwZ7e0EO8GH63vkhTUoixjHyP8qWDGpXdXZk3Iw-qFTtCTh3X/s1920/Sakamichi.jpg",
            Sinopsis:
                "Kaoru Nishimi, un introvertido pianista de música clásica y estudiante de excelencia, acaba de llegar a Kyushu en su primer año de preparatoria. Habiéndose mudado constantemente durante su niñez, ya no guarda esperanza de encajar en este nuevo lugar, preparándose así para otro solitario año sin significado alguno. Al menos ése era el plan, hasta que se topa con el mal rumoreado Sentarou Kawabuchi.\nEl amor desmesurado de Sentarou por el jazz inspira a Kaoru, quien se dispone a conocer más el género y, como resultado, poco a poco empieza a salir de su cascarón, formando su primer lazo de amistado verdadera. Kaoru empieza a tocar el piano durante sus sesiones de jazz al acabar la escuela, ubicados en el sótano de una compañera llamada Ritsuko Mukae, cuya familia trabaja una disquera. En tanto descubre la inmensa dicha de usar su talento musical para alegrar su vida y la del resto, el verano de Kaoru pareciera tornarse en uno que recordará el resto de su vida.\nEsta historia trata amistades que llegan al corazón, música intensa y amor, siguiendo el camino de estos tres jóvenes, unidos por su mutuo aprecio por el jazz.",
        },
        DatosDescarga: {
            Botones: [
                {
                    Texto: `${prefijoBotonDescarga} MP4`,
                    Url: "https://mega.co.nz/#F!kkAhFBra!OXgRhkctSVNla2xuNISKrQ",
                    Color: BotonDescargaColorDefault,
                },
                {
                    Texto: `${prefijoBotonDescarga} AVI`,
                    Url: "https://mega.co.nz/#F!loolyTDD!Kk8g5FcZ1crP-DJuDwYVHA",
                    Color: BotonDescargaColorDefault,
                },
            ],
        },
        DatosStaff: {
            Integrantes: [
                {
                    Cargo: "Traducción",
                    Nombre: "[S2] dmZ",
                },
                {
                    Cargo: "Corrección",
                    Nombre: "[EC] DarkAngel",
                },
                {
                    Cargo: "Carteles",
                    Nombre: "[NS] NeoSt",
                },
                {
                    Cargo: "Carteles",
                    Nombre: "[GX] Gonxas",
                },
                {
                    Cargo: "Compresión AVI",
                    Nombre: "[LS] Losehelin",
                },
                {
                    Cargo: "Karaokes",
                    Nombre: "[FS] Frost",
                },
                {
                    Cargo: "Revisión AVI",
                    Nombre: "[UM] Ushiromiya",
                },
                {
                    Cargo: "Mirrors",
                    Nombre: "[KK] Kaito",
                },
            ],
        },
        DatosTecnicos: {
            NombreJapones: "坂道のアポロン",
            NombreJaponesRomaji:
                "Sakamichi no Apollon",
            NombreAlternativo:
                "Kids on the Slope",
            NombreAlternativoTraduccion:
                "Niños en la ladera",
            Categoria: Categoria.Serie,
            Genero: "Drama, romance, música",
            Episodios: "12",
            Estudio: "Tezuka Productions, MAPPA",
            FormatosArchivos:
                "[.AVI 704x396 xVID] [.MP4 1280x720 x264]",
            TamanoArchivos:
                "[.AVI 180 MB] [.MP4 245 MB]",
            HtmlGraficoAvance:
                "-",
        },
    };

    return plantilla;
}

export function validarPlantilla(plantilla: Plantilla): string[] {
    const mensajes: string[] = [];

    if (plantilla == null) {
        mensajes.push("Plantilla inválida");
        return mensajes;
    }

    let seccion = "Datos básicos";

    if (plantilla.DatosBasicos == null) {
        mensajes.push(`${seccion}: sección indefinida.`);
        return mensajes;
    }

    if (plantilla.DatosBasicos.Proyecto == "") {
        mensajes.push(`${seccion}: Nombre del proyecto no definido.`);
    }

    if (plantilla.DatosBasicos.UrlImagen == "") {
        mensajes.push(`${seccion}: URL de imagen no definida.`);
    }

    if (plantilla.DatosBasicos.Sinopsis == "") {
        mensajes.push(`${seccion}: Sinopsis no definida.`);
    }

    if (plantilla.DatosDescarga == null) {
        mensajes.push(`Datos de descarga: sección indefinida.`);
        return mensajes;
    }

    for (let i = 0; i < plantilla.DatosDescarga.Botones.length; i++) {
        const numeroBoton = i + 1;
        seccion = `Datos de descarga, botón ${numeroBoton}`;
        const boton = plantilla.DatosDescarga.Botones[i];

        if (boton.Texto == "") {
            mensajes.push(`${seccion}: texto no definido.`);
        }

        if (boton.Url == "") {
            mensajes.push(`${seccion}: URL no definida.`);
        }

        if (boton.Color == "") {
            mensajes.push(`${seccion}: color no definido.`);
        }
    }

    seccion = "Datos del staff";

    if (plantilla.DatosStaff == null) {
        mensajes.push(`${seccion}: sección indefinida.`);
        return mensajes;
    }

    if (plantilla.DatosStaff.Integrantes.length == 0) {
        mensajes.push(`${seccion}: 0 integrantes definidos.`);
    }

    for (let i = 0; i < plantilla.DatosStaff.Integrantes.length; i++) {
        const integrante = plantilla.DatosStaff.Integrantes[i];
        const numIntegrante = i + 1;

        if (integrante.Cargo == "") {
            mensajes.push(
                `${seccion}: integrante ${numIntegrante}, cargo no definido.`
            );
        }

        if (integrante.Nombre == "") {
            mensajes.push(
                `${seccion}: integrante ${numIntegrante}, nombre no definido.`
            );
        }
    }

    seccion = "Datos técnicos";

    if (plantilla.DatosTecnicos == null) {
        mensajes.push(`${seccion}: sección indefinida.`);
        return mensajes;
    }

    if (plantilla.DatosTecnicos.NombreJapones == "") {
        mensajes.push(`${seccion}: nombre japonés no definido.`);
    }

    if (plantilla.DatosTecnicos.NombreJaponesRomaji == "") {
        mensajes.push(`${seccion}: nombre japonés (romaji) no definido.`);
    }

    if (plantilla.DatosTecnicos.NombreAlternativo == "") {
        mensajes.push(`${seccion}: nombre alternativo no definido.`);
    }

    if (plantilla.DatosTecnicos.NombreAlternativoTraduccion == "") {
        mensajes.push(
            `${seccion}: nombre alternativo (traducción) no definido.`
        );
    }

    if (plantilla.DatosTecnicos.Genero == "") {
        mensajes.push(`${seccion}: género no definido.`);
    }

    if (plantilla.DatosTecnicos.Episodios == "") {
        mensajes.push(`${seccion}: cantidad de episodios no definida.`);
    }

    if (plantilla.DatosTecnicos.Estudio == "") {
        mensajes.push(`${seccion}: estudio no definido.`);
    }

    if (plantilla.DatosTecnicos.FormatosArchivos == "") {
        mensajes.push(`${seccion}: formatos de archivos no definidos.`);
    }

    if (plantilla.DatosTecnicos.TamanoArchivos == "") {
        mensajes.push(`${seccion}: tamaños de archivos no definidos.`);
    }

    if (plantilla.DatosTecnicos.HtmlGraficoAvance == "") {
        mensajes.push(`${seccion}: gráfico de avance no definido.`);
    }

    return mensajes;
}
