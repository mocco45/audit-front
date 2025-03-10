<template>
    <div>
        <div class="mt-2">
            <Back />
        </div>
        <div class="flex flex-col mb-4">
            <div class="flex">
                <label for="name">Name:</label>
                <p class="ps-2">{{ user.first_name }} {{ user.last_name }}</p>
            </div>

            <div class="flex">
                <label for="name">Role:</label>
                <div v-if="!toChange" class="ps-2" v-for="item in user.groups" :key="item.groups">
                    {{ item }}
                </div>
                <select v-if="toChange" class="ms-2 appearance-none py-0  leading-tight border rounded-full"
                    v-model="selectedRole" id="">
                    <option value="" selected disabled>--Select role--</option>
                    <option v-for="group in roles" :key="group.id" :value="group.id">{{ group.name }}</option>
                </select>
                <div v-if="!toChange" @click="change()"
                    class="underline text-blue-600 hover:cursor-pointer hover:text-blue-800 w-16 h-6 text-center rounded-full ms-4">
                    change
                </div>
                <div v-if="toChange" @click="changeRoles()"
                    class="bg-green-600 hover:cursor-pointer hover:bg-green-800 text-white w-16 h-6 text-center rounded-full ms-4">
                    {{ toChange ? "save" : "change" }}
                </div>
            </div>

        </div>

        <div class="flex w-full">
            <div class="w-1/2">
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
                    :class="[selectedIndex2 || selectedIndex2 == 0 ? 'bg-slate-500 text-white' : 'bg-gray-300 text-gray-400', 'rounded-full flex justify-center items-center w-6 h-6']">
                    <ArrowRightIcon class="w-5 h-5" />
                </button>
                <button :disabled="!selectedIndex" @click="moveToPresent"
                    :class="[selectedIndex || selectedIndex == 0 ? 'bg-slate-500 text-white' : 'bg-gray-300 text-gray-400', 'rounded-full flex justify-center items-center w-6 h-6']">
                    <ArrowLeftIcon class="w-5 h-5" />
                </button>
            </div>

            <div class="w-1/2">
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
import Back from '@/components/navigation/back.vue';

const route = useRoute();
const permit = useAccessStore();
const selectedIndex = ref(null);
const selectedIndex2 = ref(null);
const toChange = ref(false);
const selectedRole = ref(null);
const user = computed(() => permit.userDetails);
const user_permissions = computed(() => permit.user_permit);
const permissions = computed(() => permit.permissions);
const roles = computed(() => permit.groups);
const id = route.params.id;

const selectPermission = (index) => {
    selectedIndex.value = index;
};

const selectPermission2 = (index) => {
    selectedIndex2.value = index;
};

const changeRoles = async () => {
    const groupSelected = selectedRole.value;
    const data = { 'userID': parseInt(id), 'roleID': groupSelected }
    try {
        await permit.assign_roles(data)
        await permit.user(id);
        toChange.value = false
    } catch (error) {
        console.log("there is error", error);

    }
    ;
}

const change = () => {
    toChange.value = true;
}

const moveToAvailable = () => {
    if (selectedIndex2.value !== null && selectedIndex2.value >= 0) {
        const [movedAvail] = user_permissions.value.splice(selectedIndex2.value, 1);
        if (!permissions.value.includes(movedAvail)) {
            permissions.value.push(movedAvail);
        }
        selectedIndex2.value = null;
    } else {
        console.error("invalid index");
    }

};

const moveToPresent = () => {
    if (selectedIndex.value !== null && selectedIndex.value >= 0) {
        const [movedPres] = permissions.value.splice(selectedIndex.value, 1);
        if (!user_permissions.value.includes(movedPres)) {
            user_permissions.value.push(movedPres);
        }
        selectedIndex.value = null;
    } else {
        console.log('invalid index');

    }

};

const new_user_perm = () => {
    const newVal = user_permissions.value;
    permit.user_perm_change(id, newVal);
};

const filtered = () => {
    const filterArr = new Set(user_permissions.value);
    const newFiler = permissions.value.filter(item => !filterArr.has(item));
    permissions.value = newFiler;
}

const isSelected = (index) => selectedIndex.value === index;
const isSelected2 = (index) => selectedIndex2.value === index;

onMounted(async () => {
    await permit.list_user();
    await permit.list_permission();
    await permit.list_roles();
    await permit.user(id);
    filtered();

});
</script>

<style lang="scss" scoped></style>
