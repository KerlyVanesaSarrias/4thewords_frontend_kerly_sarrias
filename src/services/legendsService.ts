import { Category } from "../types/category";
import { CreateLegend, CreateLegendResponse, Legend } from "../types/legends";
import api from "./axios";

export async function getLegends() {
  try {
    const res = await api.get<Legend[]>("/legends");
    return res.data;
  } catch (error) {
    console.error("Error fetching legends:", error);
    throw error;
  }
}

export async function createLegend(values: CreateLegend) {
  try {
    console.log('values: ', values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category_id", values.category_id);
    formData.append("province_id", values.province_id);
    formData.append("canton_id", values.canton_id);
    formData.append("district_id", values.district_id);
    formData.append("legend_date", values.legend_date);
    formData.append("description", values.description);
    if (values.image) formData.append("image", values.image);
    
    const res = await api.post<CreateLegendResponse>("/legends", formData);
    return {success: true, data: res.data};
  } catch (error) {
    console.error("Error creating legend:", error);
   return {success: false, data: []};
  }
}

export async function getCategories() {
  try {
    const res = await api.get<Category[]>("/categories");
    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function deleteLegend(id: string) {
  try {
    await api.delete(`/legends/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting legend:", error);
    return { success: false, error };
  }
}


