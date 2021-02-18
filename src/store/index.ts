import Vue from 'vue'
import Vuex from 'vuex'
import { action, createModule, createProxy, extractVuexModule } from 'vuex-class-component'
import * as openpgp from 'openpgp'

interface ECCConfig {
  algorithm: 'ECC'
  option: 'curve25519' | 'ed25519' | 'p256' | 'p384' | 'p521' | 'secp256k1' | 'brainpoolP256r1' | 'brainpoolP384r1' | 'brainpoolP512r1'
}

interface RSAConfig {
  algorithm: 'RSA'
  option: 2048 | 4096
}

type KeyConfig = (ECCConfig | RSAConfig) & {passphrase: string}

Vue.use(Vuex)

const vuexModule = createModule({
  strict: false
})

class Store extends vuexModule {
  public localPubKey = ''
  public localPriKey = ''
  public remotePubKey = ''
  private _keyConfig: KeyConfig = {
    algorithm: 'ECC',
    option: 'ed25519',
    passphrase: ''
  }

  @action public async gen_keypair () {
    const newKeyPair = await openpgp.generateKey({
      userIds: [{}],
      passphrase: this._keyConfig.passphrase,
      curve: this._keyConfig.algorithm === 'ECC' ? this._keyConfig.option : undefined,
      numBits: this._keyConfig.algorithm === 'RSA' ? this._keyConfig.option : undefined
    })
    this.localPubKey = newKeyPair.publicKeyArmored
    this.localPriKey = newKeyPair.privateKeyArmored
  }
}

const store = new Vuex.Store({
  ...extractVuexModule(Store).store
})

export const storeProxy = createProxy(store, Store)
export default store
export type { KeyConfig }
