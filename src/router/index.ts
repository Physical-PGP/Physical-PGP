import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Home from '../views/Home.vue'
import PPGP from '@/views/PPGP.vue'
import EncryptDecrypt from '@/components/EncryptDecrypt.vue'
import KeypairConfig from '@/components/KeypairConfig.vue'

import { storeProxy } from '@/store'

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
    beforeEnter: (to, _, next) => {
      // Deny service if keypair missing
      if (to.name !== KeypairConfig.name) {
        if (!storeProxy.setupCompleted) {
          next({ name: KeypairConfig.name })
        } else {
          next()
        }
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        redirect: 'keypair'
      },
      {
        path: 'keypair',
        name: KeypairConfig.name,
        component: KeypairConfig
      },
      {
        path: 'E&D',
        name: EncryptDecrypt.name,
        component: EncryptDecrypt
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
