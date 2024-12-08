<template>
    <div class="flex h-screen">
        <!-- Sidebar -->
        <div class="bg-gray-800 w-64 p-4">
            <h2 class="text-white text-2xl mb-8">Sidebar</h2>
            <ul>
                <li class="text-white py-2 hover:bg-gray-600">
                    <router-link to="">Dashboard</router-link>
                </li>
                <li class="text-white py-2 hover:bg-gray-600">
                    <router-link to="">User</router-link>
                </li>
                <li class="text-white py-2 hover:bg-gray-600">
                    <router-link to="">Profile</router-link>
                </li>
                <li class="text-white py-2 hover:bg-gray-600">
                    <router-link to="">Messages</router-link>
                </li>
            </ul>
        </div>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col">
            <!-- Topbar -->
            <div class="bg-gray-300 text-white p-4 flex justify-between items-center">
                <div class="text-xl">Topbar</div>
                <div>
                    <button class="bg-blue-500 px-4 py-2 rounded">Login</button>
                </div>
                <div class="flex items-center space-x-2">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                        :style="{ backgroundColor: profileColor }">
                        {{ profile }}
                    </div>
                    <p class="text-gray-800">{{ email }}</p>
                    <div class="relative">
                        <ChevronUpIcon @click="toogle = !toogle" v-if="toogle" class="w-4 text-black" />
                        <ChevronDownIcon @click="toogle = !toogle" v-if="!toogle" class="w-4 text-black" />
                    </div>
                    <div v-if="toogle" ref="dropdown" class="w-24 h-20 px-4 py-4 bg-slate-700 absolute top-20 right-1">
                        <ul>
                            <li>
                                <button @click="isModalOpen = true; closeDropdown();"
                                    class="cursor-pointer">Profile</button>
                            </li>
                            <li>
                                <router-link to="">Logout</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Content -->
            <div class="p-8 flex-1">
                <h1 class="text-3xl font-bold">Welcome to the Dashboard</h1>
                <p class="mt-4">This is the main content area.</p>
                <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white p-8 rounded shadow-lg w-2/3 h-4/5">
                        <div class="flex justify-between">
                            <h2 class="text-xl font-bold mb-4">Profile</h2>
                            <button @click="isModalOpen = false" class="mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form action="">
                            <div class="grid grid-cols-2 ">
                                <div class="flex justify-end">
                                    <div class="w-96 h-96 bg-slate-600 rounded-full"></div>
                                </div>
                                <div class="flex flex-col gap-y-4 mt-10 items-center w-full ">
                                    <div :class="[hidden ? '' : 'mt-24', 'w-4/5', 'space-y-3']">

                                        <div>
                                            <label for="full" class="block text-sm font-medium text-gray-700">Full
                                                Name</label>
                                            <input v-model="full" id="full"
                                                class="rounded-full w-full border border-gray-400 px-3 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                type="text" />
                                        </div>
                                        <div>
                                            <label for="email"
                                                class="block text-sm font-medium text-gray-700">Email</label>
                                            <input v-model="emaili" id="email"
                                                class="rounded-full w-full border border-gray-400 px-3 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                type="email" />
                                        </div>
                                    </div>
                                    <div :class="[hidden ? '' : 'hidden', 'w-4/5', 'space-y-3']">
                                        <div>
                                            <label for="old" class="block text-sm font-medium text-gray-700">Old
                                                Password</label>
                                            <input v-model="password" id="old"
                                                class="rounded-full w-full border border-gray-400 px-3 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                type="password" />
                                        </div>
                                        <div>
                                            <label for="pass" class="block text-sm font-medium text-gray-700">New
                                                Password</label>
                                            <input v-model="password" id="pass"
                                                class="rounded-full w-full border border-gray-400 px-3 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                type="password" />
                                        </div>
                                    </div>
                                    <div class="flex justify-start w-80 me-9">
                                        <input type="checkbox" v-model="isChecked" @change="handleChecked"><span
                                            class="ms-2">reset password</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="flex justify-center mt-10 w-full">
                            <button @click="isModalOpen = false"
                                class="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded">
                                update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";
import { useInitialsAvatar } from "../composable/useInitials";
import { useAuthStore } from "../store/authStore";
import { ref, onMounted, onUnmounted } from "vue";
import { useAccessStore } from "../store/accessStore";

const toogle = ref(false);
const isModalOpen = ref(false);
const dropdownRef = ref(null);
const hidden = ref(false);
const isChecked = ref(false);

const auth = useAuthStore();
const access = useAccessStore();
const email = "chobja@gmail.com";
const profile = useInitialsAvatar("inocent john");

const handleChecked = () => {

    if (isChecked.value) {
        hidden.value = true;
    } else {
        hidden.value = false;
    }

}
const randomColor = () => {
    const colors = ["#f87171", "#60a5fa", "#34d399", "#facc15", "#a78bfa"];
    return colors[Math.floor(Math.random() * colors.length)];
};
const profileColor = randomColor();

const closeDropdown = () => {
    toogle.value = false;
};

const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        closeDropdown();
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
    access.list_user();
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped></style>