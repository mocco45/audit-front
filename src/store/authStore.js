<<<<<<< HEAD
import { defineStore } from "pinia";
import apiClient from "../axios";
import router from "../router";

export const useAuthStore = defineStore("auth", {
=======
import { defineStore } from 'pinia';
import apiClient from '@/axios';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763
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
<<<<<<< HEAD
        const response = await apiClient.post("/register", userData);
        this.user = response.data.user;
      } catch (error) {
        this.error = error.response
          ? error.response.data.message
          : error.message;
=======
        const response = await apiClient.post('/register', userData);
        this.user = response.data.user;
      } catch (error) {
        this.error = error.response ? error.response.data.message : error.message;
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763
      } finally {
        this.isLoading = false;
      }
    },
    async login(credentials) {
      this.isLoading = true;
      this.error = null;
      try {
<<<<<<< HEAD
        const response = await apiClient.post("/token/", credentials);
        const { access, user } = response.data;
        localStorage.setItem("authToken", access);
=======
        const response = await apiClient.post('/token/', credentials);
        const { access, user } = response.data; 
        localStorage.setItem('authToken', access);
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763
        // localStorage.setItem('userDetails', JSON.stringify(user));
        this.token = access;
        this.user = user;
        this.isAuthenticated = true;
<<<<<<< HEAD
        router.push("/dashboard");
      } catch (error) {
        this.error = error.response
          ? error.response.data.message
          : error.message;
=======
        router.push('/dashboard');
      } catch (error) {
        this.error = error.response ? error.response.data.message : error.message;
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
<<<<<<< HEAD
      localStorage.removeItem("authToken");
      localStorage.removeItem("userDetails");

      router.push("/login");
    },
    async refreshAccessToken() {
      try {
        const response = await apiClient.post("/token/refresh/", {
=======
      localStorage.removeItem('authToken');
      localStorage.removeItem('userDetails');

      router.push('/login');
    },
    async refreshAccessToken() {
      try {
        const response = await apiClient.post('/token/refresh/', {
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763
          refresh: this.token,
        });
        const { access } = response.data;
        this.token = access;
<<<<<<< HEAD
        localStorage.setItem("authToken", access);
      } catch (error) {
        console.error("Error refreshing token:", error);
=======
        localStorage.setItem('authToken', access);
      } catch (error) {
        console.error('Error refreshing token:', error);
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763
      }
    },
    async handleTokenExpiration() {
      await this.refreshAccessToken();
    },
  },
});
