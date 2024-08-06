<template>
    <div class="h-screen flex justify-center items-center">
        <div class="bg-amber-400 w-2/4 h-3/4 pt-8">
            <form @submit.prevent="register">
            <h4 class="text-center text-4xl mb-10">SIGN UP</h4>
                <div class="grid grid-cols-2 space-x-3 space-y-4">
                    <div>
                        <label for="fname" class="block">First Name</label>
                        <input type="text" id="fname" @input="clearError('fname')" class="rounded-full w-full border border-gray-400 px-3 py-2 shadow-lg focus:outline-none" v-model="fname" placeholder="Enter First Name">
                        <p v-if="error.fname" class="text-red-500 text-xs italic">{{ error.fname }}</p>
                    </div>

                    <div>
                        <label for="lname" class="block">Last Name</label>
                        <input type="text" id="lname" @input="clearError('lname')" class="rounded-full w-full border border-gray-400 px-3 py-2 shadow-lg focus:outline-none" v-model="lname" placeholder="Enter Last Name">
                        <p v-if="error.lname" class="text-red-500 text-xs italic">{{ error.lname }}</p>
                    </div>

                    <div>
                        <label for="email" class="block">Email</label>
                        <input type="email" id="email" @input="clearError('email')" class="rounded-full w-full border border-gray-400 px-3 py-2 shadow-lg focus:outline-none" v-model="email" placeholder="Enter Your Work Email">
                        <p v-if="error.email" class="text-red-500 text-xs italic">{{ error.email }}</p>
                    </div>

                    <div>
                        <label for="username" class="block">Username</label>
                        <input type="text" id="username" @input="clearError('username')" class="rounded-full w-full border border-gray-400 px-3 py-2 shadow-lg focus:outline-none" v-model="username" placeholder="Enter Username">
                        <p v-if="error.username" class="text-red-500 text-xs italic">{{ error.username }}</p>
                    </div>

                    <div>
                        <label for="password" class="block">Password</label>
                        <input type="password" id="password" @input="clearError('password')" class="rounded-full w-full border border-gray-400 px-3 py-2 shadow-lg focus:outline-none" v-model="password" placeholder="Enter Password">
                        <p v-if="error.password" class="text-red-500 text-xs italic">{{ error.password }}</p>
                    </div>

                    <div>
                        <label for="cpassword" class="block">Confirm Password</label>
                        <input type="password" id="cpassword" @input="clearError('cpassword')" class="rounded-full w-full border border-gray-400 px-3 py-2 shadow-lg focus:outline-none" v-model="cpassword" placeholder="Confirm Password">
                        <p v-if="error.cpassword" class="text-red-500 text-xs italic">{{ error.cpassword }}</p>
                    </div>

                </div>
                <div class="flex justify-center">
                    <button type="submit" class="w-32 bg-green-500 rounded-full h-10 mt-6">Register</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const fname = ref('');
const lname = ref('');
const email = ref('');
const password = ref('');
const username = ref('');
const cpassword = ref('');
const error = ref({});

const validate = () => {
    error.value = {};

    if (!fname.value.trim()) {
        error.value.fname = 'First Name must be filled';
    }

    if (!lname.value.trim()) {
        error.value.lname = 'Last Name must be filled';
    }

    if (!email.value.trim()) {
        error.value.email = 'Email must be filled';
    } else if (!validateEmail(email.value)) {
        error.value.email = 'Invalid email format';
    }

    if (!username.value.trim()) {
        error.value.username = 'Username must be filled';
    }

    if (!password.value.trim()) {
        error.value.password = 'Password must be filled';
    }

    if (!cpassword.value.trim()) {
        error.value.cpassword = 'Confirm Password must be filled';
    } else if (cpassword.value !== password.value) {
        error.value.cpassword = 'Passwords do not match';
    }

    return Object.keys(error.value).length === 0;
};

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const register = () => {
    if (validate()) {
        alert('Registration successful!');
    }

};
const clearError = (field) => {
    if(error.value[field]){
        delete error.value[field];
    }
};
</script>
