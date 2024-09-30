<template>
    <nav :class="['bg-gray-800', 'fixed', 'top-0', 'left-0', 'text-white', isOpen ? 'w-64' : 'w-32', 'h-full', 'transition-width duration-300']">
        <div class="p-4 flex flex-col items-center">
            <button @click="toggleSidebar" class="mb-4">
                <svg v-if="isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
            <ul v-if="isOpen" class="w-full">
                <li v-for="item in menuItems" :key="item.text" class="mb-2 flex flex-col items-start w-full">
                <Dropdown v-if="item.children" :text="item.text" :icon="item.icon" :children="item.children" />
                <div v-else class="flex items-center w-full">
                    <component :is="item.icon" class="h-6 w-6 mr-2" />
                    <router-link :to="item.link" class="block px-4 py-2 rounded hover:bg-gray-700 w-full">{{ item.text }}</router-link>
                </div>
                </li>
            </ul>
            <ul v-else>
                <li v-for="item in menuItems" :key="item.text" class="mb-2 flex items-center justify-center">
                <component :is="item.icon" class="h-6 w-6" />
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useNavStore } from '@/store/navStore';
import { HomeIcon } from '@heroicons/vue/24/outline'
import Dropdown from '../dropdown.vue';

const nav = useNavStore();
const isOpen = computed(() => nav.isOpen);
const menuItems = [
    {text: 'Home', icon: HomeIcon, link: '/'},
    {
        text: 'Inventory', icon: HomeIcon, link: '/inventory',
        children: [
            { text: 'Add', link: '/inventory/add' },
            { text: 'List', link: '/inventory/list' }
        ]
    },
    {text: 'Products', icon: HomeIcon, link: '/products'},
    {text: 'Customers', icon: HomeIcon, link: '/customers'},
    {text: 'Staff', icon: HomeIcon, link: '/staff'},
];

const toggleSidebar = () => {
    nav.toggle();
}
</script>
