import { site } from '@/data/site'

export interface License {
  e: string // member email
  p: string // plan id
  i: number // issued at (ms)
  x: number // expires at (ms)
}

const keyAlgo = { name: 'ECDSA', namedCurve: 'P-256' } as const
const signAlgo = { name: 'ECDSA', hash: 'SHA-256' } as const

const encoder = new TextEncoder()
const decoder = new TextDecoder()

const bytes = (s: string): Uint8Array<ArrayBuffer> => new Uint8Array(encoder.encode(s))

const toB64u = (data: Uint8Array): string => {
  let s = ''
  data.forEach((b) => {
    s += String.fromCharCode(b)
  })
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const fromB64u = (str: string): Uint8Array<ArrayBuffer> => {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (str.length % 4)) % 4)
  const bin = atob(padded)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

export const publicFromPrivate = (priv: JsonWebKey): JsonWebKey => ({
  kty: priv.kty,
  crv: priv.crv,
  x: priv.x,
  y: priv.y,
})

export const generatePrivateKey = async (): Promise<JsonWebKey> => {
  const pair = await crypto.subtle.generateKey(keyAlgo, true, ['sign', 'verify'])
  return crypto.subtle.exportKey('jwk', pair.privateKey)
}

export const issueToken = async (
  priv: JsonWebKey,
  email: string,
  plan: string,
  days: number,
): Promise<{ token: string; license: License }> => {
  const now = Date.now()
  const license: License = { e: email.trim().toLowerCase(), p: plan, i: now, x: now + days * 24 * 60 * 60 * 1000 }
  const body = toB64u(bytes(JSON.stringify(license)))

  const key = await crypto.subtle.importKey('jwk', priv, keyAlgo, false, ['sign'])
  const sig = await crypto.subtle.sign(signAlgo, key, bytes(body))

  return { token: `${body}.${toB64u(new Uint8Array(sig))}`, license }
}

export const verifyToken = async (token: string): Promise<License | null> => {
  try {
    const pub = site.publicKey
    if (!pub) return null

    const [body, sig] = token.trim().split('.')
    if (!body || !sig) return null

    const key = await crypto.subtle.importKey('jwk', pub, keyAlgo, false, ['verify'])
    const ok = await crypto.subtle.verify(signAlgo, key, fromB64u(sig), bytes(body))
    if (!ok) return null

    const data = JSON.parse(decoder.decode(fromB64u(body))) as License
    if (typeof data.x !== 'number' || data.x < Date.now()) return null
    return data
  } catch {
    return null
  }
}