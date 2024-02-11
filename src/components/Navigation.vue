<template>
    <nav class="navbar navbar-expand-lg" v-if="admin">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">MCADMIN</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/token">Tokens</router-link>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" @click="logout">Logout</button>
                    </li>
                </ul>
                <span class="navbar-text">
                    <i class="fa-solid fa-user"></i>
                    {{ admin.username }} ({{ admin.discordId }})
                </span>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import { useLogout } from '@/hooks/logout.hook';
import { AdminModel } from '@/models/admin.model'
import { MainService } from '@/utils/main.service';
import { ref } from 'vue';

const admin = ref<AdminModel>()
const logout = useLogout()

MainService.getSelf()
    .then(rsp => admin.value = rsp.data)
    .catch(e => logout())
</script>