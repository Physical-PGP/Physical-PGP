import Vue from 'vue'
import Vuex from 'vuex'
import { createModule, extractVuexModule } from 'vuex-class-component'

Vue.use(Vuex)

const vuexModule = createModule({
  strict: false
})

class Store extends vuexModule {
  private testString = 'private string'
  get test_string () {
    return this.testString
  }
}

export default new Vuex.Store({
  ...extractVuexModule(Store).store
})
