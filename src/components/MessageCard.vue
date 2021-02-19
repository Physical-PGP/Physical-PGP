<template lang="pug">
div

</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import DecryptBox from './DecryptBox.vue'
import EncryptBox from './EncryptBox.vue'

@Component({
  components: {
    DecryptBox,
    EncryptBox
  }
})
export default class MessageCard extends Vue {

}
</script>
