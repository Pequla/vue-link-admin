import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DetailsView from '@/views/DetailsView.vue'
import TokenView from '@/views/TokenView.vue'
import BanView from '@/views/BanView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/details/:id',
    name: 'details',
    component: DetailsView,
  },
  {
    path: '/token',
    name: 'token',
    component: TokenView
  },
  {
    path: '/ban',
    name: 'ban',
    component: BanView
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
