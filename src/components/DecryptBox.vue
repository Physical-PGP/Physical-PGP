<template lang="pug">
div
  textarea(v-model="cipher")
  textarea(v-model="plain")
  span Decrypt
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { PropSync } from 'vue-property-decorator'

@Component
export default class DecryptBox extends Vue {
  @PropSync('cipherText') cipher!: string
  @PropSync('plainText') plain!: string
}

</script>
