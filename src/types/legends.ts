import { Category } from "./category"
import { Canton, District, Province } from "./location"

export type Legend = {
	id: string,
	name: string,
	description: string,
	legend_date: string,
	category: Category,
	province: Province,
	canton: Canton,
	district: District,
	image_url: string,
}

export type CreateLegend = {
	name: string,
	description: string,
	legend_date: string,
	category_id: string, 
	province_id: string, 
	canton_id: string,
	district_id: string,
	image: File | null,
}

export type CreateLegendResponse = Omit<CreateLegend, "image"> & {
	image_url: string | null,
}

export type LegendFilters = {
  search?: string
  category?: string
  province?: string
  canton?: string
  district?: string
  date?: string  
}

	