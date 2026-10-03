<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Quiz } from '@/data/content'

const props = defineProps<{ quiz: Quiz }>()

const i = ref(0)
const picked = ref<number | null>(null)
const score = ref(0)
const done = ref(false)

const q = computed(() => props.quiz.questions[i.value])

const choose = (n: number) => {
  if (picked.value !== null || !q.value) return
  picked.value = n
  if (n === q.value.answer) score.value++
}

const next = () => {
  if (i.value + 1 >= props.quiz.questions.length) done.value = true
  else { i.value++; picked.value = null }
}

const restart = () => { i.value = 0; picked.value = null; score.value = 0; done.value = false }
</script>

<template>
  <div class="glass box">
    <h3>{{ quiz.title }}</h3>

    <template v-if="done">
      <h2>Score: {{ score }} / {{ quiz.questions.length }}</h2>
      <button class="btn" @click="restart">Try again</button>
    </template>

    <template v-else-if="q">
      <p class="count">Question {{ i + 1 }} of {{ quiz.questions.length }}</p>
      <p class="q">{{ q.q }}</p>
      <button
        v-for="(o, n) in q.options"
        :key="o"
        class="opt"
        :class="{ right: picked !== null && n === q.answer, wrong: picked === n && n !== q.answer }"
        @click="choose(n)"
      >
        {{ o }}
      </button>
      <p v-if="picked !== null" class="explain">{{ q.explain }}</p>
      <button v-if="picked !== null" class="btn" @click="next">
        {{ i + 1 >= quiz.questions.length ? 'Finish' : 'Next' }}
      </button>
    </template>
  </div>
</template>

<style scoped lang="scss">
.box { padding: 1.5rem; }
h3 { margin-top: 0; color: var(--accent); }
.count { color: var(--muted); font-size: 0.9rem; }
.q { font-size: 1.15rem; font-weight: 600; }
.opt { display: block; width: 100%; text-align: left; margin: 0.5rem 0; padding: 0.8rem 1rem; border-radius: 8px;
  border: 1px solid var(--line); background: rgba(255, 255, 255, 0.06); color: var(--text); font: inherit; cursor: pointer;
  &:hover { border-color: var(--accent); }
  &.right { border-color: #5fe0a0; background: rgba(60, 200, 120, 0.2); }
  &.wrong { border-color: #ff6b6b; background: rgba(255, 90, 90, 0.2); } }
.explain { color: var(--muted); margin: 0.8rem 0; }
</style>