export enum Tab {
    Basicos,
    Descarga,
    Staff,
    Tecnicos,
    VistaPrevia,
}

export type Section = {
    Name: string;
    Tab: Tab;
};