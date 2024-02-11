<template>
    <Navigation />
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">Home</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Tokens</li>
        </ol>
    </nav>
    <h3>Application Tokens</h3>
    <button class="btn btn-sm btn-outline-success mb-3" @click="create">
        <i class="fa-solid fa-plus"></i> Create a token
    </button>
    <table class="table table-stripped table-hover" v-if="data">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">VALUE</th>
                <th scope="col">CREATED AT</th>
                <th scope="col">USED AT</th>
                <th scope="col">ACTIONS</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in data">
                <th scope="row">{{ item.tokenId }}</th>
                <td>{{ item.value }}</td>
                <td>{{ new Date(item.createdAt).toLocaleString('sr') }}</td>
                <td>{{ (item.usedAt) ? new Date(item.usedAt).toLocaleString('sr') : 'N/A' }}</td>
                <td>
                    <div class="btn-group">
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
import { ApplicationTokenModel } from '@/models/app.token.model'
import { MainService } from '@/utils/main.service'
import { ref } from 'vue';

const logout = useLogout()
const data = ref<ApplicationTokenModel[]>();
MainService.getTokens()
    .then(rsp => data.value = rsp.data)
    .catch(e => logout())

function create() {
    MainService.createToken()
        .then(rsp => data.value?.push(rsp.data))
        .catch(e => logout())
}

function remove(item: ApplicationTokenModel) {
    MainService.deleteToken(item.tokenId)
        .then(rsp => data.value = data.value?.filter(data => data.tokenId != rsp.data.tokenId))
        .catch(e => logout())
}
</script>