<template>
    <Topbar />
    <Back />
    <div v-for="(minerals, year) in contributions" :key="year" class="mb-8">
      <h4 class="text-xl font-bold mb-4">{{ year }}</h4>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="px-4 py-2">Mineral</th>
            <th class="px-4 py-2">Total Value(USD)</th>
            <th class="px-4 py-2">Contribution (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mineral in minerals" :key="mineral.mineral">
            <td class="border px-4 py-2">{{ mineral.mineral }}</td>
            <td class="border px-4 py-2">{{ mineral.value }}</td>
            <td class="border px-4 py-2">{{ mineral.contribution }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Topbar from '@/components/navigation/topbar.vue';
  import Back from '@/components/navigation/back.vue';
  import { useRoute } from 'vue-router';
  import { useMineralYearStore } from '@/store/mineralYearStore';
  
  const route = useRoute();
  const companyId = route.params.companyId;
  const contributions = ref({});
  const fetchContrib = useMineralYearStore();
  
  onMounted(async () => {
    await fetchContrib.fetchContributionsByYearAndCompany(companyId);
    contributions.value = fetchContrib.contributions;
  });
  </script>
  