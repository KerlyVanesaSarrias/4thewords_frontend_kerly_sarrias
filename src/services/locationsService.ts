import { Canton, Province } from "../types/location";
import api from "./axios";

export const getProvinces = async () => {
    try {
        const res = await api.get<Province[]>('/locations/provinces');
        return res.data;
    } catch (error) {
        console.error("Error fetching provinces:", error);
        throw error;
    }
}

export const getCantonsByProvince = async (provinceId: string) => {
    try {
        const res = await api.get<Canton[]>(`/locations/province/${provinceId}/cantons`);
        return res.data;
    } catch (error) {
        console.error(`Error fetching cantons for province ${provinceId}:`, error);
        throw error;
    }
}

export const getDistrictsByCanton = async (cantonId: string) => {
    try {
        const res = await api.get(`/locations/canton/${cantonId}/districts`);
        return res.data;
    } catch (error) {
        console.error(`Error fetching districts for canton ${cantonId}:`, error);
        throw error;
    }
}