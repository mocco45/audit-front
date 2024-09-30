<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/axios';
import Topbar from '@/components/navigation/topbar.vue';
import Back from '@/components/navigation/back.vue';

const companies = ref([]);
const searchQuery = ref('');
const page = ref(1);
const itemsPerPage = 10;
const totalCompanies = ref(0);
const pages = ref(1);
const router = useRouter();

const fetchCompanies = async (pageNum = 1) => {
  try {
    const response = await apiClient.get('/companies/', {
      params: {
        search: searchQuery.value,
        page: pageNum,
        per_page: itemsPerPage,
      },
    });
    companies.value = response.data.companies;
    totalCompanies.value = response.data.total;
    page.value = pageNum;
    pages.value = Math.ceil(totalCompanies.value / itemsPerPage);

  } catch (error) {
    console.error(error);
  }
};

const goToCompanyDetail = (companyId) => {
  router.push({ name: 'CompanyDetail', params: { companyId } });
};

onMounted(() => fetchCompanies());
</script>


<template>
  <Topbar />
  <div class="mt-2">
    <Back />
  </div>
  <div class="container relative mx-auto p-4 min-h-screen">
    <div class="overflow-x-auto sm:rounded-lg">
      <div class="pb-4 bg-white dark:bg-gray-900">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
          <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="text" v-model="searchQuery" @input="fetchCompanies" id="table-search"
            class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search companies...">
        </div>
      </div>
    </div>

    <!-- Company List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
      <div v-for="company in companies" :key="company.id"
        class="bg-white shadow-md outline outline-cyan-600 rounded-lg p-4 cursor-pointer"
        @click="goToCompanyDetail(company.id)">
        <h2 class="text-xl font-bold">{{ company.name }}</h2>
      </div>
    </div>

    <!-- Pagination Navigation -->
    <nav
      class="absolute inset-x-0 bottom-0 flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 bg-white dark:bg-gray-900"
      aria-label="Table navigation">
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing <span class="font-semibold text-gray-900 dark:text-white">{{ (page - 1) * itemsPerPage + 1 }}-{{
          Math.min(page * itemsPerPage, totalCompanies) }}</span> of <span
          class="font-semibold text-gray-900 dark:text-white">{{ totalCompanies }}</span>
      </span>
      <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <button :disabled="page === 1" @click="fetchCompanies(page - 1)"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Previous
          </button>
        </li>
        <li v-for="n in pages" :key="n">
          <button @click="fetchCompanies(n)"
            :class="{ 'bg-blue-500 text-white': n === page, 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': n !== page }"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300">
            {{ n }}
          </button>
        </li>
        <li>
          <button :disabled="page === pages" @click="fetchCompanies(page + 1)"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>