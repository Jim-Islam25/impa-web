<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { site } from '@/data/site'

type PaymentOption = {
  name: string
  detail?: string
}

const props = defineProps<{ featureTitle?: string }>()

const paymentOptions = computed<PaymentOption[]>(() => {
  const configured = (site as any).payments

  if (Array.isArray(configured) && configured.length) {
    return configured as PaymentOption[]
  }

  const bankDetails = Array.isArray((site as any).bankDetails) ? (site as any).bankDetails : []

  if (bankDetails.length) {
    return bankDetails.map((entry: any) => ({
      name: entry.label || 'Bank transfer',
      detail: entry.value || '',
    }))
  }

  return [{ name: 'Bank transfer', detail: 'Please send payment and keep the transaction ID.' }]
})

const form = reactive({
  name: '',
  email: '',
  plan: site.plans[0]?.id ?? '',
  method: paymentOptions.value[0]?.name ?? '',
  txn: '',
  note: '',
})

const sent = ref(false)

const plan = computed(() => site.plans.find((p) => p.id === form.plan))
const method = computed(() => paymentOptions.value.find((p) => p.name === form.method))

const validEmail = computed(() => /^\S+@\S+\.\S+$/.test(form.email))
const canSend = computed(() => form.name.trim().length > 1 && validEmail.value && form.txn.trim().length >= 4)

const submit = () => {
  if (!canSend.value) return

  const subject = `${site.shortName} premium access request: ${form.name}`
  const body = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Plan: ${plan.value?.name} (${plan.value?.price} ${plan.value?.period})`,
    `Payment method: ${form.method}`,
    `Transaction ID: ${form.txn}`,
    props.featureTitle ? `Requested from: ${props.featureTitle}` : '',
    form.note ? `Note: ${form.note}` : '',
    '',
    'Please send me my premium access code.',
  ]
    .filter((l) => l !== '')
    .join('\n')

  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  sent.value = true
}
</script>

<template>
  <div class="access">
    <h3>Step 1: Choose a plan</h3>
    <div class="plans">
      <label v-for="p in site.plans" :key="p.id" class="plan" :class="{ on: form.plan === p.id }">
        <input v-model="form.plan" type="radio" :value="p.id" />
        <span class="pname">{{ p.name }}</span>
        <span class="price">{{ p.price }} <small>{{ p.period }}</small></span>
        <ul>
          <li v-for="k in p.perks" :key="k">{{ k }}</li>
        </ul>
      </label>
    </div>

    <h3>Step 2: Make the payment</h3>
    <div class="methods">
      <button
        v-for="m in paymentOptions"
        :key="m.name"
        type="button"
        class="chip"
        :class="{ on: form.method === m.name }"
        @click="form.method = m.name"
      >
        {{ m.name }}
      </button>
    </div>
    <p v-if="method" class="pay">
      <strong>{{ method.name }}:</strong> {{ method.detail }}<br />
      Amount: <strong>{{ plan?.price }}</strong>. Keep the transaction ID, you need it in the next step.
    </p>

    <h3>Step 3: Send your request</h3>
    <div class="grid">
      <label>
        Full name
        <input v-model="form.name" type="text" placeholder="Your name" autocomplete="name" />
      </label>
      <label>
        Email (we send your code here)
        <input v-model="form.email" type="email" placeholder="you@example.com" autocomplete="email" />
      </label>
      <label>
        Transaction ID
        <input v-model="form.txn" type="text" placeholder="e.g. 8N7A6D5E4C" />
      </label>
      <label>
        Note (optional)
        <input v-model="form.note" type="text" placeholder="Anything we should know" />
      </label>
    </div>

    <button class="btn" :disabled="!canSend" @click="submit">Send access request</button>

    <p v-if="sent" class="ok">
      Your email app should have opened. Press send there. If it did not open, email your name, plan and transaction ID to
      <a :href="`mailto:${site.email}`">{{ site.email }}</a>.
      After we confirm your payment, we send your access code by email.
    </p>
  </div>
</template>

<style scoped lang="scss">
.access {
  h3 {
    margin: 1.4rem 0 0.6rem;
    color: var(--accent);
  }
}

.plans {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.9rem;
}

.plan {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1.1rem;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;
  transition: 0.2s;

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  &.on {
    border-color: #ffc457;
    background: rgba(255, 190, 70, 0.1);
    box-shadow: 0 0 18px rgba(255, 196, 87, 0.25);
  }

  .pname {
    font-weight: 800;
    font-size: 1.05rem;
  }

  .price {
    font-size: 1.4rem;
    font-weight: 800;
    color: #ffc457;

    small {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--muted);
    }
  }

  ul {
    margin: 0.4rem 0 0;
    padding-left: 1.1rem;
    color: var(--muted);
    font-size: 0.88rem;
    line-height: 1.6;
  }
}

.methods {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.chip {
  padding: 0.5rem 1.1rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: none;
  color: var(--text);
  font: inherit;
  font-weight: 600;
  cursor: pointer;

  &.on {
    border-color: var(--accent);
    background: rgba(110, 160, 255, 0.18);
  }
}

.pay {
  margin: 0.8rem 0 0;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  border: 1px dashed rgba(255, 196, 87, 0.6);
  color: var(--muted);
  line-height: 1.7;

  strong {
    color: #fff;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
  margin-bottom: 1.2rem;
}

label:not(.plan) {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 600;
}

input[type='text'],
input[type='email'] {
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
    box-shadow: 0 0 10px rgba(110, 160, 255, 0.4);
  }
}

.ok {
  margin: 1rem 0 0;
  color: #5fe0a0;
  line-height: 1.6;

  a {
    color: #5fe0a0;
  }
}
</style>