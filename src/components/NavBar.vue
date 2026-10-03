<script setup lang="ts">
import { ref } from 'vue'
import { phases } from '@/data/phases'

const open = ref(false)
</script>

<template>
  <header class="nav">
    <RouterLink to="/" class="logo">
      <span class="dot"></span>IMPA
    </RouterLink>

    <button class="burger" @click="open = !open" aria-label="Menu">{{ open ? '✕' : '☰' }}</button>

    <nav :class="{ open }" @click="open = false">
      <RouterLink to="/" class="link">Home</RouterLink>
      <RouterLink v-for="p in phases" :key="p.slug" :to="`/phase/${p.slug}`" class="link">
        {{ p.tag.split(' —')[0] }}
      </RouterLink>
      <RouterLink to="/simulator" class="sim">⚡ Simulator</RouterLink>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.nav {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 2rem;
  background: linear-gradient(180deg, rgba(27, 39, 53, 0.55), rgba(9, 10, 15, 0.25));
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border-bottom: 1px solid rgba(110, 160, 255, 0.25);
  box-shadow: 0 6px 30px rgba(60, 100, 255, 0.12);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Anton', sans-serif;
  font-size: 1.7rem;
  letter-spacing: 3px;
  text-decoration: none;
  background: linear-gradient(90deg, #ffffff, #6ea0ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 8px rgba(110, 160, 255, 0.6));
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #6ea0ff;
  box-shadow: 0 0 12px 3px rgba(110, 160, 255, 0.9);
}

nav {
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.link {
  position: relative;
  padding: 0.5rem 0.9rem;
  color: var(--muted);
  text-decoration: none;
  font-weight: 600;
  border-radius: 8px;
  transition: 0.2s;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 2px;
    width: 0;
    height: 2px;
    background: var(--accent);
    box-shadow: 0 0 8px var(--accent);
    transition: 0.25s;
    transform: translateX(-50%);
  }
  &:hover { color: #fff; background: rgba(110, 160, 255, 0.1); }
  &:hover::after,
  &.router-link-exact-active::after { width: 60%; }
  &.router-link-exact-active { color: #fff; }
}

.sim {
  margin-left: 0.6rem;
  padding: 0.5rem 1.1rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #6ea0ff, #3d6bff);
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 0 16px rgba(110, 160, 255, 0.55);
  transition: 0.2s;
  &:hover { filter: brightness(1.15); transform: translateY(-1px); }
}

.burger {
  display: none;
  background: none;
  border: 0;
  color: #fff;
  font-size: 1.6rem;
  cursor: pointer;
}

@media (max-width: 900px) {
  .nav { padding: 0.8rem 1rem; }
  .burger { display: block; }
  nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    padding: 1rem;
    background: rgba(12, 18, 32, 0.95);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(110, 160, 255, 0.25);
    &.open { display: flex; }
  }
  .sim { margin: 0.4rem 0 0; text-align: center; }
}
</style>