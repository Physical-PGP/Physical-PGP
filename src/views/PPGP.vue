<template lang="pug">
  div
    p Generate new keypair or import from local.
    p
      button(@click="gen_keypair") New
      button(@click="import_keypair" disabled) Import
    p
      | Public Key
      textarea(v-module="pubKey" disabled)
    p
      | Private Key
      textarea(v-module="priKey" disabled)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class PPGP extends Vue {
  private pubKey!: string
  private priKey!: string
}
</script>
