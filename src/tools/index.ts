export function base64_encode (str: string): string {
  return Buffer.from(str).toString('base64')
}

export function base64_decode (base64: string): string {
  return Buffer.from(base64, 'base64').toString()
}

export function break_armor (armoredText: string): string {
  const msgCut = armoredText.split('\r\n').slice(4, -2)
  const tail = msgCut[msgCut.length - 1]
  return msgCut.slice(0, -1).join('') + '\n' + tail
}

export function forge_armor (rawText: string, type: 'message' | 'key'): string {
  // no need to operate on secret key until import implemented
  const pubKeyHeader = '-----BEGIN PGP PUBLIC KEY BLOCK-----\n\n'
  const pubKeyEnd = '\n-----END PGP PUBLIC KEY BLOCK-----'
  const MsgHeader = '-----BEGIN PGP MESSAGE-----\n\n'
  const MsgEnd = '\n-----END PGP MESSAGE-----'

  const [mainText, tail] = rawText.split('\n')
  const sliceLen = 60
  const n = Math.ceil(mainText.length / sliceLen)
  let result = (type === 'key') ? pubKeyHeader : MsgHeader
  for (let i = 0; i < n; ++i) {
    result += mainText.slice(i * sliceLen, (i + 1) * sliceLen) + '\n'
  }
  result += tail + ((type === 'key') ? pubKeyEnd : MsgEnd)
  return result
}

export function change_key_armor (keyArmored: string): string {
  return forge_armor(break_armor(keyArmored), 'key')
}
