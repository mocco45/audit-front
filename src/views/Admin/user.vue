<template>
    <div class="">
        <div class="mt-2">
            <Back />
        </div>
        <div class="grid grid-cols-2 w-full">
            <div class="flex justify-center">
                <div class="w-96 h-96 bg-slate-600 rounded-full"></div>
            </div>
            <div class="flex justify-start mt-3">
                <div>
                    <section class="mt-2">
                        <h2 class="mb-1 font-bold">Personal info</h2>
                        <div>
                            <p><span class="font-medium leading-relaxed">Full Name</span> : {{ userDetail.first_name }}
                                {{
                                    userDetail.last_name }}</p>
                            <p><span class="font-medium leading-relaxed">Email</span>: {{ userDetail.email }}</p>
                            <p><span class="font-medium">Contact</span>: 0744611319</p>
                        </div>
                    </section>
                    <section class="mt-5">
                        <h2 class="mb-1 font-bold">Work info</h2>
                        <div>
                            <p><span class="font-medium leading-relaxed">Department</span>: Database</p>
                            <p><span class="font-medium leading-relaxed">Position</span>: CEO</p>
                        </div>
                    </section>
                    <div>
                        <button
                            :class="[userDetail.is_active ? ' bg-blue-700 hover:bg-blue-500' : ' bg-green-700 hover:bg-green-500', 'w-full text-white px-4 py-2 rounded-xl']"
                            @click="userDetail.is_active ? open = !open : userFetch.deactivate(userID, false);">{{
                                userDetail.is_active ? 'Deactivate' : 'Activate' }}</button>
                        <button class="w-full bg-red-700 hover:bg-red-500 text-white mt-3 px-4 py-2 rounded-xl"
                            @click="isOpen = true;">Delete</button>
                    </div>
                    <Deactivate :id="userID" :is_active="userDetail.is_active" :isOpen="open" @close="handleClose" />
                    <Delete :id="userID" :isOpen="isOpen" @close="handleClose2" />
                </div>
            </div>


        </div>

    </div>
</template>

<script setup>

import Deactivate from '@/components/modal/deactivate.vue';
import Delete from '@/components/modal/delete.vue';
import Back from '@/components/navigation/back.vue';
import { useAccessStore } from '@/store/accessStore';

import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


const open = ref(false);
const isOpen = ref(false);
const route = useRoute();
const userFetch = useAccessStore();
const userID = route.params.id;
function handleClose() {
    open.value = false;
}
function handleClose2() {
    isOpen.value = false;
}
const userDetail = computed(() => userFetch.userDetails);


onMounted(() => {
    userFetch.user(userID);
})

</script>

<style scoped>
body {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    line-height: 1.6;
}

h1,
h2,
h3 {
    font-family: 'Montserrat', sans-serif;
}
</style>