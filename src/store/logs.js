// stores/logs.js
import { defineStore } from 'pinia';
import apiClient from '@/axios';

export const useLogsStore = defineStore('logs', {
    state: () => ({
        logs: [],
        loading: false,
    }),
    actions: {
        async fetchLogs() {
            this.loading = true;
            try {
                const response = await axios.get('/user-action-logs/');
                if (response.data.status === 'success') {
                    this.logs = response.data.logs;
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        }
    }
});
