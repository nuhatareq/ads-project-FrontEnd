export interface AdCategory {
    name?: string;
    id?: number;
}

export interface AdType {
    name?: string;
    id?: number;
}
export interface Ad {
    location: string;
    numberOfFaces: number;
    previewValue: number;
    siteDescription: string;
    adHeight: number;
    adWidth: number;
    regionId: number;
    regionTypeId: number;
    roadId: number;
    adCategoryId: number;
    adTypeId: number;
    gaal: number;
    insurancce: number;
    tax: number;
    stamp: number;
    shablona: number;
    price: number;
}
