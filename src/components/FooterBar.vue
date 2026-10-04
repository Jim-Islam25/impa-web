<script setup lang="ts">
import { phases } from '@/data/phases'
import { site } from '@/data/site'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="inner">
      <div class="brand">
        <RouterLink to="/" class="logo"><span class="dot"></span>IMPA</RouterLink>
        <p>Global hub for medical physics education and clinical simulation.</p>
      </div>

      <div class="col">
        <h4>Learn</h4>
        <RouterLink v-for="p in phases" :key="p.slug" :to="`/phase/${p.slug}`">
          {{ p.tag.split(' —')[0] }}: {{ p.title }}
        </RouterLink>
      </div>

      <div class="col">
        <h4>Explore</h4>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/simulator">Clinical Simulator</RouterLink>
        <RouterLink to="/phase/phase-1/quizzes">Free Quizzes</RouterLink>
        <RouterLink to="/phase/phase-1/calculations">Calculation Practice</RouterLink>
      </div>

      <div class="col">
        <h4>Contact</h4>
<a :href="`mailto:${site.email}`">{{ site.email }}</a>        <span class="muted">Social links coming soon</span>
      </div>
    </div>

    <div class="bottom">© {{ year }} IMPA. All rights reserved.</div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin-top: 3rem;
  background: linear-gradient(180deg, rgba(9, 10, 15, 0.2), rgba(9, 10, 15, 0.85));
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(110, 160, 255, 0.3);
  box-shadow: 0 -6px 30px rgba(60, 100, 255, 0.1);
}
.inner {
  width: min(1100px, 92vw);
  margin: 0 auto;
  padding: 2.5rem 0 1.5rem;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 2rem;
}
.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Anton', sans-serif;
  font-size: 1.6rem;
  letter-spacing: 3px;
  text-decoration: none;
  color: #fff;
  text-shadow: 0 0 12px rgba(110, 160, 255, 0.9);
}
.dot { width: 10px; height: 10px; border-radius: 50%; background: #6ea0ff; box-shadow: 0 0 12px 3px rgba(110, 160, 255, 0.9); }
.brand p { color: var(--muted); max-width: 280px; line-height: 1.5; }
.col { display: flex; flex-direction: column; gap: 0.5rem; }
h4 { margin: 0 0 0.4rem; color: var(--accent); text-shadow: 0 0 8px rgba(110, 160, 255, 0.6); }
.col a { color: var(--muted); text-decoration: none; transition: 0.2s; &:hover { color: #fff; text-shadow: 0 0 8px rgba(110, 160, 255, 0.9); } }
.muted { color: var(--muted); opacity: 0.7; font-size: 0.9rem; }
.bottom { text-align: center; padding: 1rem; color: var(--muted); font-size: 0.85rem; border-top: 1px solid var(--line); }

@media (max-width: 800px) {
  .inner { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 520px) {
  .inner { grid-template-columns: 1fr; }
}
</style>