import Vue from 'vue'
import Vuex from 'vuex'
import { action, createModule, createProxy, extractVuexModule } from 'vuex-class-component'
import * as openpgp from 'openpgp'
import type { KeyConfig } from '@/types'
import { break_armor, forge_armor, change_key_armor } from '@/tools'

type Key = openpgp.key.Key

Vue.use(Vuex)

const vuexModule = createModule({
  namespaced: 'store',
  strict: false
})

class Store extends vuexModule {
  public localPubKey = ''
  public localPriKey = ''
  public remotePubKey = ''
  public rawLocalPubKey!: Array<Key>
  public rawLocalPriKey!: Array<Key>
  public rawRemotePubKey!: Array<Key>
  public rawKeysCalculated = false
  private _keyConfig: KeyConfig = {
    algorithm: 'ECC',
    option: 'ed25519',
    passphrase: ''
  }

  get setupCompleted (): boolean {
    return !!this.localPubKey && !!this.localPriKey && !!this.remotePubKey
  }

  @action async calculate_raw_keys (): Promise<void> {
    this.rawLocalPubKey = (await openpgp.key.readArmored(this.localPubKey)).keys
    this.rawLocalPriKey = (await openpgp.key.readArmored(this.localPriKey)).keys
    this.rawRemotePubKey = (await openpgp.key.readArmored(this.remotePubKey)).keys
    this.rawKeysCalculated = true
  }

  @action public async gen_keypair (): Promise<void> {
    const newKeyPair = await openpgp.generateKey({
      userIds: [{}],
      passphrase: this._keyConfig.passphrase,
      curve: this._keyConfig.algorithm === 'ECC' ? this._keyConfig.option : undefined,
      numBits: this._keyConfig.algorithm === 'RSA' ? this._keyConfig.option : undefined
    })
    this.localPubKey = change_key_armor(newKeyPair.publicKeyArmored)
    this.localPriKey = newKeyPair.privateKeyArmored
  }

  @action async encrypt (msg: string): Promise<string> {
    if (!this.rawKeysCalculated) {
      this.calculate_raw_keys()
    }
    const options: openpgp.EncryptOptions = {
      message: openpgp.message.fromText(msg),
      publicKeys: this.rawRemotePubKey, // remote public key for encryption
      privateKeys: this.rawLocalPriKey // local private key for signinig
    }
    const cipherArmored = (await openpgp.encrypt(options)).data
    const cipherNaked = break_armor(cipherArmored)
    console.log(cipherNaked)
    return cipherNaked
  }

  @action async decrypt (cipherNaked: string): Promise<string> {
    if (!this.rawKeysCalculated) {
      this.calculate_raw_keys()
    }

    const cipherArmored = forge_armor(cipherNaked, 'message')
    const options: openpgp.DecryptOptions = {
      message: await openpgp.message.readArmored(cipherArmored),
      publicKeys: this.rawRemotePubKey, // remote public key for verification
      privateKeys: this.rawLocalPriKey // local private key for decryption
    }
    return (await openpgp.decrypt(options)).data
  }
}

const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(Store)
  }
})

export const storeProxy = createProxy(store, Store)
export default store
