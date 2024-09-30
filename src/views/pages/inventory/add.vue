<template>
    <Topbar/>
    <div class="bg-gray-200 h-screen p-5">
        <div>
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
                    </div>
                </router-link>
            </div>
        </div>
    </div>

</template>

<script setup>
import { useModalStore } from '@/store/modal';
import { ref } from 'vue';
import Topbar from '@/components/navigation/topbar.vue';

const modalStore = useModalStore();

const openModal = () => {
  modalStore.openModal();
};

const isChecked = ref(false);
const isclicked = ref(true);

const toggleDisable = () => {
    isclicked.value =!isclicked.value;
}
</script>