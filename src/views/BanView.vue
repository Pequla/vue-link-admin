<template>
    <Navigation />
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">Home</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Bans</li>
        </ol>
    </nav>
    <h3>User Bans</h3>
    <table class="table table-stripped table-hover" v-if="data">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">DISCORD</th>
                <th scope="col">REASON</th>
                <th scope="col">CREATED AT</th>
                <th scope="col">ACTIONS</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in data">
                <th scope="row">{{ item.banId }}</th>
                <td>{{ item.user.discordId }} </td>
                <td>{{ (item.reason) ? item.reason : 'N/A' }}</td>
                <td>{{ new Date(item.createdAt).toLocaleString('sr') }}</td>
                <td>
                    <div class="btn-group">
                        <router-link class="btn btn-sm btn-primary" :to="`/details/${item.userId}`">
                            <i class="fa-solid fa-circle-info"></i>
                        </router-link>
                        <button class="btn btn-sm btn-danger" @click="remove(item)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <Loading v-else />
</template>

<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import Loading from '@/components/Loading.vue';
import { useLogout } from '@/hooks/logout.hook';
import { MainService } from '@/utils/main.service';
import { BanModel } from '@/models/ban.model'
import { ref } from 'vue';

const logout = useLogout()
const data = ref<BanModel[]>();
MainService.getBans()
    .then(rsp => data.value = rsp.data)
    .catch(e => logout())

function remove(item: BanModel) {
    if (confirm('You will delete the ban ' + item.banId)) {
        MainService.deleteBan(item.banId)
            .then(rsp => data.value = data.value?.filter(data => data.banId != rsp.data.banId))
            .catch(e => logout())
    }
}
</script>