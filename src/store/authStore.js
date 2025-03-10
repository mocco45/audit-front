import { defineStore } from "pinia";
import apiClient from "../axios";
import router, { adminRoutes, userRoutes } from "../router";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("authToken") ?? null,
    isLoading: false,
    error: null,
    isAuthenticated: localStorage.getItem("authToken") ? true : false,
    groups: localStorage.getItem("groups") ?? [],
  }),
  actions: {
    async register(userData) {
      this.isLoading = true;
      this.error = null;
      try {
        await apiClient.post("/create-user/", userData);
        toast.success("Registration successfull!");
        router.push("/");
      } catch (error) {
        if (error.response.response) {
          toast.error(error.response.data.error);
          console.error(
            "error during registration (response)",
            error.response.data
          );
        } else if (error.request) {
          toast.error(error.request.data.error);
          console.error(
            "error during registration (request) connection problems",
            error.request.data
          );
        } else {
          toast.error("unexpected error");
          console.error("Unexpected error:", error.message);
        }
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
          toast.success("welcome back! 🎉", { timeout: 1500 });
          router.push("/dashboard");
        } else if (groups.includes("user")) {
          userRoutes.forEach((route) => router.addRoute(route));
          toast.success("welcome back! 🎉", { timeout: 1500 });
          router.push("/dashboard");
        } else {
          router.push("/403");
        }
      } catch (error) {
        if (error.response.data) {
          toast.error(error.response.data.error);
          console.error("error during login (response)", error.response.data);
        } else if (error.request) {
          toast.error(error.request.data.error);
          console.error(
            "error during login (request) connection problems",
            error.request.data
          );
        } else {
          toast.error("unexpected error");
          console.error("Unexpected error:", error.message);
        }
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.groups = [];
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("groups");
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
