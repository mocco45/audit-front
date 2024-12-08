<script setup>
import { ref } from 'vue';
import { useAccessStore } from '../../store/accessStore';

const isModalOpen = ref(false);
const accessStore = useAccessStore();
const props = defineProps({
    id: Number,
    isOpen: Boolean
});
isModalOpen.value = props.isOpen;

function closeModal() {
    isModalOpen.value = false;
}

function handleDelete(id) {
    accessStore.delete(id);
    closeModal();
}
</script>

<template>
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-8 rounded shadow-lg w-2/3 h-4/5">
            <!-- Modal Header -->
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold">Profile</h2>
                <button @click="closeModal" class="hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Modal Content -->
            <div>
                <p>Are you sure you want to deactivate this account?</p>
            </div>

            <!-- Modal Actions -->
            <div class="flex justify-between mt-10">
                <button @click="closeModal" class="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded">
                    Cancel
                </button>
                <button @click="handleDelete(id)" class="bg-red-900 hover:bg-red-700 text-white px-4 py-2 rounded">
                    Deactivate Account
                </button>
            </div>
        </div>
    </div>
</template>


<style scoped>
/* Add any custom styling if needed */
</style>