<script setup lang="ts">
import { ref, computed } from 'vue'
import { site } from '@/data/site'
import { generatePrivateKey, publicFromPrivate, issueToken } from '@/lib/license'

interface LogItem {
  email: string
  plan: string
  until: string
  issued: string
}

const KEY = 'impa-signing-key'
const LOG = 'impa-issued-log'

const loadKey = (): JsonWebKey | null => {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as JsonWebKey) : null
  } catch {
    return null
  }
}

const loadLog = (): LogItem[] => {
  try {
    const raw = localStorage.getItem(LOG)
    return raw ? (JSON.parse(raw) as LogItem[]) : []
  } catch {
    return []
  }
}

const priv = ref<JsonWebKey | null>(loadKey())
const log = ref<LogItem[]>(loadLog())

const email = ref('')
const planId = ref(site.plans[0]?.id ?? '')
const days = ref(site.plans[0]?.days ?? 30)
const link = ref('')
const message = ref('')
const error = ref('')
const importText = ref('')
const showPrivate = ref(false)

const publicJson = computed(() => (priv.value ? JSON.stringify(publicFromPrivate(priv.value), null, 2) : ''))
const privateJson = computed(() => (priv.value ? JSON.stringify(priv.value) : ''))

const matches = computed(() => {
  const pub = site.publicKey
  const p = priv.value
  return Boolean(pub && p && pub.x === p.x && pub.y === p.y)
})

const validEmail = computed(() => /^\S+@\S+\.\S+$/.test(email.value))
const canIssue = computed(() => priv.value !== null && validEmail.value && days.value > 0)

const onPlan = () => {
  const p = site.plans.find((x) => x.id === planId.value)
  if (p) days.value = p.days
}

const saveKey = (k: JsonWebKey) => {
  priv.value = k
  try {
    localStorage.setItem(KEY, JSON.stringify(k))
  } catch {
    error.value = 'Could not save the key in this browser.'
  }
}

const create = async () => {
  error.value = ''
  message.value = ''
  try {
    saveKey(await generatePrivateKey())
    message.value = 'Signing key created. Copy the public key below into src/data/site.ts and publish the site.'
  } catch {
    error.value = 'Key creation failed. Open this page over https or on localhost.'
  }
}

const importKey = () => {
  error.value = ''
  message.value = ''
  try {
    const k = JSON.parse(importText.value) as JsonWebKey
    if (!k.d || !k.x || !k.y) throw new Error('bad key')
    saveKey(k)
    importText.value = ''
    message.value = 'Signing key imported.'
  } catch {
    error.value = 'That is not a valid signing key.'
  }
}

const issue = async () => {
  if (!priv.value || !canIssue.value) return
  error.value = ''
  message.value = ''
  try {
    const { token, license } = await issueToken(priv.value, email.value, planId.value, days.value)
    link.value = `${window.location.origin}${import.meta.env.BASE_URL}#/activate?t=${token}`

    log.value = [
      { email: license.e, plan: planId.value, until: new Date(license.x).toLocaleDateString(), issued: new Date(license.i).toLocaleString() },
      ...log.value,
    ].slice(0, 50)
    try {
      localStorage.setItem(LOG, JSON.stringify(log.value))
    } catch {
      /* ignore */
    }
  } catch {
    error.value = 'Could not create the link. Check your signing key.'
  }
}

const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    message.value = 'Copied.'
  } catch {
    message.value = 'Copy failed. Select the text and copy it manually.'
  }
}

const mailToMember = computed(() => {
  const subject = `Your ${site.shortName} premium access`
  const body = [
    'Hello,',
    '',
    'Thank you for your payment. Your premium access is ready.',
    'Open this link on the device you want to use. Premium unlocks automatically:',
    '',
    link.value,
    '',
    `Access lasts ${days.value} days from today.`,
    '',
    site.fullName,
  ].join('\n')
  return `mailto:${email.value}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})
</script>

<template>
  <main class="page">
    <h1 class="glow-text">Issue premium access</h1>
    <p class="sub">For IMPA administrators. Create an activation link after you confirm a bank payment.</p>

    <p v-if="error" class="err">{{ error }}</p>
    <p v-if="message" class="ok">{{ message }}</p>

    <section class="box glass">
      <h2>Step 1: Signing key</h2>

      <template v-if="!priv">
        <p class="meta">
          No signing key found in this browser. Create one once, or import your saved key. Always use the same browser and
          the same website address (the live site) to issue links.
        </p>
        <button class="btn" @click="create">Create signing key</button>

        <h3>Or import a saved key</h3>
        <textarea v-model="importText" rows="3" placeholder="Paste your saved private key here"></textarea>
        <button class="btn ghost" :disabled="!importText.trim()" @click="importKey">Import key</button>
      </template>

      <template v-else>
        <p class="status" :class="matches ? 'good' : 'warn'">
          {{ matches ? 'The site is set up correctly with this key.' : 'The site does not know this key yet. Do the setup below.' }}
        </p>

        <div v-if="!matches">
          <p class="meta">
            Open <strong>src/data/site.ts</strong>, replace <strong>publicKey: null as JsonWebKey | null</strong> with the
            public key below, then commit and push. Wait until the site is published, then continue.
          </p>
          <pre>publicKey: {{ publicJson }} as JsonWebKey | null,</pre>
          <button class="btn ghost" @click="copy(publicJson)">Copy public key</button>
        </div>

        <h3>Backup (keep it secret)</h3>
        <p class="meta">
          Save the private key in a safe place, such as a password manager. If you lose it, you must create a new key and
          members must be activated again. Never share it or post it online.
        </p>
        <button class="btn ghost" @click="showPrivate = !showPrivate">{{ showPrivate ? 'Hide private key' : 'Show private key' }}</button>
        <textarea v-if="showPrivate" :value="privateJson" rows="4" readonly></textarea>
      </template>
    </section>

    <section v-if="priv" class="box glass">
      <h2>Step 2: Create an activation link</h2>
      <div class="grid">
        <label>
          Member email
          <input v-model="email" type="email" placeholder="member@example.com" />
        </label>
        <label>
          Plan
          <select v-model="planId" @change="onPlan">
            <option v-for="p in site.plans" :key="p.id" :value="p.id">{{ p.name }} ({{ p.price }})</option>
          </select>
        </label>
        <label>
          Access days
          <input v-model.number="days" type="number" min="1" />
        </label>
      </div>

      <button class="btn" :disabled="!canIssue" @click="issue">Create link</button>

      <div v-if="link" class="result">
        <h3>Activation link</h3>
        <textarea :value="link" rows="4" readonly></textarea>
        <div class="actions">
          <button class="btn ghost" @click="copy(link)">Copy link</button>
          <a class="btn" :href="mailToMember">Email it to the member</a>
        </div>
        <p class="meta">Send this link only to the member who paid. They open it once and premium unlocks on their device.</p>
      </div>
    </section>

    <section v-if="log.length" class="box glass">
      <h2>Recently issued (this browser)</h2>
      <div v-for="(l, i) in log" :key="i" class="item">
        <span>{{ l.email }} · {{ l.plan }}</span>
        <span class="meta">until {{ l.until }} · issued {{ l.issued }}</span>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.page {
  position: relative;
  z-index: 1;
  width: min(820px, 92vw);
  margin: 0 auto;
  padding: 3rem 0 2rem;
}

h1 {
  font-family: 'Anton', sans-serif;
  text-align: center;
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0 0 0.4rem;
}

.sub {
  text-align: center;
  color: var(--muted);
}

.err {
  text-align: center;
  color: #ff6b6b;
}

.ok {
  text-align: center;
  color: #5fe0a0;
}

.box {
  margin-top: 1rem;
  padding: 1.5rem;
  text-align: left;

  h2 {
    margin: 0 0 0.8rem;
    font-size: 1.2rem;
    color: #cfe0ff;
  }

  h3 {
    margin: 1.2rem 0 0.5rem;
    color: var(--accent);
  }
}

.meta {
  color: var(--muted);
  line-height: 1.6;
}

.status {
  margin: 0 0 0.8rem;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  font-weight: 600;

  &.good {
    border: 1px solid #5fe0a0;
    color: #5fe0a0;
  }

  &.warn {
    border: 1px dashed #ffc457;
    color: #ffd98f;
  }
}

pre {
  margin: 0.6rem 0 0.8rem;
  padding: 0.9rem;
  border-radius: 8px;
  background: #05070c;
  color: #cfe0ff;
  font-size: 0.8rem;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1rem;
  margin-bottom: 1.2rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 600;
}

input,
select,
textarea {
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: #0d1119;
  color: #fff;
  font: inherit;
  font-weight: 400;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }
}

textarea {
  width: 100%;
  box-sizing: border-box;
  margin: 0.6rem 0;
  font-size: 0.8rem;
  word-break: break-all;
  resize: vertical;
}

.result {
  margin-top: 1.2rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--line);
}

.actions {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  margin-bottom: 0.8rem;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.6rem 0;
  border-top: 1px solid var(--line);
  font-size: 0.92rem;
}
</style>