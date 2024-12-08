<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import apiClient from '@/axios';
import Topbar from '@/components/navigation/topbar.vue';
import Back from '@/components/navigation/back.vue';
import Pagination from '@/components/navigation/pagination.vue';
import { useMineralYearStore } from '@/store/mineralYearStore';
import BarChart from '../../components/charts/BarChart.vue';
import { useFormatter } from '../../composable/useFormatter';

const structuredData = ref({});
const mineralNames = ref([]);
const years = ref([]);
const sum = ref([]);
const contributions = ref({});
const viewOption = ref('companyData');
const companyname = ref('');
const route = useRoute();
const companyId = route.params.companyId;
const page = ref(1);
const itemsPerPage = ref(200);
const totalItems = ref(0);
const totalPages = ref(0);
const dataValue = ref([]);

const { formatThousands } = useFormatter();

const fetchData = async () => {
  try {
    const response2 = await apiClient.get(`/data/summary/year/${companyId}/`);
    const response = await apiClient.get(`/data/company/${companyId}/minerals/`, {
      params: {
        page: page.value,
        items_per_page: itemsPerPage.value
      }
    });
    const data = response.data.data;
    const companyName = Object.keys(data)[0];

    totalItems.value = response.data.pagination.total_items;
    totalPages.value = response.data.pagination.total_pages;
    companyname.value = companyName;
    structuredData.value = data[companyName];

    sum.value = response2.data;
    mineralNames.value = new Set();
    years.value = Object.keys(structuredData.value);

    for (const year of years.value) {
      for (const mineral in structuredData.value[year]) {
        mineralNames.value.add(mineral);
      }
    }



    dataValue.value = Array.from(mineralNames.value).map(mineral => ({
      mineral,
      value: years.value.map(year => structuredData.value[year][mineral] || 0)
    }));

    mineralNames.value = Array.from(mineralNames.value);


  } catch (error) {
    console.error(error);
  }
};

function handlePageChange(newPage) {
  page.value = newPage;
  fetchData();
}

const fetchContrib = useMineralYearStore();

const fetchContributions = async () => {
  await fetchContrib.fetchContributionsByYearAndCompany(companyId);
  contributions.value = fetchContrib.contributions;
};

const getValue = (year, mineral) => {
  return structuredData.value[year][mineral]?.[0] || '-';
};

onMounted(async () => {
  await fetchData();
  await fetchContributions();
});


</script>

<template>
  <Topbar />
  <div class="mt-2">
    <Back />
  </div>
  <div class="flex justify-center mb-4">
    <div class="inline-flex">
      <!-- Company Data Button -->
      <button @click="viewOption = 'companyData'"
        :class="viewOption === 'companyData' ? 'bg-black text-white' : 'bg-gray-200 text-black'"
        class="py-2 px-4 rounded-l-full focus:outline-none">
        Company Data
      </button>

      <!-- Distribution Button -->
      <button @click="viewOption = 'distribution'"
        :class="viewOption === 'distribution' ? 'bg-black text-white' : 'bg-gray-200 text-black'"
        class="py-2 px-4 focus:outline-none">
        Distribution
      </button>

      <!-- visualize Button -->
      <button @click="viewOption = 'visualize'"
        :class="viewOption === 'visualize' ? 'bg-black text-white' : 'bg-gray-200 text-black'"
        class="py-2 px-4 rounded-r-full focus:outline-none">
        visualize
      </button>
    </div>
  </div>

  <div v-if="viewOption === 'companyData'">
    <div class="mt-16">
      <h4 class="text-lg mb-3 ml-3 uppercase">{{ companyname }}</h4>
      <table class="table-auto text-sm text-left w-full">
        <thead class="text-md text-gray-700 bg-yellow-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th class="py-2 px-4 border">Year</th>
            <th v-for="mineral in mineralNames" :key="mineral" class="py-2 px-4 border">
              {{ mineral }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-yellow-200" v-for="year in years" :key="year">
            <td class="py-2 px-4 bg-yellow-50 border">{{ year }}</td>
            <td v-for="mineral in mineralNames" :key="mineral" class="py-2 px-4 bg-yellow-50 border">
              {{ getValue(year, mineral) }}
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :currentPage="page" :itemsPerPage="itemsPerPage" :totalItems="totalItems"
        @page-changed="handlePageChange" />
    </div>
    <div class="mt-3 mb-4">
      <h4>Summary</h4>
      <table>
        <thead>
          <tr>
            <th class="py-2 px-4 border border-black bg-yellow-200">Year</th>
            <td v-for="item in sum" :key="item.id" class="py-2 px-4 border border-black">{{ item.year }}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="py-2 px-4 border border-black bg-yellow-200">Sum (USD)</th>
            <td v-for="item in sum" :key="item.id" class="py-2 px-4 border border-slate-950">{{
              formatThousands(parseInt(item.total_value)) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-if="viewOption === 'distribution'">
    <div v-for="(minerals, year) in contributions" :key="year" class="mb-8">
      <h4 class="text-xl font-bold mb-4">{{ year }}</h4>
      <table class="table-auto w-full">
        <thead class="bg-yellow-200">
          <tr>
            <th class="px-4 py-2 border border-black">Mineral</th>
            <th class="px-4 py-2 border border-black">Total Value(USD)</th>
            <th class="px-4 py-2 border border-black">Contribution (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mineral in minerals" :key="mineral.mineral">
            <td class="border border-black px-4 py-2">{{ mineral.mineral }}</td>
            <td class="border border-black px-4 py-2">{{ formatThousands(parseInt(mineral.value)) }}</td>
            <td class="border border-black px-4 py-2">{{ mineral.contribution }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-if="viewOption === 'visualize'">
    <BarChart :company-title="companyname" :data-years="years" :data-value="dataValue" />
  </div>
</template>