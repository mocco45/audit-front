<script setup>
import { computed, ref } from 'vue';
import { useAccessStore } from '../../store/accessStore';

const accessStore = useAccessStore();
const props = defineProps({
    id: Number,
    isOpen: Boolean,
    is_active: Boolean
});
const emit = defineEmits(['close']);
const isModalOpen = computed(() => props.isOpen);

function closeModal() {
    emit('close');
}

function handleDeactivate(id, is_active) {
    accessStore.deactivate(id, is_active);
    closeModal();
}
</script>

<template>
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-8 rounded shadow-lg w-1/3 h-60">

            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold">Deactivate Account</h2>
                <button @click="closeModal" class="hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div
                class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                <svg class="size-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
            </div>
            <!-- Modal Content -->
            <div>
                <p>Are you sure you want to deactivate this account?</p>
            </div>

            <!-- Modal Actions -->
            <div class="flex justify-end mt-10">
                <button @click="closeModal" class="bg-white border border-slate-400 text-black px-4 py-2 rounded-xl">
                    Cancel
                </button>
                <button @click="handleDeactivate(id, is_active)"
                    class="bg-red-700 ms-2 hover:bg-red-500 text-white px-4 py-2 rounded-xl">
                    Deactivate
                </button>
            </div>
        </div>
    </div>
</template>


<style scoped>
/* Add any custom styling if needed */
</style>