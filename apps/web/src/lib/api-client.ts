import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
const AUTH_SERVICE_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:4001'

class ApiClient {
  private client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      config => {
        const token = this.getToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          this.clearToken()
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('ai_research_token')
  }

  private setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ai_research_token', token)
    }
  }

  private clearToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ai_research_token')
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }

  saveToken(token: string) {
    this.setToken(token)
  }

  removeToken() {
    this.clearToken()
  }
}

export const authApi = new ApiClient(AUTH_SERVICE_URL)
export const apiClient = new ApiClient(API_BASE_URL)

// Auth API
export const authService = {
  async register(data: {
    email: string
    username: string
    password: string
    fullName?: string
  }) {
    const response = await authApi.post<{ user: any; access_token: string }>(
      '/auth/register',
      data
    )
    authApi.saveToken(response.access_token)
    return response
  },

  async login(data: { email: string; password: string }) {
    const response = await authApi.post<{ user: any; access_token: string }>('/auth/login', data)
    authApi.saveToken(response.access_token)
    return response
  },

  async logout() {
    await authApi.post('/auth/logout')
    authApi.removeToken()
  },

  async getCurrentUser() {
    return authApi.get<any>('/auth/me')
  },

  async updateProfile(data: any) {
    return authApi.patch<any>('/users/me', data)
  },
}
