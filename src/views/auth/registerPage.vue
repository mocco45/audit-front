<template>
    <div class="h-screen flex justify-center items-center">
        <div class=" shadow-2xl w-2/4 h-3/4 pt-8">
            <form @submit.prevent="register">
                <h4 class="text-center text-4xl mb-10">SIGN UP</h4>
                <div class="grid grid-cols-2 gap-4 pl-6 pr-6">
                    <div>
                        <label for="fname" class="block mb-2">First Name</label>
                        <input type="text" id="fname" @input="clearError('fname')" v-model="fname"
                            class="rounded-full w-full border border-gray-400 px-3 shadow-lg focus:outline-none"
                            placeholder="Enter First Name">
                        <p v-if="error.fname" class="text-red-500 text-xs italic mt-2">{{ error.fname }}</p>
                    </div>

                    <div>
                        <label for="lname" class="block mb-2">Last Name</label>
                        <input type="text" id="lname" @input="clearError('lname')" v-model="lname"
                            class="rounded-full w-full border border-gray-400 px-3 shadow-lg focus:outline-none"
                            placeholder="Enter Last Name">
                        <p v-if="error.lname" class="text-red-500 text-xs italic mt-2">{{ error.lname }}</p>
                    </div>

                    <div>
                        <label for="email" class="block mb-2">Email</label>
                        <input type="email" id="email" @input="clearError('email')" v-model="email"
                            class="rounded-full w-full border border-gray-400 px-3 shadow-lg focus:outline-none"
                            placeholder="Enter Your Work Email">
                        <p v-if="error.email" class="text-red-500 text-xs italic mt-2">{{ error.email }}</p>
                    </div>

                    <!-- <div>
                        <label for="phone" class="block mb-2">Phone</label>
                        <input type="text" id="phone" @input="clearError('phone')" v-model="phone"
                            class="rounded-full w-full border border-gray-400 px-3 shadow-lg focus:outline-none"
                            placeholder="Enter phone">
                        <p v-if="error.phone" class="text-red-500 text-xs italic mt-2">{{ error.phone }}</p>
                    </div> -->

                    <div>
                        <label for="password" class="block mb-2">Password</label>
                        <input type="password" id="password" @input="clearError('password')" v-model="password"
                            class="rounded-full w-full border border-gray-400 px-3 shadow-lg focus:outline-none"
                            placeholder="Enter Password">
                        <p v-if="error.password" class="text-red-500 text-xs italic mt-2">{{ error.password }}</p>
                    </div>

                    <div>
                        <label for="cpassword" class="block mb-2">Confirm Password</label>
                        <input type="password" id="cpassword" @input="clearError('cpassword')" v-model="cpassword"
                            class="rounded-full w-full border border-gray-400 px-3 shadow-lg focus:outline-none"
                            placeholder="Confirm Password">
                        <p v-if="error.cpassword" class="text-red-500 text-xs italic mt-2">{{ error.cpassword }}</p>
                    </div>
                </div>

                <div class="flex justify-center">
                    <button type="submit"
                        class="w-32 hover:bg-orange-400 bg-orange-300 rounded-full h-10 mt-6">Register</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/authStore';

const fname = ref('');
const lname = ref('');
const email = ref('');
const password = ref('');
// const phone = ref('');
const cpassword = ref('');
const error = ref({});
const authStore = useAuthStore();

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

    // if (!phone.value.trim()) {
    //     error.value.phone = 'phone must be filled';
    // }

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

const register = async () => {
    if (validate()) {
        const formData = { first_name: fname.value, last_name: lname.value, email: email.value, password: password.value };
        await authStore.register(formData)
    }

};
const clearError = (field) => {
    if (error.value[field]) {
        delete error.value[field];
    }
};
</script>
