<template lang="pug">
v-row
  v-col
    v-textarea.text-body-2(
      solo
      v-model="cipher"
      no-resize
    )
  v-col
    v-textarea.text-body-1(
      solo
      v-model="plain"
    )
  v-col
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
