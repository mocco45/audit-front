<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import apiClient from '@/axios';
import Topbar from '@/components/navigation/topbar.vue';
import Back from '@/components/navigation/back.vue';
<<<<<<< HEAD
import Pagination from '@/components/navigation/pagination.vue';
import { useMineralYearStore } from '@/store/mineralYearStore';
import BarChart from '../../components/charts/BarChart.vue';
=======
import { useMineralYearStore } from '@/store/mineralYearStore';
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763

const structuredData = ref({});
const mineralNames = ref([]);
const years = ref([]);
const sum = ref([]);
const contributions = ref({});
<<<<<<< HEAD
const viewOption = ref('companyData');
const companyname = ref('');
const route = useRoute();
const companyId = route.params.companyId;
const page = ref(1);
const itemsPerPage = ref(200);
const totalItems = ref(0);
const totalPages = ref(0);
const dataValue = ref([]);

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
=======
const isViewA = ref(true);
const companyname = ref('');
const route = useRoute();
const companyId = route.params.companyId;

const fetchData = async () => {
  try {
    const response = await apiClient.get(`/data/company/${companyId}/minerals/`);
    const response2 = await apiClient.get(`/data/summary/year/${companyId}/`);
    const data = response.data;
    const companyName = Object.keys(data)[0];
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763
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
<<<<<<< HEAD



    dataValue.value = Array.from(mineralNames.value).map(mineral => ({
      mineral,
      value: years.value.map(year => structuredData.value[year][mineral] || 0)
    }));

    mineralNames.value = Array.from(mineralNames.value);


=======
    mineralNames.value = Array.from(mineralNames.value);
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763
  } catch (error) {
    console.error(error);
  }
};

<<<<<<< HEAD
function handlePageChange(newPage) {
  page.value = newPage;
  fetchData();
}

=======
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763
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
<<<<<<< HEAD


=======
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763
</script>

<template>
  <Topbar />
  <div class="mt-2">
    <Back />
  </div>
  <div class="flex justify-center mb-4">
    <div class="inline-flex">
<<<<<<< HEAD
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
=======
      <button @click="isViewA = true" :class="isViewA ? 'bg-black text-white' : 'bg-gray-200 text-black'"
        class="py-2 px-4 rounded-l-full focus:outline-none">
        Company Data
      </button>
      <button @click="isViewA = false" :class="!isViewA ? 'bg-black text-white' : 'bg-gray-200 text-black'"
        class="py-2 px-4 rounded-r-full focus:outline-none">
        Distribution
      </button>
    </div>
  </div>
  <div v-if="isViewA">
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763
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
<<<<<<< HEAD
      <Pagination :currentPage="page" :itemsPerPage="itemsPerPage" :totalItems="totalItems"
        @page-changed="handlePageChange" />
=======
      <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation">
        <span
          class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing
          <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span
            class="font-semibold text-gray-900 dark:text-white">1000</span></span>
        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a href="#"
              class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
          </li>
          <li>
            <a href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
          </li>
          <li>
            <a href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
          </li>
          <li>
            <a href="#" aria-current="page"
              class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
          </li>
          <li>
            <a href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
          </li>
          <li>
            <a href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
          </li>
          <li>
            <a href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
          </li>
        </ul>
      </nav>
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763
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
            <td v-for="item in sum" :key="item.id" class="py-2 px-4 border border-slate-950">{{ item.total_value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
<<<<<<< HEAD
  <div v-if="viewOption === 'distribution'">
=======
  <div v-else>
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763
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
            <td class="border border-black px-4 py-2">{{ mineral.value }}</td>
            <td class="border border-black px-4 py-2">{{ mineral.contribution }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
<<<<<<< HEAD
  <div v-if="viewOption === 'visualize'">
    <BarChart :company-title="companyname" :data-years="years" :data-value="dataValue" />
  </div>
=======
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763
</template>