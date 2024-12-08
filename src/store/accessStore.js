import { defineStore } from "pinia";
import apiClient from "../axios";
import router from "../router";

export const useAccessStore = defineStore("access", {
  state: () => ({
    user_list: [],
    permissions: [],
    user_permit: [],
    message: null,
  }),
  actions: {
    async list_user() {
      try {
        const response = await apiClient.get("/users");
        this.user_list = response.data;
      } catch (error) {
        console.log("there is error");
      }
    },
    async list_permissions($id) {
      try {
        const response = await apiClient.get(`/user/${$id}`);
        this.permissions = response.data;
        // console.log("permissions", this.permissions);
      } catch (error) {
        console.log("there is error");
      }
    },
    async deactivate($id) {
      try {
        const response = await apiClient.patch(`/user/${$id}`);
        console.log("try message", response);
      } catch (error) {
        console.log("error during deactivating user");
      }
    },
    async delete($id) {
      try {
        const response = await apiClient.delete(`/user/${$id}`);
        router.back();
      } catch (error) {
        console.log("error when deleting");
      }
    },
  },
});
