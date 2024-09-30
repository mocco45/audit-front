<template>
  <div class="relative">
    <button @click="toggleDropdown" class="flex items-center w-full">
      <component :is="icon" class="h-6 w-6 mr-5" />
      <span>{{ text }}</span>
      <svg v-if="isOpen" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <ul v-if="isOpen" class="pl-8">
      <li v-for="child in children" :key="child.text" class="mb-2">
        <router-link :to="child.link" class="block px-4 py-2 rounded hover:bg-gray-700 w-full">{{ child.text }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Props for the dropdown component
const props = defineProps({
  text: String,
  icon: Object,
  children: Array
});

const isOpen = ref(false);

// Function to toggle the dropdown
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
button {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
}
</style>
