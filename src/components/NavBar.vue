<script setup lang="ts">
import { ref } from 'vue'
import { navItems } from '@/data/nav'

const open = ref(false)
const sub = ref<string | null>(null)

const toggleSub = (label: string) => {
  sub.value = sub.value === label ? null : label
}

const close = () => {
  open.value = false
  sub.value = null
}
</script>

<template>
  <header class="nav">
    <RouterLink to="/" class="logo" @click="close">
      <span class="dot"></span>IMPA
    </RouterLink>

    <button class="burger" @click="open = !open" aria-label="Menu">{{ open ? 'Close' : 'Menu' }}</button>

    <nav :class="{ open }">
      <template v-for="item in navItems" :key="item.label">
        <div v-if="item.children" class="dd" :class="{ show: sub === item.label }">
          <button class="link" type="button" @click="toggleSub(item.label)">
            {{ item.label }} <span class="caret"></span>
          </button>
          <div class="menu">
            <RouterLink v-for="c in item.children" :key="c.to" :to="c.to" @click="close">
              {{ c.label }}
            </RouterLink>
          </div>
        </div>

        <RouterLink v-else :to="item.to!" class="link" @click="close">{{ item.label }}</RouterLink>
      </template>

      <RouterLink to="/phase/phase-2" class="join" @click="close">Join IMPA</RouterLink>
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
  gap: 1rem;
  padding: 0.7rem 1.5rem;
  background: linear-gradient(180deg, rgba(27, 39, 53, 0.65), rgba(9, 10, 15, 0.4));
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
  color: #cfe0ff;
  text-shadow: 0 0 10px rgba(110, 160, 255, 0.7);
  white-space: nowrap;
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
  align-items: center;
  gap: 0.1rem;
}

.link {
  position: relative;
  padding: 0.5rem 0.65rem;
  border: 0;
  border-radius: 8px;
  background: none;
  color: var(--muted);
  font: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
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
    transform: translateX(-50%);
    transition: 0.25s;
  }

  &:hover {
    color: #fff;
    background: rgba(110, 160, 255, 0.1);
  }

  &:hover::after,
  &.router-link-exact-active::after {
    width: 60%;
  }

  &.router-link-exact-active {
    color: #fff;
  }
}

.caret {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-left: 4px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg) translateY(-2px);
}

.dd {
  position: relative;
}

.menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 210px;
  padding: 0.4rem;
  border-radius: 12px;
  background: rgba(12, 18, 32, 0.97);
  border: 1px solid rgba(110, 160, 255, 0.35);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(110, 160, 255, 0.15);

  a {
    display: block;
    padding: 0.6rem 0.8rem;
    border-radius: 8px;
    color: var(--muted);
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      color: #fff;
      background: rgba(110, 160, 255, 0.15);
    }

    &.router-link-exact-active {
      color: #fff;
      background: rgba(110, 160, 255, 0.2);
    }
  }
}

.dd:hover .menu,
.dd:focus-within .menu {
  display: block;
}

.join {
  margin-left: 0.5rem;
  padding: 0.55rem 1.2rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #ffd37a, #e69a1d);
  color: #2a1a00;
  font-size: 0.9rem;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 0 16px rgba(255, 196, 87, 0.5);
  transition: 0.2s;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
}

.burger {
  display: none;
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: none;
  color: #fff;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 1250px) {
  .burger {
    display: block;
  }

  nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0.2rem;
    max-height: calc(100dvh - 64px);
    overflow-y: auto;
    padding: 1rem;
    background: rgba(12, 18, 32, 0.97);
    border-bottom: 1px solid rgba(110, 160, 255, 0.25);

    &.open {
      display: flex;
    }
  }

  .link {
    width: 100%;
    text-align: left;
    padding: 0.8rem;
    font-size: 1rem;
  }

  .link::after {
    display: none;
  }

  .dd:hover .menu,
  .dd:focus-within .menu {
    display: none;
  }

  .dd.show .menu {
    display: block;
  }

  .menu {
    position: static;
    min-width: 0;
    margin: 0 0 0.4rem 0.8rem;
    background: transparent;
    border: 0;
    border-left: 2px solid rgba(110, 160, 255, 0.4);
    border-radius: 0;
    box-shadow: none;
  }

  .join {
    margin: 0.5rem 0 0;
    text-align: center;
  }
}
</style>