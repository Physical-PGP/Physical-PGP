<template lang="pug">
  div
    p Generate new keypair or import from local.
    p
      button(@click="store.gen_keypair") New
      //- button(@click="import_keypair" disabled) Import
    p
      | Public Key
      textarea(v-model="store.localPubKey" disabled)
    p
      | Private Key
      textarea(v-model="store.localPriKey" disabled)
    p Input remote public key bellow
    p
      textarea(v-model="store.remotePubKey")
    p
      button(
        :disabled="!setupReady"
        @click=""
      ) Confirm
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { storeProxy } from '@/store'

@Component
export default class PPGP extends Vue {
  store = storeProxy

  get setupReady (): boolean {
    return !!storeProxy.localPubKey.length && !!storeProxy.localPriKey.length && !!storeProxy.remotePubKey.length
  }

  // private import_keypair (): void {

  // }
}
</script>
