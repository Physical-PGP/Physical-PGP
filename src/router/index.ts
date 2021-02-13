import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Home from '../views/Home.vue'
import PPGP from '@/views/PPGP.vue'
import KeypairConfig from '@/components/KeypairConfig.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: Home.name,
    component: Home
  },
  {
    path: '/ppgp',
    name: PPGP.name,
    component: PPGP,
    children: [
      {
        path: '',
        redirect: 'keypair'
      },
      {
        path: 'keypair',
        name: KeypairConfig.name,
        component: KeypairConfig
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
