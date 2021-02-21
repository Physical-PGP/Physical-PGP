<template lang="pug">
  div(class="home")
    p
      router-link(:to="{name: ppgpPageName}") Start!
    p
      router-link(:to="{name: docPageName}") Documentation (not finished)
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import PPGP from '@/views/PPGP.vue'

@Component
export default class Home extends Vue {
  static readonly id = 'Home'
  private ppgpPageName = PPGP.id
}
</script>
