import { defineStore } from "pinia";
import apiClient from "../axios";
import router, { adminRoutes, userRoutes } from "../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    groups: [],
  }),
  actions: {
    async register(userData) {
      this.isLoading = true;
      this.error = null;
      try {
        await apiClient.post("/create-user/", userData);
        router.push("/");
      } catch (error) {
        this.error = error.response
          ? error.response.data.message
          : error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async login(credentials) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await apiClient.post("/token/", credentials);
        const { access, first_name, last_name, groups } = response.data;
        const user = first_name + " " + last_name;
        localStorage.setItem("user", user);
        localStorage.setItem("authToken", access);
        localStorage.setItem("groups", JSON.stringify(groups));
        this.groups = groups;
        this.token = access;
        this.isAuthenticated = true;

        if (groups.includes("admin")) {
          adminRoutes.forEach((route) => router.addRoute(route));
          router.push("/dashboard");
        } else if (groups.includes("user")) {
          userRoutes.forEach((route) => router.addRoute(route));
          router.push("/dashboard");
        } else {
          router.push("/403");
        }
      } catch (error) {
        this.error = error.response
          ? error.response.data.message
          : error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userDetails");

      router.push("/");
    },
    async refreshAccessToken() {
      try {
        const response = await apiClient.post("/token/refresh/", {
          refresh: this.token,
        });
        const { access } = response.data;
        this.token = access;
        localStorage.setItem("authToken", access);
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    },
    async handleTokenExpiration() {
      await this.refreshAccessToken();
    },
  },
});
