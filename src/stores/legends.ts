
import { defineStore } from 'pinia'
import { getCategories, getLegends } from '../services/legendsService'
import { Category } from '../types/category'
import { Legend } from '../types/legends'

export const useLegendStore = defineStore('legend', {
  state: () => ({
    legends: [] as Legend[],
    categories: [] as Category[],
    loading: false,
    error: '' as string | null,
  }),
  actions: {
    async getLegends() {
      this.loading = true
      this.error = null
      try {
        const data = await getLegends()
        this.legends = data
      } catch (err: any) {
        this.error = err.response?.data?.detail || 'Error fetching legends'
      } finally {
        this.loading = false
      }
    },

    async getCategories() {
      this.loading = true
      this.error = null
      try {
        const data = await getCategories()
        this.categories = data
      } catch (err: any) {
        this.error = err.response?.data?.detail || 'Error fetching categories'
      } finally {
        this.loading = false
      }
    },

  
  },
})
