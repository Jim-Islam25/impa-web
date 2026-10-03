<script setup lang="ts">
import { reactive } from 'vue'
import { calcProblems } from '@/data/content'

const inputs = reactive<Record<number, string>>({})
const result = reactive<Record<number, boolean>>({})
const shown = reactive<Record<number, boolean>>({})

const check = (i: number) => {
  const p = calcProblems[i]
  const v = parseFloat(inputs[i] ?? '')
  if (!p || Number.isNaN(v)) return
  result[i] = Math.abs(v - p.answer) / p.answer <= 0.01
  shown[i] = true
}
</script>

<template>
  <div class="list">
    <div v-for="(p, i) in calcProblems" :key="p.q" class="glass item">
      <p class="q"><strong>{{ i + 1 }}.</strong> {{ p.q }}</p>
      <div class="row">
        <input v-model="inputs[i]" type="number" step="any" placeholder="Your answer" />
        <span>{{ p.unit }}</span>
        <button class="btn" @click="check(i)">Check</button>
      </div>
      <template v-if="shown[i]">
        <p :class="result[i] ? 'ok' : 'bad'">{{ result[i] ? '✔ Correct' : '✘ Not correct' }}</p>
        <p class="sol">Solution: {{ p.solution }}</p>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list { display: grid; gap: 1rem; }
.item { padding: 1.3rem; }
.q { margin-top: 0; }
.row { display: flex; gap: 0.7rem; align-items: center; flex-wrap: wrap; }
input { padding: 0.7rem; border-radius: 8px; border: 1px solid var(--line); background: #0d1119; color: #fff; font: inherit; width: 180px; }
.ok { color: #5fe0a0; font-weight: 700; }
.bad { color: #ff6b6b; font-weight: 700; }
.sol { color: var(--muted); }
</style>