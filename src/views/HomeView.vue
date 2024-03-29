<template>
  <div class="home">
    <Navigation />
    <div class="input-group mb-3">
      <span class="input-group-text" id="search">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
      <input type="text" class="form-control" aria-describedby="search" @keyup="search" v-model="input">
    </div>
    <table class="table table-stripped table-hover" v-if="data && bans">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">UUID</th>
          <th scope="col">DISCORD</th>
          <th scope="col">CREATED AT</th>
          <th scope="col">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filterData(data)">
          <th scope="row">{{ item.dataId }}</th>
          <td>{{ item.uuid }}</td>
          <td>{{ item.user.discordId }}</td>
          <td>{{ new Date(item.createdAt).toLocaleString('sr') }}</td>
          <td>
            <div class="btn-group">
              <router-link class="btn btn-sm btn-primary" :to="`/details/${item.dataId}`" title="Details">
                <i class="fa-solid fa-circle-info"></i>
              </router-link>
              <a class="btn btn-sm btn-success" :href="`https://datavue.pequla.com/user/${item.user.discordId}`"
                target="_blank" title="Open in DataVue">
                <i class="fa-solid fa-right-from-bracket"></i>
              </a>
              <button class="btn btn-sm btn-secondary" @click="ban(item)" title="Ban the user">
                <i class="fa-solid fa-gavel"></i>
              </button>
              <button class="btn btn-sm btn-danger" @click="remove(item)" title="Remove the link">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Loading v-else />
  </div>
</template>

<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { DataModel } from '@/models/data.model'
import { MainService } from '@/utils/main.service';
import { onMounted, ref } from 'vue';
import { useLogout } from '@/hooks/logout.hook';
import Loading from '@/components/Loading.vue';
import { BanModel } from '@/models/ban.model';

const data = ref<DataModel[]>()
const bans = ref<BanModel[]>()
let cached: undefined | DataModel[] = undefined
const input = ref<string>()
const logout = useLogout()

function search() {
  if (input.value == undefined) return
  if (input.value == '') {
    data.value = cached
    return
  }

  MainService.searchData(input.value)
    .then(rsp => data.value = rsp.data)
    .catch(e => logout())
}

function remove(item: DataModel) {
  if (confirm('You will delete the link ' + item.dataId)) {
    MainService.deleteData(item.dataId)
      .then(rsp => {
        data.value = data.value?.filter(data => data.dataId != rsp.data.dataId)
        cached = cached?.filter(data => data.dataId != rsp.data.dataId)
      })
      .catch(e => logout())
  }
}

function ban(item: DataModel) {
  if (confirm('Are you sure you want to ban ' + item.user.discordId)) {
    let reason = prompt('Reason (can be empty) why are you banning ' + item.user.discordId)
    MainService.createBan(item.userId, reason)
      .then(rsp => {
        data.value = data.value?.filter(data => data.userId != rsp.data.userId)
        cached = cached?.filter(data => data.userId != rsp.data.userId)
      })
      .catch(e => logout())
  }
}

function filterData(data: DataModel[]) {
  return data.filter(i => {
    if (bans.value == undefined) return false
    return !bans.value.map(b => b.userId).includes(i.userId)
  })
}

onMounted(async () => {
  try {
    bans.value = (await MainService.getBans()).data
    const rsp = await MainService.getData()
    data.value = rsp.data
    cached = rsp.data
  } catch (e) {
    logout()
  }
})
</script>