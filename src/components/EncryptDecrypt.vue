<template lang="pug">
div
  message-card(
    v-for="i in messageCnt"
    :key="i"
  )
  button(@click="add_message_card") New
  div#bottom
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import MessageCard from './MessageCard.vue'

@Component({
  components: {
    MessageCard
  }
})
export default class EncryptDecrypt extends Vue {
  public messageCnt = 1

  add_message_card (): void {
    ++this.messageCnt
    window.scrollTo(0, document.body.scrollHeight)
  }
}
</script>

<style scoped>
section {
  float: left;
}
#bottom {
  height: 10em;
}
</style>
