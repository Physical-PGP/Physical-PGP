export type Direction = 'in' | 'out'

export interface Message {
  plainText: string
  cipherText: string
  direction: Direction
}
