import { LoginResponse, User } from '../types/auth'
import api from './axios'

export async function login(email: string, password: string) {
  const res = await api.post<LoginResponse>('/auth/login', { email, password })
  return res.data
}

export async function getProfile() {
  const res = await api.get<User>('/auth/me')
  return res.data
}