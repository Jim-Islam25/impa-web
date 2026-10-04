import { ref, computed } from 'vue'
import { site } from '@/data/site'
import { verifyToken, type License } from '@/lib/license'

const KEY = 'impa-license'
const license = ref<License | null>(null)

const read = (): string | null => {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

const ready: Promise<void> = (async () => {
  const token = read()
  if (!token) return
  const found = await verifyToken(token)
  if (found) {
    license.value = found
  } else {
    try {
      localStorage.removeItem(KEY)
    } catch {
      /* storage not available */
    }
  }
})()

const activate = async (token: string): Promise<{ ok: boolean; error?: string }> => {
  if (!site.publicKey) return { ok: false, error: 'Premium activation is not configured yet. Please contact us.' }

  const found = await verifyToken(token)
  if (!found) return { ok: false, error: 'This activation link is not valid or has expired. Please contact us.' }

  license.value = found
  try {
    localStorage.setItem(KEY, token.trim())
  } catch {
    /* storage not available */
  }
  return { ok: true }
}

const lock = () => {
  license.value = null
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* storage not available */
  }
}

const unlocked = computed(() => license.value !== null && license.value.x > Date.now())
const until = computed(() => (license.value ? new Date(license.value.x).toLocaleDateString() : null))

export function useAccess() {
  return { unlocked, license, until, activate, lock, ready }
}