<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { slides } from '@/data/slides'

const DURATION = 6000

const current = ref(0)
const paused = ref(false)
const total = slides.length
let timer: number | undefined

const trackStyle = computed(() => ({ transform: `translateX(-${current.value * 100}%)` }))

const stop = () => {
  window.clearInterval(timer)
  timer = undefined
}
const start = () => {
  stop()
  timer = window.setInterval(() => {
    current.value = (current.value + 1) % total
  }, DURATION)
}
const restart = () => {
  if (!paused.value) start()
}

const go = (i: number) => {
  current.value = (i + total) % total
  restart()
}
const next = () => go(current.value + 1)
const prev = () => go(current.value - 1)

const pause = () => {
  paused.value = true
  stop()
}
const resume = () => {
  paused.value = false
  start()
}

onMounted(start)
onBeforeUnmount(stop)
</script>

<template>
  <section class="slider moving-border" @mouseenter="pause" @mouseleave="resume">
    <div class="viewport">
      <div class="track" :style="trackStyle">
        <article v-for="s in slides" :key="s.id" class="slide">
          <span class="tag" :class="s.tone">{{ s.tag }}</span>
          <h2 class="glow-text">{{ s.title }}</h2>
          <p class="text">{{ s.text }}</p>

          <ul>
            <li v-for="item in s.items" :key="item">{{ item }}</li>
          </ul>

          <RouterLink :to="s.to" class="btn">{{ s.cta }} →</RouterLink>
        </article>
      </div>
    </div>

    <button class="arrow left" @click="prev" aria-label="Previous slide">‹</button>
    <button class="arrow right" @click="next" aria-label="Next slide">›</button>

    <div class="footer">
      <div class="dots">
        <button
          v-for="(s, i) in slides"
          :key="s.id"
          :class="{ active: i === current }"
          @click="go(i)"
          :aria-label="`Slide ${i + 1}`"
        />
      </div>
      <div class="progress">
        <div :key="current" class="fill" :class="{ paused }" :style="{ animationDuration: DURATION + 'ms' }"></div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.slider {
  width: min(1000px, 92vw);
  margin: 2.5rem auto;
  border-radius: 20px;
}

.viewport {
  overflow: hidden;
  border-radius: 18px;
}

.track {
  display: flex;
  transition: transform 0.7s cubic-bezier(0.22, 0.8, 0.3, 1);
}

.slide {
  flex: 0 0 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.8rem 4rem 2rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.9rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  border: 1px solid currentColor;

  &.free    { color: #5fe0a0; background: rgba(60, 200, 120, 0.12); }
  &.premium { color: #ffc457; background: rgba(255, 190, 70, 0.12); }
  &.soon    { color: #8db4ff; background: rgba(110, 160, 255, 0.12); }
  &.sim     { color: #4deeff; background: rgba(0, 229, 255, 0.12); }
}

h2 {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.6rem, 3.6vw, 2.5rem);
  letter-spacing: 1px;
  margin: 0.8rem 0 0.5rem;
  line-height: 1.2;
}

.text {
  color: var(--muted);
  font-size: 1.05rem;
  margin: 0 0 1rem;
  max-width: 640px;
}

ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding: 0;
  margin: 0 0 1.4rem;

  li {
    padding: 0.35rem 0.9rem;
    border-radius: 8px;
    font-size: 0.9rem;
    color: var(--text);
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.06);
  }
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: rgba(14, 20, 34, 0.85);
  color: #fff;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  transition: 0.2s;

  &.left  { left: 10px; }
  &.right { right: 10px; }
  &:hover { border-color: var(--accent); box-shadow: 0 0 14px rgba(110, 160, 255, 0.6); }
}

.footer { padding: 0 3.5rem 1.4rem; }

.dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 0.8rem;

  button {
    width: 10px;
    height: 10px;
    border: 0;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: 0.3s;

    &.active { width: 28px; background: var(--accent); box-shadow: 0 0 10px rgba(110, 160, 255, 0.8); }
  }
}

.progress {
  height: 3px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;

  .fill {
    height: 100%;
    width: 0;
    background: linear-gradient(90deg, #3d6bff, #00e5ff);
    animation: fillBar linear forwards;
    &.paused { animation-play-state: paused; }
  }
}

@keyframes fillBar { to { width: 100%; } }

@media (max-width: 760px) {
  .slide { padding: 2rem 1.4rem 1.5rem; }
  .arrow { display: none; }
  .footer { padding: 0 1.4rem 1.2rem; }
}
</style>