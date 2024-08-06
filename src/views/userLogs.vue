<!-- components/UserActionLogs.vue -->
<template>
    <div>
        <h2>User Action Logs</h2>
        <div v-if="loading" class="spinner"></div>
        <table v-if="!loading">
            <thead>
                <tr>
                    <th>Action</th>
                    <th>Timestamp</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="log in logs" :key="log.timestamp">
                    <td>{{ log.action }}</td>
                    <td>{{ log.timestamp }}</td>
                    <td>{{ log.description }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useLogsStore } from '../stores/logs';

const logsStore = useLogsStore();

onMounted(() => {
    logsStore.fetchLogs();
});

const { logs, loading } = logsStore;
</script>

<style scoped>
.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #09f;
    animation: spin 1s ease infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
}
</style>
