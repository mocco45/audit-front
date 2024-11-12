<template>
  <div class="min-h-screen flex justify-center items-center bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg max-w-4xl w-full flex">
      <div class="w-1/2">
        <img src="/img/logo.jpg" class="h-full w-full object-cover rounded-l-lg" alt="">
      </div>
      <div class="w-1/2 p-8 flex flex-col justify-center">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block font-medium">Email</label>
            <input type="email" @input="clearError('email')" v-model="email" id="email"
              class="rounded-full w-full border border-gray-400 px-3 py-2 shadow-lg focus:outline-none">
            <p v-if="errors.email" class="text-red-500 text-xs italic">{{ errors.email }}</p>
          </div>
          <div>
            <label for="password" class="block font-medium">Password</label>
            <input type="password" @input="clearError('password')" v-model="password" id="password"
              class="rounded-full w-full border border-gray-400 px-3 py-2 shadow-lg focus:outline-none">
            <p v-if="errors.password" class="text-red-500 text-xs italic">{{ errors.password }}</p>
          </div>
          <p v-if="errors.credentials" class="text-red-500 text-xs italic">{{ errors.credentials }}</p>
          <div>
            <input type="checkbox" name="remember" id="remember">
            <label for="remember" class="font-medium ml-3">Remember me</label>
          </div>
          <div class="flex justify-center">
            <button class="rounded-full hover:bg-orange-400 bg-orange-300 w-32 h-10">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../store/authStore';

const email = ref('');
const password = ref('');
const errors = ref({});
const authStore = useAuthStore();


const validate = () => {
  errors.value = {};
  if (!email.value) {
    errors.value.email = 'Email is required';
  }
  if (!password.value) {
    errors.value.password = 'Password is required';
  }

  return Object.keys(errors.value).length === 0;
};

const handleLogin = async () => {
  if (validate()) {
    await authStore.login({ email: email.value, password: password.value });
    if (!authStore.error) {
      errors.value.credentials = "Invalid Credentials";
    }

  }
};

const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
  if (errors.value['credentials']) {
    delete errors.value['credentials'];
  }
};
</script>