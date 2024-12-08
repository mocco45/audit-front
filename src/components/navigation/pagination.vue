<template>
    <nav class="flex items-center justify-between p-4 bg-white dark:bg-gray-900" aria-label="Pagination">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing
            <span class="font-semibold text-gray-900 dark:text-white">
                {{ (currentPage - 1) * itemsPerPage + 1 }} -
                {{ Math.min(currentPage * itemsPerPage, totalItems) }}
            </span>
            of
            <span class="font-semibold text-gray-900 dark:text-white">
                {{ totalItems }}
            </span>
        </span>
        <ul class="inline-flex -space-x-px text-sm h-8">
            <li>
                <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)"
                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Previous
                </button>
            </li>
            <li v-for="n in totalPages" :key="n">
                <button @click="changePage(n)" :class="{
                    'bg-blue-500 text-white': n === currentPage,
                    'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white':
                        n !== currentPage
                }" class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300">
                    {{ n }}
                </button>
            </li>
            <li>
                <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)"
                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                </button>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
    currentPage: Number,
    itemsPerPage: Number,
    totalItems: Number,
});

const emit = defineEmits(['page-changed']);

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

function changePage(page) {
    emit('page-changed', page);
}
</script>