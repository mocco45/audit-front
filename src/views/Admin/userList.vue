<template>
    <div class="h-full">
        <table class="table-auto border border-collapse border-slate-500 w-full">
            <thead>
                <tr>
                    <th class="border border-slate-600 text-center">S/N</th>
                    <th class="border border-slate-600 text-center">User</th>
                    <th class="border border-slate-600 text-center">Role</th>
                    <th class="border border-slate-600 text-center">Status</th>
                    <th class="border border-slate-600 text-center">Action</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">

                    <td class="border border-collapse border-slate-700 text-center">{{ index + 1 }}</td>
                    <td class="border border-collapse border-slate-700 text-start ps-2 h-20">{{ user.first_name + ' ' +
                        user.last_name }}
                    </td>
                    <td class="border border-collapse border-slate-700 text-center">{{ user.groups.join(', ') }}</td>

                    <td class="border border-collapse border-slate-700 text-center">
                        <div class="flex justify-center">
                            <div v-if="user.is_active" class="w-5 h-5 me-1 rounded-full border bg-green-500"></div>
                            <div v-else class="w-5 h-5 me-1 rounded-full border bg-red-500"></div>{{ user.is_active ?
                                "active"
                                : "not active" }}
                        </div>
                    </td>
                    <td class="border border-collapse border-slate-700 ">
                        <div class="flex justify-center">
                            <router-link class="underline hover:text-blue-600 me-1"
                                :to="{ name: 'user', params: { id: user.id } }">view</router-link> | <router-link
                                class="underline hover:text-blue-600 ms-1"
                                :to="{ name: 'access', params: { id: user.id } }">access</router-link>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>

import { computed, ref } from 'vue';
import { useAccessStore } from '../../store/accessStore';

const user_list = useAccessStore();

const users = computed(() => user_list.user_list);

user_list.list_user();
</script>
