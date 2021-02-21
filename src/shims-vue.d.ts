declare module '*.vue' {
  import Vue from 'vue'
  import { VueConstructor } from 'vue/types/umd'
  export default Vue as VueConstructor<Vue> & {id: string}
}
