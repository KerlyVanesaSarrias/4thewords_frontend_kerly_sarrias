export type Province = {
    id: string;
    name: string;
}

export type Canton = {
    id: string;
    name: string;
    province_id: string;
}

export type District = {
    id: string;
    name: string;
    canton_id: string;
}