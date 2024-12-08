<template>
    <div class="">
        <div class="grid grid-cols-2 w-full">
            <div class="flex justify-center">
                <div class="w-96 h-96 bg-slate-600 rounded-full"></div>
            </div>
            <div class="flex justify-start mt-3">
                <div>
                    <section class="mt-2">
                        <h2 class="mb-1 font-bold">Personal info</h2>
                        <div>
                            <p><span class="font-medium leading-relaxed">Full Name</span> : innocent john mpaki</p>
                            <p><span class="font-medium leading-relaxed">Email</span>: chonja74@gmail.com</p>
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
                        <button class="w-full bg-yellow-900 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                            @click="open">Deactivate</button>
                        <!-- <button class="w-full bg-red-900 hover:bg-red-700 text-white px-4 py-2 rounded" @click="open=true;">Delete</button> -->
                    </div>
                    <Delete :id="2" :isOpen="open" />
                </div>
            </div>


        </div>

    </div>
</template>

<script setup>

import { ref } from 'vue';
import Delete from '../../components/modal/delete.vue';

const open = ref(false);

console.log('test', open);


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