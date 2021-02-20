<template lang="pug">
div
  textarea(v-model="cipher")
  textarea(v-model="plain")
  span Decrypt
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { PropSync, Watch } from 'vue-property-decorator'
import { storeProxy } from '@/store'

@Component
export default class DecryptBox extends Vue {
  @PropSync('cipherText') cipher!: string
  @PropSync('plainText') plain!: string

  @Watch('cipher') decrypt (): void {
    storeProxy.decrypt(this.cipher).then(plain => {
      this.plain = plain
    })
  }
}

</script>
