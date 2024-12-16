<template>
    <div>
        <div class="flex mb-4">
            <label for="name">Name:</label>
            <p class="ps-2">{{ user.first_name }} {{ user.last_name }}</p>
        </div>

        <div class="flex">
            <div class="w-1/3">
                <div class="border-t-2 border-r-2 border-l-2 text-center font-bold border-slate-500">
                    Present Permissions
                </div>
                <div class="overflow-y-auto max-h-64 border border-slate-500">
                    <table class="table-auto border-collapse w-full">
                        <tbody>
                            <tr v-for="(user_perm, index) in user_permissions" :key="index">
                                <td class="cursor-pointer border p-2" :class="{ 'bg-blue-300': isSelected2(index) }"
                                    @click="selectPermission2(index)">{{ user_perm }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="flex flex-col justify-center mx-2 mt-10">
                <button :disabled="!selectedIndex2" @click="moveToAvailable"
                    :class="[selectedIndex2 ? 'bg-slate-500 text-white' : 'bg-gray-300 text-gray-400', 'rounded-full flex justify-center items-center w-6 h-6']">
                    <ArrowRightIcon class="w-5 h-5" />
                </button>
                <button :disabled="!selectedIndex" @click="moveToPresent"
                    :class="[selectedIndex ? 'bg-slate-500 text-white' : 'bg-gray-300 text-gray-400', 'rounded-full flex justify-center items-center w-6 h-6']">
                    <ArrowLeftIcon class="w-5 h-5" />
                </button>
            </div>

            <div class="w-1/3">
                <div class="border-t-2 border-r-2 border-l-2 text-center font-bold border-slate-500">
                    Available Permissions
                </div>
                <div class="overflow-y-auto max-h-64 border border-slate-500">
                    <table class="table-auto border-collapse w-full">
                        <tbody>
                            <tr v-for="(permission, index) in permissions" :key="index">
                                <td class="cursor-pointer border p-2" :class="{ 'bg-blue-300': isSelected(index) }"
                                    @click="selectPermission(index)">{{ permission }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="w-2/3 flex justify-center mt-4">
            <button @click="new_user_perm"
                class="bg-blue-700 hover:bg-blue-900 text-white w-20 h-6 rounded-md">Save</button>
        </div>
    </div>
</template>

<script setup>
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline';
import { useAccessStore } from '../../store/accessStore';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const permit = useAccessStore();
const selectedIndex = ref(null);
const selectedIndex2 = ref(null);
const user = computed(() => permit.userDetails);
const user_permissions = computed(() => permit.user_permit);
const permissions = computed(() => permit.permissions);
const id = route.params.id;

const selectPermission = (index) => {
    selectedIndex.value = index;
};

const selectPermission2 = (index) => {
    selectedIndex2.value = index;
};

const moveToAvailable = () => {
    const [movedAvail] = user_permissions.value.splice(selectedIndex2.value, 1);
    permissions.value.push(movedAvail);
    selectedIndex2.value = null;
};

const moveToPresent = () => {
    const [movedPres] = permissions.value.splice(selectedIndex.value, 1);
    user_permissions.value.push(movedPres);
    selectedIndex.value = null;
};

const new_user_perm = () => {
    const newVal = user_permissions.value;
    permit.user_perm_change(id, newVal);
};

const isSelected = (index) => selectedIndex.value === index;
const isSelected2 = (index) => selectedIndex2.value === index;

onMounted(async () => {
    await permit.list_user();
    await permit.list_permission();
    await permit.user(id);
});
</script>

<style lang="scss" scoped></style>
