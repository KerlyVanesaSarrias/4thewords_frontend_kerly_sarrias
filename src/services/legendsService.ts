import { Legend } from "../types/legends";
import api from "./axios";

export async function getLegends() {
    const res = await api.get<Legend[]>('/legends');
    return res.data;
}