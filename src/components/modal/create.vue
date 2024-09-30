<script setup>
  import { ref, watch } from 'vue';
  import { useModalStore } from '@/store/modal';
  
  const props = defineProps({
    title: {
      type: String,
      default: 'Modal Title',
    },
  });
  
  const isVisible = ref(false);
  const modalStore = useModalStore();
  
  watch(() => modalStore.isModalOpen, (newVal) => {
    isVisible.value = newVal;
  });
  
  const close = () => {
    modalStore.closeModal();
  };
  </script>
    <style scoped>
    .modal-enter-active, .modal-leave-active {
      transition: opacity 0.3s ease;
    }
    
    .modal-enter-from, .modal-leave-to {
      opacity: 0;
    }
    </style>
<template>
    <transition name="modal">
        <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="fixed inset-0 bg-gray-900 opacity-50" @click="close"></div>
            <div class="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 z-10">
                <div class="flex justify-between items-center">
                <h3 class="text-xl font-semibold">{{ title }}</h3>
                <button @click="close">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
                <div class="mt-4">
                <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

  
  