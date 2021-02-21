import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Home from '@/views/Home.vue'
import PPGP from '@/views/PPGP.vue'
import EncryptDecrypt from '@/components/EncryptDecrypt.vue'
import KeypairConfig from '@/components/KeypairConfig.vue'

import { storeProxy } from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: Home.id,
    component: Home
  },
  {
    path: '/ppgp',
    name: PPGP.id,
    component: PPGP,
    beforeEnter: (to, _, next) => {
      // Deny service if keypair missing
      if (to.name !== KeypairConfig.id) {
        if (!storeProxy.setupCompleted) {
          next({ name: KeypairConfig.id })
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
        name: KeypairConfig.id,
        component: KeypairConfig
      },
      {
        path: 'E&D',
        name: EncryptDecrypt.id,
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
