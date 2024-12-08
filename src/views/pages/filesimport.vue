<template>
    <Topbar />
    <div class="mt-2">
        <Back />
    </div>
    <div class="flex justify-center items-center">
        <Upload />
    </div>

</template>

<script setup>
import Back from '@/components/navigation/back.vue';
import Topbar from '@/components/navigation/topbar.vue';
import Upload from '@/components/upload.vue';


</script>

<style lang="scss" scoped></style>