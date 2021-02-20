<template lang="pug">
div
  span Encrypt
  textarea(v-model="plain")
  textarea(v-model="cipher")
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { PropSync, Watch } from 'vue-property-decorator'
import { storeProxy } from '@/store'

@Component
export default class EncryptBox extends Vue {
  @PropSync('plainText') plain!: string
  @PropSync('cipherText') cipher!: string

  @Watch('plain') encrypt (): void {
    storeProxy.encrypt(this.plain).then(cipher => {
      this.cipher = cipher
    })
  }
}

</script>
