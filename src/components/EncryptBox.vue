<template lang="pug">
div
  span Encrypt
  textarea(v-model="plain")
  textarea(v-model="cipher")
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { PropSync } from 'vue-property-decorator'

@Component
export default class EncryptBox extends Vue {
  @PropSync('plainText') plain!: string
  @PropSync('cipherText') cipher!: string
}

</script>
