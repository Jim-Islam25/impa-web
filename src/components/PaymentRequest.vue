<script setup lang="ts">
import { ref, computed } from 'vue'
import { site } from '@/data/site'
import { useAccess } from '@/composables/useAccess'

const props = defineProps<{ featureTitle?: string }>()
const { unlocked, until } = useAccess()

const planId = ref('')
const email = ref('')
const reference = ref('')
const sent = ref(false)

const plan = computed(() => site.plans.find((p) => p.id === planId.value))
const validEmail = computed(() => /^\S+@\S+\.\S+$/.test(email.value))
const canSend = computed(() => plan.value !== undefined && validEmail.value && reference.value.trim().length >= 4)

const submit = () => {
  if (!canSend.value || !plan.value) return

  const subject = `${site.shortName} premium payment: ${plan.value.name}`
  const body = [
    `Email: ${email.value}`,
    `Plan: ${plan.value.name} (${plan.value.price} ${plan.value.period})`,
    `Bank transfer reference: ${reference.value}`,
    props.featureTitle ? `Requested from: ${props.featureTitle}` : '',
    '',
    'I have paid. Please activate my premium access.',
  ]
    .filter((l) => l !== '')
    .join('\n')

  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  sent.value = true
}
</script>

<template>
  <div class="pay">
    <p v-if="unlocked" class="ok">Premium is active on this device<span v-if="until"> until {{ until }}</span>.</p>

    <h3>Choose a plan</h3>
    <div class="plans">
      <label v-for="p in site.plans" :key="p.id" class="plan" :class="{ on: planId === p.id }">
        <input v-model="planId" type="radio" :value="p.id" />
        <span class="pname">{{ p.name }}</span>
        <span class="price">{{ p.price }} <small>{{ p.period }}</small></span>
      </label>
    </div>

    <div v-if="plan" class="next">
      <h3>Pay by bank transfer</h3>
      <div class="bank">
        <div class="line"><span>Bank</span><strong>{{ site.bank.name }}</strong></div>
        <div class="line"><span>Account name</span><strong>{{ site.bank.accountName }}</strong></div>
        <div class="line"><span>Account number</span><strong>{{ site.bank.accountNumber }}</strong></div>
        <div class="line"><span>Amount</span><strong>{{ plan.price }}</strong></div>
      </div>

      <h3>After you pay</h3>
      <div class="grid">
        <label>
          Your email
          <input v-model="email" type="email" placeholder="you@example.com" autocomplete="email" />
        </label>
        <label>
          Transfer reference
          <input v-model="reference" type="text" placeholder="From your bank receipt" />
        </label>
      </div>

      <button class="btn" :disabled="!canSend" @click="submit">I have paid</button>

      <p v-if="sent" class="ok">
        Your email app should have opened. Press send there. We check your payment and email you an activation link.
        Open the link and premium unlocks automatically.
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pay {
  h3 {
    margin: 1.4rem 0 0.6rem;
    color: var(--accent);
  }
}

.plans {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

  &:hover {
    border-color: var(--accent);
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
}

.bank {
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  border: 1px dashed rgba(255, 196, 87, 0.6);

  .line {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 0.55rem 0;
    border-bottom: 1px solid var(--line);
    color: var(--muted);

    &:last-child {
      border-bottom: 0;
    }

    strong {
      color: #fff;
    }
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
}
</style>