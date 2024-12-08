<template>
    <Topbar />
    <div class="bg-gray-200 h-screen p-5">
        <div>
            <div class="grid grid-cols-5 gap-y-4 mt-2">
                <!-- <p class="text-2xl font-serif capitalize font-semibold">material</p> -->
                <router-link to="upload">
                    <div class="text-center w-fit">
                        <ArrowDownTrayIcon class="h-24 w-40" />
                        <h4 class="font-bold">Data Import</h4>
                    </div>
                </router-link>

                <router-link to="companies">
                    <div class="text-center w-fit">
                        <TrophyIcon class="h-24 w-40" />
                        <h4 class="font-bold">Companies</h4>
                    </div>
                </router-link>
            </div>
        </div>
    </div>

</template>

<script setup>
import { useModalStore } from '../../store/modal';
import { ref } from 'vue';
import Topbar from '../../components/navigation/topbar.vue';
import { ArrowDownTrayIcon, QueueListIcon, TrophyIcon } from '@heroicons/vue/24/outline';

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