<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAccess } from '@/composables/useAccess'

const route = useRoute()
const { activate, license, until } = useAccess()

const state = ref<'checking' | 'ok' | 'error'>('checking')
const message = ref('')

onMounted(async () => {
  const t = route.query.t
  const token = typeof t === 'string' ? t : ''

  if (!token) {
    state.value = 'error'
    message.value = 'This page needs an activation link from IMPA. Please open the link from your email.'
    return
  }

  const res = await activate(token)
  if (res.ok) {
    state.value = 'ok'
  } else {
    state.value = 'error'
    message.value = res.error ?? 'Activation failed.'
  }
})
</script>

<template>
  <main class="page">
    <h1 class="glow-text">Premium activation</h1>

    <section class="box glass" :class="state">
      <p v-if="state === 'checking'" class="meta">Checking your activation link...</p>

      <template v-else-if="state === 'ok'">
        <h2>Premium is now active</h2>
        <p class="meta">
          <span v-if="license">Member: <strong>{{ license.e }}</strong><br /></span>
          Active until <strong>{{ until }}</strong>. All premium sections are unlocked on this device.
        </p>
        <div class="actions">
          <RouterLink to="/phase/phase-2" class="btn">Open Phase 2</RouterLink>
          <RouterLink to="/phase/phase-3" class="btn ghost">Open Phase 3</RouterLink>
        </div>
      </template>

      <template v-else>
        <h2>Activation failed</h2>
        <p class="meta">{{ message }}</p>
        <div class="actions">
          <RouterLink to="/contact" class="btn">Contact IMPA</RouterLink>
          <RouterLink to="/" class="btn ghost">Back to Home</RouterLink>
        </div>
      </template>
    </section>
  </main>
</template>

<style scoped lang="scss">
.page {
  position: relative;
  z-index: 1;
  width: min(620px, 92vw);
  margin: 0 auto;
  padding: 3rem 0 2rem;
  text-align: center;
}

h1 {
  font-family: 'Anton', sans-serif;
  font-size: clamp(2rem, 5vw, 2.8rem);
  margin: 0 0 1.5rem;
}

.box {
  padding: 2rem 1.5rem;

  &.ok {
    border-color: #5fe0a0;
    box-shadow: 0 0 26px rgba(95, 224, 160, 0.3);
  }

  &.error {
    border-color: #ff6b6b;
    box-shadow: 0 0 26px rgba(255, 107, 107, 0.25);
  }

  h2 {
    margin: 0 0 0.8rem;
  }
}

.meta {
  color: var(--muted);
  line-height: 1.7;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 1.2rem;
}
</style>