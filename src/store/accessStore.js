import { defineStore } from "pinia";
import apiClient from "../axios";
import router from "../router";

export const useAccessStore = defineStore("access", {
  state: () => ({
    user_list: [],
    permissions: [],
    user_permit: [],
    message: null,
    userDetails: [],
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
    async user($id) {
      try {
        const response = await apiClient.get(`/user/${$id}`);
        this.userDetails = response.data;
      } catch (error) {
        console.log("there is error");
      }
    },
    async deactivate($id, data) {
      try {
        const response = await apiClient.patch(`/user/${$id}`, {
          is_active: !data,
        });

        this.userDetails.is_active = !data;

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
