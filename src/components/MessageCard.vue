<template lang="pug">
div
  decrypt-box(
    v-if="messageSynced.direction === 'in'"
    :cipherText.sync="messageSynced.cipherText"
    :plainText.sync="messageSynced.plainText"
  )
  encrypt-box(
    v-else
    :cipherText.sync="messageSynced.cipherText"
    :plainText.sync="messageSynced.plainText"
  )

</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, PropSync } from 'vue-property-decorator'
import DecryptBox from './DecryptBox.vue'
import EncryptBox from './EncryptBox.vue'
import type { Message } from '@/types'

@Component({
  components: {
    DecryptBox,
    EncryptBox
  }
})
export default class MessageCard extends Vue {
  @PropSync('message') messageSynced!: Message
  @Prop() id!: number
}
</script>
