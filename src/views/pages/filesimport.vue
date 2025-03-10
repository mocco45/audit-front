<template>
    <div v-if="role == 'admin'">
        <div class="flex justify-center items-center">
            <Upload />
        </div>
    </div>
    <div v-if="role == 'user'">
        <Topbar />
        <div class="mt-2">
            <Back />
        </div>
        <div class="flex justify-center items-center">
            <Upload />
        </div>
    </div>


</template>

<script setup>
import Back from '@/components/navigation/back.vue';
import Topbar from '@/components/navigation/topbar.vue';
import Upload from '@/components/upload.vue';

const group = JSON.parse(localStorage.getItem("groups"));
const role = group[0];

</script>

<style lang="scss" scoped></style>