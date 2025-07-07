import { Category } from "../types/category";
import { CreateLegend, CreateLegendResponse, Legend, LegendFilters } from "../types/legends";
import api from "./axios";

export const getLegends = async (filters: LegendFilters = {}): Promise<Legend[]> => {
  const params = new URLSearchParams()

  if (filters.search) params.append('name', filters.search)
  if (filters.category) params.append('category_id', filters.category)
  if (filters.province) params.append('province_id', filters.province)
  if (filters.canton) params.append('canton_id', filters.canton)
  if (filters.district) params.append('district_id', filters.district)
 if (filters.date) {
  const iso = new Date(filters.date).toISOString().split('T')[0] 
  params.append('legend_date', iso)
}

  const response = await api.get('/legends', { params })
  return response.data
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

export async function getLegendById(id: string) {
  try {
    const res = await api.get<Legend>(`/legends/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching legend:", error);
    return null;
  }
}

export async function updateLegend(id: string, values: CreateLegend) {
  try {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category_id", values.category_id);
    formData.append("province_id", values.province_id);
    formData.append("canton_id", values.canton_id);
    formData.append("district_id", values.district_id);
    formData.append("legend_date", values.legend_date);
    formData.append("description", values.description);
    if (values.image) formData.append("image", values.image);

    const res = await api.put(`/legends/${id}`, formData);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Error updating legend:", error);
    return { success: false, data: [] };
  }
}



