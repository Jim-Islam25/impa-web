<script setup lang="ts">
import { computed, ref } from 'vue'
import { phases, type Feature } from '@/data/phases'
import PreviewModal from '@/components/PreviewModal.vue'

const props = defineProps<{ slug: string }>()
const phase = computed(() => phases.find((p) => p.slug === props.slug))
const selected = ref<Feature | null>(null)

const label = (f: Feature) => (f.access === 'free' ? 'Free' : f.access === 'premium' ? 'Premium' : 'Coming soon')
</script>

<template>
  <main class="page" v-if="phase">
    <span class="tag glow-chip">{{ phase.tag }}</span>
    <h1 class="glow-text">{{ phase.title }}</h1>
    <p class="sub">{{ phase.subtitle }}</p>

    <div class="grid">
      <template v-for="f in phase.features" :key="f.key">
        <RouterLink v-if="f.access === 'free'" :to="`/phase/${phase.slug}/${f.key}`" class="card glass free">
          <span class="badge free">{{ label(f) }}</span>
          <h3>{{ f.icon }} {{ f.title }}</h3>
          <p>{{ f.desc }}</p>
          <span class="go">Open →</span>
        </RouterLink>

        <button v-else class="card glass locked" :class="f.access" @click="selected = f">
          <span class="lock">{{ f.access === 'premium' ? '🔒' : '⏳' }}</span>
          <span class="badge" :class="f.access">{{ label(f) }}</span>
          <h3>{{ f.icon }} {{ f.title }}</h3>
          <p>{{ f.desc }}</p>
          <span class="go">Preview →</span>
        </button>
      </template>
    </div>

    <PreviewModal v-if="selected" :feature="selected" @close="selected = null" />
  </main>

  <main class="page" v-else>
    <h1>Page not found</h1>
    <RouterLink to="/">Back to Home</RouterLink>
  </main>
</template>

<style scoped lang="scss">
.page { position: relative; z-index: 1; width: min(1100px, 92vw); margin: 0 auto; padding: 3rem 0 2rem; text-align: center; }
h1 { font-family: 'Anton', sans-serif; font-size: clamp(2rem, 5vw, 3.2rem); margin: 0.8rem 0 0.3rem; }
.sub { color: var(--muted); }
.tag { display: inline-block; padding: 0.3rem 1rem; border-radius: 999px; border: 1px solid rgba(110, 160, 255, 0.5); background: var(--card); color: #cfe0ff; font-size: 0.85rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.2rem; margin-top: 2rem; }

.card { position: relative; overflow: hidden; display: block; text-align: left; padding: 1.5rem; color: var(--text); text-decoration: none; font: inherit; cursor: pointer; transition: 0.25s;
  &:hover { transform: translateY(-4px); }
  h3 { margin: 0.8rem 0 0.4rem; }
  p { margin: 0 0 1rem; color: var(--muted); line-height: 1.5; } }

.card.free { border-color: rgba(95, 224, 160, 0.4);
  &:hover { border-color: #5fe0a0; box-shadow: 0 0 22px rgba(95, 224, 160, 0.3); } }

/* Premium: gold border + shimmer */
.card.premium { border: 1px solid rgba(255, 196, 87, 0.65); box-shadow: 0 0 18px rgba(255, 196, 87, 0.18), inset 0 0 20px rgba(255, 196, 87, 0.06);
  &:hover { box-shadow: 0 0 28px rgba(255, 196, 87, 0.45), inset 0 0 24px rgba(255, 196, 87, 0.1); border-color: #ffd37a; }
  &::after {
    content: '';
    position: absolute;
    top: 0; left: -80%;
    width: 50%; height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255, 215, 130, 0.22), transparent);
    transform: skewX(-20deg);
    animation: shimmer 3.5s ease-in-out infinite;
    pointer-events: none;
  } }

/* Coming soon: blue dashed */
.card.soon { border: 1px dashed rgba(110, 160, 255, 0.6);
  &:hover { box-shadow: 0 0 22px rgba(110, 160, 255, 0.3); } }

.lock { position: absolute; top: 14px; right: 16px; font-size: 1.3rem; filter: drop-shadow(0 0 6px rgba(255, 196, 87, 0.8)); }

.go { color: var(--accent); font-weight: 600; }
.card.premium .go { color: #ffc457; }

.badge { font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.7rem; border-radius: 999px;
  &.free { background: rgba(60, 200, 120, 0.2); color: #5fe0a0; }
  &.premium { background: rgba(255, 190, 70, 0.2); color: #ffc457; }
  &.soon { background: rgba(110, 160, 255, 0.2); color: var(--accent); } }

@keyframes shimmer {
  0% { left: -80%; }
  60%, 100% { left: 140%; }
}
</style>