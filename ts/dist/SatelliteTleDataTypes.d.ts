export interface Tle {
    date: string;
    id?: string;
    line1: string;
    line2: string;
    name: string;
    satelliteId: number;
    type?: string;
}
export interface TleLoadMatch {
    id: number;
}
export interface TleListMatch {
    page?: number;
    page_size?: number;
    search?: string;
    sort?: string;
    sort_dir?: string;
}
