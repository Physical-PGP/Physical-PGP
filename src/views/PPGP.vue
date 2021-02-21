<template lang="pug">
  div
    router-view
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class PPGP extends Vue {
  static readonly id = 'PPGP'
}
</script>
