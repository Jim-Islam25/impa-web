<script setup lang="ts">
import { ref } from 'vue'
import type { Feature } from '@/data/phases'

defineProps<{ feature: Feature }>()
const emit = defineEmits<{ close: [] }>()
const msg = ref('')
</script>

<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="modal glass">
      <button class="x" @click="emit('close')" aria-label="Close">✕</button>
      <span class="badge" :class="feature.access">{{ feature.access === 'premium' ? '🔒 Premium' : '⏳ Coming soon' }}</span>
      <h2>{{ feature.icon }} {{ feature.title }}</h2>
      <p class="desc">{{ feature.desc }}</p>

      <h3>Preview</h3>
      <ul class="prev">
        <li v-for="(p, i) in feature.preview" :key="p" :class="{ blur: i >= 2 }">{{ p }}</li>
      </ul>
      <p class="hint">Unlock premium to see the full content.</p>

      <button v-if="feature.access === 'premium'" class="btn" @click="msg = 'Payment system will be added in the next step.'">
        Unlock Premium
      </button>
      <button v-else class="btn" disabled>Coming soon</button>
      <p v-if="msg" class="msg">{{ msg }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overlay { position: fixed; inset: 0; z-index: 50; display: grid; place-items: center; background: rgba(0, 0, 0, 0.65); padding: 1rem; }
.modal { position: relative; width: min(520px, 100%); padding: 2rem; background: #0f1626; }
.x { position: absolute; top: 12px; right: 14px; background: none; border: 0; color: #fff; font-size: 1.2rem; cursor: pointer; }
h2 { margin: 0.8rem 0 0.3rem; }
h3 { margin: 1.2rem 0 0.4rem; color: var(--accent); }
.desc, .hint { color: var(--muted); }
.badge { padding: 0.2rem 0.8rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600;
  &.premium { background: rgba(255, 190, 70, 0.2); color: #ffc457; }
  &.soon { background: rgba(110, 160, 255, 0.2); color: var(--accent); } }
.prev { padding-left: 1.2rem; li { margin: 0.4rem 0; } .blur { filter: blur(5px); user-select: none; } }
.msg { color: #ffc457; margin-top: 0.8rem; }
</style>