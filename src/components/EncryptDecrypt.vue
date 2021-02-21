<template lang="pug">
div
  message-card(
    v-for="(message, index) in messages" :key="index"
    :message.sync="message"
    :id="index"
  )
  button(@click="new_msg_in") New In
  button(@click="new_msg_out") New Out
  div#bottom
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import MessageCard from './MessageCard.vue'

import type { Message, Direction } from '@/types'

@Component({
  components: {
    MessageCard
  }
})
export default class EncryptDecrypt extends Vue {
  static readonly id = 'EncryptDecrypt'
  public messages: Array<Message> = []

  private add_message_card (direction: Direction): void {
    this.messages.push({
      plainText: '',
      cipherText: '',
      direction
    })
    window.scrollTo(0, document.body.scrollHeight)
  }

  new_msg_in (): void {
    this.add_message_card('in')
  }

  new_msg_out (): void {
    this.add_message_card('out')
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
