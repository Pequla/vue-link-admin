<template>
    <div class="details">
        <Navigation />
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/">Home</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Details</li>
            </ol>
        </nav>
        <h3>Link details</h3>
        <table class="table table-striped table-select" v-if="data">
            <tbody>
                <tr>
                    <th>ID</th>
                    <th>{{ data.dataId }}</th>
                </tr>
                <tr>
                    <th>DISCORD ID</th>
                    <th>{{ data.user.discordId }}</th>
                </tr>
                <tr>
                    <th>GUILD ID</th>
                    <th>{{ data.guild.discordId }}</th>
                </tr>
                <tr>
                    <th>MINECRAFT ID</th>
                    <th>{{ data.uuid }}</th>
                </tr>
                <tr>
                    <th>CREATED AT</th>
                    <th>{{ new Date(data.createdAt).toLocaleString('sr') }}</th>
                </tr>
            </tbody>
        </table>
        <Loading v-else />
    </div>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import { DataModel } from '@/models/data.model';
import { MainService } from '@/utils/main.service';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = Number.parseInt(route.params.id as string)

const data = ref<DataModel>()
const logout = useLogout()

MainService.getDataById(id)
    .then(rsp => data.value = rsp.data)
    .catch(e => logout())
</script>