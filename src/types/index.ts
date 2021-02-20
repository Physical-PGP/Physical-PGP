export type Direction = 'in' | 'out'

export interface Message {
  plainText: string
  cipherText: string
  direction: Direction
}

interface ECCConfig {
  algorithm: 'ECC'
  option: 'curve25519' | 'ed25519' | 'p256' | 'p384' | 'p521' | 'secp256k1' | 'brainpoolP256r1' | 'brainpoolP384r1' | 'brainpoolP512r1'
}

interface RSAConfig {
  algorithm: 'RSA'
  option: 2048 | 4096
}

export type KeyConfig = (ECCConfig | RSAConfig) & { passphrase: string }
