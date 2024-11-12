<template>
    <Topbar />
    <div class="bg-gray-200 h-screen p-5">
        <div>
<<<<<<< HEAD
            <div class="grid grid-cols-5 gap-y-4 mt-2">
                <!-- <p class="text-2xl font-serif capitalize font-semibold">material</p> -->
                <router-link to="upload">
                    <div class="text-center w-fit">
                        <ArrowDownTrayIcon class="h-24 w-40" />
                        <h4 class="font-bold">Data Import</h4>
=======
            <h4 class="font-bold">Raw Materials</h4>
            <div class="grid grid-cols-5 gap-y-4 mt-2">
                <router-link to="upload">
                    <div class="h-36 w-40 bg-blue-800 text-white rounded-xl flex items-center justify-center shadow-xl">
                        <div>
                            <p class="text-2xl font-serif capitalize font-semibold">material</p>
                            <div class="flex justify-center">
                                <p>12</p>
                            </div>
                        </div>
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763
                    </div>
                </router-link>

                <router-link to="companies">
<<<<<<< HEAD
                    <div class="text-center w-fit">
                        <TrophyIcon class="h-24 w-40" />
                        <h4 class="font-bold">Companies</h4>
=======
                    <div class="h-36 w-40 bg-blue-800 text-white rounded-xl flex items-center justify-center shadow-xl">
                        <div>
                            <p class="text-2xl font-serif capitalize font-semibold">Companies</p>
                            <div class="flex justify-center">
                                <p>13</p>
                            </div>
                        </div>
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763
                    </div>
                </router-link>
            </div>
        </div>
    </div>

</template>

<script setup>
<<<<<<< HEAD
import { useModalStore } from '../../store/modal';
import { ref } from 'vue';
import Topbar from '../../components/navigation/topbar.vue';
import { ArrowDownTrayIcon, QueueListIcon, TrophyIcon } from '@heroicons/vue/24/outline';
=======
import { useModalStore } from '@/store/modal';
import { ref } from 'vue';
import Topbar from '@/components/navigation/topbar.vue';
>>>>>>> bdc32ee9246b4b2219f5d1620abe021200cac763

const modalStore = useModalStore();

const openModal = () => {
    modalStore.openModal();
};

const isChecked = ref(false);
const isclicked = ref(true);

const toggleDisable = () => {
    isclicked.value = !isclicked.value;
}
</script>