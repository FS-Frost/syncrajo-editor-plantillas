export enum Tab {
    Basicos,
    Descarga,
    Staff,
    Tecnicos,
    VistaPrevia,
}

export interface Section {
    Name: string;
    Tab: Tab;
}