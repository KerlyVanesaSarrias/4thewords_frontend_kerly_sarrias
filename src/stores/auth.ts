import { defineStore } from 'pinia'
import router from '../router'
import { getProfile, login } from '../services/authService'
import { User } from '../types/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null as null | User,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const res = await login(email, password);

        const { access_token } = res;
        this.token = access_token;
        localStorage.setItem('token', access_token)
        const user = await getProfile();
        this.user = user
        router.push('/legends')
      } catch (error) {
        console.error('Error en login:', error)
        throw error
      }
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      router.push('/')
    },
  },
})
