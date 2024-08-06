import { defineStore } from 'pinia';
import axios from '@/axios';

export const useMineralYearStore = defineStore('main', {
  state: () => ({
    contributions: {},
  }),
  actions: {
    async fetchContributionsByYearAndCompany(companyId) {
      try {
        const response = await axios.get(`/summary/${companyId}/`);
        this.contributions = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
});
