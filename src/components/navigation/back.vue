<script setup>
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const goBack = () => {
  router.back();
};

const formattedPath = computed(() => {
  const segments = route.path.split('/').filter(segment => segment);
  return segments.length > 0 ? `Home / ${segments.join(' / ')}` : 'Home';
});
</script>

<template>
  <div class="flex items-center space-x-2 ms-4">
    <ArrowLeftIcon @click="goBack" class="h-4 w-4  cursor-pointer hover:text-blue-700" />
    <span class="text-gray-500 text-md">{{ formattedPath }}</span>
  </div>
</template>
