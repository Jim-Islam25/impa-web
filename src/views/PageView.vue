<script setup lang="ts">
import { computed } from 'vue'
import { pages } from '@/data/pages'
import ContactForm from '@/components/ContactForm.vue'

const props = defineProps<{ pageKey: string }>()
const page = computed(() => pages.find((p) => p.key === props.pageKey))
</script>

<template>
  <main class="page" v-if="page">
    <span class="tag glow-chip">IMPA</span>
    <h1 class="glow-text">{{ page.title }}</h1>
    <p class="sub">{{ page.subtitle }}</p>

    <div class="sections">
      <section v-for="s in page.sections" :key="s.heading" class="sec glass">
        <h2>{{ s.heading }}</h2>
        <p v-if="s.text">{{ s.text }}</p>

        <ul v-if="s.items" class="list">
          <li v-for="i in s.items" :key="i">{{ i }}</li>
        </ul>

        <div v-if="s.cards" class="cards">
          <template v-for="c in s.cards" :key="c.title">
            <RouterLink v-if="c.to" :to="c.to" class="mini link">
              <span v-if="c.tag" class="mtag">{{ c.tag }}</span>
              <h3>{{ c.title }}</h3>
              <p>{{ c.text }}</p>
            </RouterLink>
            <div v-else class="mini">
              <span v-if="c.tag" class="mtag">{{ c.tag }}</span>
              <h3>{{ c.title }}</h3>
              <p>{{ c.text }}</p>
            </div>
          </template>
        </div>

        <div v-if="s.table" class="scroll">
          <table>
            <thead>
              <tr>
                <th v-for="h in s.table.head" :key="h">{{ h }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, ri) in s.table.rows" :key="ri">
                <td v-for="(cell, ci) in r" :key="ci">{{ cell }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ul v-if="s.links" class="links">
          <li v-for="l in s.links" :key="l.label">
            <a v-if="l.href" :href="l.href" target="_blank" rel="noopener">{{ l.label }}</a>
            <RouterLink v-else-if="l.to" :to="l.to">{{ l.label }}</RouterLink>
            <span v-if="l.note" class="note"> - {{ l.note }}</span>
          </li>
        </ul>
      </section>
    </div>

    <ContactForm v-if="page.kind" :mode="page.kind" />

    <RouterLink v-if="page.cta" :to="page.cta.to" class="btn cta">{{ page.cta.label }} →</RouterLink>
  </main>

  <main class="page" v-else>
    <h1>Page not found</h1>
    <RouterLink to="/" class="btn">Back to Home</RouterLink>
  </main>
</template>

<style scoped lang="scss">
.page {
  position: relative;
  z-index: 1;
  width: min(900px, 92vw);
  margin: 0 auto;
  padding: 3rem 0 2rem;
  text-align: center;
}

h1 {
  font-family: 'Anton', sans-serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  margin: 0.8rem 0 0.4rem;
}

.sub {
  color: var(--muted);
  font-size: 1.1rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(110, 160, 255, 0.5);
  background: var(--card);
  color: #cfe0ff;
  font-size: 0.85rem;
}

.sections {
  display: grid;
  gap: 1rem;
  margin: 2rem 0 1.5rem;
}

.sec {
  padding: 1.5rem;
  text-align: left;

  h2 {
    margin: 0 0 0.7rem;
    font-size: 1.3rem;
    color: #cfe0ff;
  }

  > p {
    margin: 0;
    color: var(--muted);
    line-height: 1.7;
  }
}

.list {
  margin: 0;
  padding-left: 1.2rem;
  color: var(--muted);
  line-height: 1.8;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 0.9rem;
}

.mini {
  display: block;
  padding: 1.1rem;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.04);
  text-decoration: none;
  color: var(--text);

  h3 {
    margin: 0.5rem 0 0.4rem;
    font-size: 1.05rem;
  }

  p {
    margin: 0;
    color: var(--muted);
    font-size: 0.92rem;
    line-height: 1.55;
  }

  &.link {
    transition: 0.25s;

    &:hover {
      transform: translateY(-4px);
      border-color: var(--accent);
      box-shadow: 0 0 18px rgba(110, 160, 255, 0.3);
    }
  }
}

.mtag {
  display: inline-block;
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  background: rgba(110, 160, 255, 0.2);
  color: #8db4ff;
  font-size: 0.72rem;
  font-weight: 700;
}

.scroll {
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 520px;
  border-collapse: collapse;

  th,
  td {
    padding: 0.7rem;
    text-align: left;
    border-bottom: 1px solid var(--line);
    color: var(--muted);
    font-size: 0.92rem;
  }

  th {
    color: var(--accent);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  td:first-child {
    color: var(--text);
    font-weight: 600;
  }
}

.links {
  margin: 0;
  padding-left: 1.2rem;
  line-height: 2;
  color: var(--muted);

  a {
    color: var(--accent);
    font-weight: 600;
  }
}

.note {
  color: var(--muted);
  font-size: 0.9rem;
}

.cta {
  margin-top: 1.5rem;
}
</style>