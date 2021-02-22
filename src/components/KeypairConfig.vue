<template lang="pug">
div
  p Generate new keypair or import from local.
  div.mb-2
    v-btn.mx-2(@click="store.gen_keypair") New
  div.mb-5
    v-btn.mx-2(disabled) Import
  div
    v-row
      v-col
      v-col.col-4
        v-textarea.text-body-2(
          outlined
          label="Local Public Key"
          v-model="store.localPubKeyBase64"
          rows="6"
          no-resize
        )
      v-col.col-4
        v-textarea.text-body-2(
          outlined
          label="Local Private Key"
          v-model="store.localPriKeyBase64"
          rows="6"
          no-resize
        )
      v-col
  p Input remote public key bellow
  div
    v-row
      v-col
      v-col
        v-textarea.text-body-2(
          outlined
          label="Remote Public Key"
          v-model="store.remotePubKeyBase64"
        )
      v-col
  p
    v-btn.primary(
      :disabled="!store.setupCompleted"
      @click="confirm"
    ) Confirm
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { storeProxy } from '@/store'
import EnD from './EncryptDecrypt.vue'

@Component
export default class KeypairConfig extends Vue {
  static readonly id = 'KeypairConfig'
  store = storeProxy

  confirm (): void {
    storeProxy.calculate_raw_keys()
    this.$router.push({ name: EnD.id })
  }

  // private import_keypair (): void {

  // }
}
</script>

<style scoped>
</style>
