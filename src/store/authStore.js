import { defineStore } from 'pinia';
import apiClient from '@/axios';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
  }),
  actions: {
    async register(userData) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await apiClient.post('/register', userData);
        this.user = response.data.user;
      } catch (error) {
        this.error = error.response ? error.response.data.message : error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async login(credentials) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await apiClient.post('/token/', credentials);
        const { access, user } = response.data; 
        localStorage.setItem('authToken', access);
        // localStorage.setItem('userDetails', JSON.stringify(user));
        this.token = access;
        this.user = user;
        this.isAuthenticated = true;
        router.push('/dashboard');
      } catch (error) {
        this.error = error.response ? error.response.data.message : error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('authToken');
      localStorage.removeItem('userDetails');

      router.push('/login');
    },
    async refreshAccessToken() {
      try {
        const response = await apiClient.post('/token/refresh/', {
          refresh: this.token,
        });
        const { access } = response.data;
        this.token = access;
        localStorage.setItem('authToken', access);
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    },
    async handleTokenExpiration() {
      await this.refreshAccessToken();
    },
  },
});
