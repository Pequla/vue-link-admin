<template>
    <div class="login">
        <h3 class="mt-5 text-center">
            MINECRAFT DISCORD LINK<br>ADMIN PANEL
        </h3>
        <form class="mx-auto form-responsive" v-on:submit.prevent="doLogin">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MainService } from '@/utils/main.service';
import { SessionManager } from '@/utils/session.manager';
import { useRouter } from 'vue-router';

const username = ref<string>()
const password = ref<string>()
const router = useRouter()

function doLogin() {
    if (username.value == undefined || password.value == undefined) return
    if (username.value == '' || password.value == '') return

    MainService.login(username.value, password.value).then(rsp => {
        SessionManager.saveAuth(rsp.data)
        router.push({
            path: '/'
        })
    }).catch(e => {
        alert('Username or Password are incorrect')
    })
}
</script>

<style>
.form-responsive {
    width: 50%;
}

@media (max-width: 900px) {
  .form-responsive {
    width: 100%;
  }
}
</style>