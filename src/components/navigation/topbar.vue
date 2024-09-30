<template>
   <nav class="bg-gray-900 text-white w-full py-4 shadow-md">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <div class="text-2xl font-semibold flex items-center">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M9 6h6M3 18h18m-6-4h6" />
            </svg> -->
            My Application
        </div>
        <div>
            <ul v-for="item in menuItems" :key="item" class="flex space-x-4 flex-row-reverse py-3">
                <li @click="logout()">
                    <div class="flex justify-center items-center">
                        <ArrowRightStartOnRectangleIcon class="h-4 w-6 cursor-pointer"/>
                        logout
                    </div>
                </li>
                <li>
                    <component class="h-6 w-6" :is="item.icon"></component> 
                </li>
            </ul>
        </div>
    </div>
   </nav>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore';
import { ArrowRightStartOnRectangleIcon, BellIcon } from '@heroicons/vue/24/outline';

   const menuItems = [
        {icon: BellIcon, link: '/dashboard'}
    ];
const log = useAuthStore();

const logout = () => {
    log.logout();
    console.log('successfully logged out');
}
</script>
