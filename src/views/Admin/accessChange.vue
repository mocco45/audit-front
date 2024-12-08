<template>
    <div>
        <div class="flex">
            <label for="name">Name :</label>
            <p class="w-20 ps-2">innocent</p>
        </div>

        <div class="flex">
            <div class="w-1/3">
                <div class="border-t-2 border-r-2 border-l-2 text-center font-bold border-collapse border-slate-500">
                    Present
                    Permissions
                </div>
                <div class="overflow-y-auto max-h-64 border border-slate-500">
                    <table class="table-auto border border-slate-500 border-collapse w-full">
                        <tbody>
                            <tr v-for="(user_perm, index) in user_permissions">
                                <td class="cursor-pointer border p-2" :class="{ 'bg-blue-300': isSelected2(index) }"
                                    @click="selectPermission2(index)">{{
                                        user_perm }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="flex flex-col justify-center ms-1 me-1 mt-10">
                <div class="hover:bg-slate-500 hover:text-white rounded-full flex justify-center items-center w-6 h-6">
                    <ArrowRightIcon class="w-5 h-5" />
                </div>
                <div class="hover:bg-slate-500 hover:text-white rounded-full flex justify-center items-center w-6 h-6">
                    <ArrowLeftIcon class="w-5 h-5" />
                </div>

            </div>
            <div class="w-1/3">
                <div class="border-t-2 border-r-2 border-l-2 text-center font-bold border-collapse border-slate-500">
                    Available
                    Permissions
                </div>
                <div class="overflow-y-auto max-h-64 border border-slate-500">
                    <table class="table-auto border border-slate-500 border-collapse w-full">
                        <tbody>
                            <tr v-for="(permission, index) in permissions">
                                <td class="cursor-pointer border p-2" :class="{ 'bg-blue-300': isSelected(index) }"
                                    @click="selectPermission(index)">{{ permission.name }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline';
import { useAccessStore } from '../../store/accessStore';
import { computed, onMounted, ref } from 'vue';
const permit = useAccessStore();
const user_permissions = computed(() => permit.user_list);
console.log('user permissions', user_permissions);

const permissions = computed(() => permit.permissions);
const selectedIndex = ref(null);
const selectedIndex2 = ref(null);

const selectPermission = (index) => {
    selectedIndex.value = index;
};

const selectPermission2 = (index) => {
    selectedIndex2.value = index;
};


const isSelected = (index) => {
    return selectedIndex.value === index;
};

const isSelected2 = (index) => {
    return selectedIndex2.value === index;
};

onMounted(() => {
    const storedPerm = localStorage.getItem("groups");
    if (storedPerm) {
        user_permissions.value = JSON.parse(storedPerm);
    }
    else {
        console.log('No groups found');

    }
})

permit.list_user();
</script>

<style lang="scss" scoped></style>