<script setup lang="ts">
import { computed } from 'vue'
import type { Feature } from '@/data/phases'
import { site } from '@/data/site'
import PaymentRequest from '@/components/PaymentRequest.vue'

const props = defineProps<{ feature: Feature }>()

const notifyLink = computed(
  () => `mailto:${site.email}?subject=${encodeURIComponent(`${site.shortName} notify me: ${props.feature.title}`)}`,
)
</script>

<template>
  <section class="panel glass" :class="feature.access">
    <span class="badge" :class="feature.access">{{ feature.access === 'premium' ? 'Premium' : 'Coming soon' }}</span>
    <h2>{{ feature.title }}</h2>
    <p class="desc">{{ feature.desc }}</p>

    <h3>What is included</h3>
    <ul class="prev">
      <li v-for="(p, i) in feature.preview" :key="p" :class="{ blur: feature.access === 'premium' && i >= 2 }">{{ p }}</li>
    </ul>

    <template v-if="feature.access === 'premium'">
      <div class="get">
        <h2 class="gt">Unlock premium</h2>
        <p class="desc">Pick a plan, pay by bank transfer, and all premium sections unlock on your device.</p>
        <PaymentRequest :feature-title="feature.title" />
      </div>
    </template>

    <template v-else>
      <p class="desc">This feature is under development. Tell us and we will email you when it opens.</p>
      <a class="btn" :href="notifyLink">Notify me</a>
    </template>
  </section>
</template>

<style scoped lang="scss">
.panel {
  padding: 1.8rem;
  text-align: left;

  &.premium {
    border-color: rgba(255, 196, 87, 0.55);
    box-shadow: 0 0 22px rgba(255, 196, 87, 0.15);
  }

  &.soon {
    border: 1px dashed rgba(110, 160, 255, 0.6);
  }

  h2 {
    margin: 0.8rem 0 0.3rem;
  }

  h3 {
    margin: 1.4rem 0 0.5rem;
    color: var(--accent);
  }
}

.desc {
  color: var(--muted);
  line-height: 1.6;
}

.badge {
  padding: 0.2rem 0.8rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;

  &.premium {
    background: rgba(255, 190, 70, 0.2);
    color: #ffc457;
  }

  &.soon {
    background: rgba(110, 160, 255, 0.2);
    color: var(--accent);
  }
}

.prev {
  padding-left: 1.2rem;
  color: var(--text);

  li {
    margin: 0.4rem 0;
  }

  .blur {
    filter: blur(5px);
    user-select: none;
  }
}

.get {
  margin-top: 1.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--line);

  .gt {
    color: #ffc457;
  }
}
</style>