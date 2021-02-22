<template lang="pug">
div(id="app")
  v-app
    v-main
      router-view
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import 'reflect-metadata'

@Component
export default class App extends Vue {}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
