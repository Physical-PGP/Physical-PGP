export function base64_encode (str: string): string {
  return Buffer.from(str).toString('base64')
}

export function base64_decode (base64: string): string {
  return Buffer.from(base64, 'base64').toString()
}
