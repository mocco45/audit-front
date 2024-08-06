<template>
    <div class="flex h-screen">
            <sidebar/>
        <div :class="['flex-1', isOpen ? 'md:pl-64 pl-20' : 'pl-32', 'transition-all duration-300']">
            <topbar/>
            <main class="flex-1 p-6 bg-gray-100">
                <router-view/>
            </main>
        </div>
    </div>
</template>

<script setup>
import sidebar from '@/components/navigation/sidebar.vue';
import topbar from '@/components/navigation/topbar.vue';
import { useNavStore } from '@/store/navStore';
import { computed } from 'vue';

const nav = useNavStore();
const isOpen = computed(() => nav.isOpen);
</script>
