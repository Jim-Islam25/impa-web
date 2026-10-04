<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { machines, scenarios, deviation, isPass, tolText, type Scenario, type Param } from '@/data/simulator'

const machine = ref<(typeof machines)[number]>(machines[0])
const scenario = ref<Scenario>(scenarios[0]!)
const decision = ref<'PASS' | 'FAIL' | ''>('')
const reasoning = ref('')
const submitted = ref(false)

const pick = (avoidId?: string) => {
  const list = scenarios.filter((s) => s.machine === machine.value && s.id !== avoidId)
  const next = list[Math.floor(Math.random() * list.length)]
  if (next) scenario.value = next
  decision.value = ''
  reasoning.value = ''
  submitted.value = false
}

watch(machine, () => pick())
pick()

const correct = computed<'PASS' | 'FAIL'>(() => (scenario.value.params.every(isPass) ? 'PASS' : 'FAIL'))
const isCorrect = computed(() => decision.value === correct.value)
const failed = computed(() => scenario.value.params.filter((p) => !isPass(p)))
const canSubmit = computed(() => decision.value !== '' && reasoning.value.trim().length >= 10)

const fmt = (p: Param) => `${p.measured}${p.unit ? ' ' + p.unit : ''}`
const devText = (p: Param) => `${deviation(p)}${p.mode === 'relative' ? '%' : ' ' + (p.unit || '%')}`

// Bar: centre = nominal, green zone = +/- tolerance (middle 50%), edges = +/- 2x tolerance
const pos = (p: Param) => {
  const v = 50 + (deviation(p) / (2 * p.tolerance)) * 50
  return Math.min(98, Math.max(2, v))
}
</script>

<template>
  <main class="page">
    <h1 class="glow-text">Clinical Medical Physics Simulator</h1>
    <p class="sub">Review the measurements, decide PASS or FAIL, and justify your decision.</p>

    <div class="machines">
      <button
        v-for="m in machines"
        :key="m"
        class="machine glass"
        :class="{ on: machine === m }"
        @click="machine = m"
      >
        {{ m }}
      </button>
      <button class="btn ghost" @click="pick(scenario.id)">New case</button>
    </div>

    <section class="glass panel">
      <div class="head">
        <h2>{{ scenario.title }}</h2>
        <span class="live"><i></i> Simulated readout</span>
      </div>

      <div class="scroll">
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Measured</th>
              <th>Tolerance</th>
              <template v-if="submitted">
                <th>Deviation</th>
                <th class="barcol">Tolerance bar</th>
                <th>Result</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in scenario.params" :key="p.name">
              <td>{{ p.name }}</td>
              <td class="val">{{ fmt(p) }}</td>
              <td>{{ tolText(p) }}</td>
              <template v-if="submitted">
                <td>{{ devText(p) }}</td>
                <td class="barcol">
                  <div class="bar">
                    <div class="zone"></div>
                    <div class="centre"></div>
                    <div class="mark" :class="isPass(p) ? 'ok' : 'bad'" :style="{ left: pos(p) + '%' }"></div>
                  </div>
                </td>
                <td><span class="res" :class="isPass(p) ? 'ok' : 'bad'">{{ isPass(p) ? 'PASS' : 'FAIL' }}</span></td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="glass panel">
      <h3>Your decision</h3>
      <div class="radios">
        <label class="pass" :class="{ on: decision === 'PASS' }">
          <input type="radio" value="PASS" v-model="decision" :disabled="submitted" /> PASS
        </label>
        <label class="fail" :class="{ on: decision === 'FAIL' }">
          <input type="radio" value="FAIL" v-model="decision" :disabled="submitted" /> FAIL
        </label>
      </div>

      <h3>Clinical justification</h3>
      <textarea v-model="reasoning" :disabled="submitted" rows="4" placeholder="Explain your reasoning (at least 10 characters)..." />

      <button class="btn" :disabled="!canSubmit || submitted" @click="submitted = true">Submit answer</button>
    </section>

    <section v-if="submitted" class="glass panel feedback" :class="isCorrect ? 'good' : 'wrong'">
      <div class="verdict">
        <span class="big">{{ isCorrect ? 'Correct' : 'Incorrect' }}</span>
        <span class="chip" :class="correct === 'PASS' ? 'ok' : 'bad'">Correct decision: {{ correct }}</span>
      </div>

      <p v-if="correct === 'PASS'">All parameters are within their tolerance limits, so the machine can be used clinically.</p>
      <template v-else>
        <p>The following parameters are out of tolerance:</p>
        <ul>
          <li v-for="p in failed" :key="p.name">
            <strong>{{ p.name }}</strong>: deviation {{ devText(p) }}, tolerance {{ tolText(p) }}.
          </li>
        </ul>
        <p>The machine must not be used clinically until the issue is investigated, corrected and re-verified.</p>
      </template>

      <button class="btn" @click="pick(scenario.id)">Next case →</button>
    </section>
  </main>
</template>

<style scoped lang="scss">
.page { position: relative; z-index: 1; width: min(900px, 92vw); margin: 0 auto; padding: 2.5rem 0 2rem; }
h1 { font-family: 'Anton', sans-serif; text-align: center; font-size: clamp(1.8rem, 4vw, 2.8rem); margin-bottom: 0.3rem; }
.sub { text-align: center; color: var(--muted); margin-bottom: 1.5rem; }

.machines { display: flex; gap: 0.8rem; flex-wrap: wrap; justify-content: center; align-items: center; }
.machine { padding: 0.8rem 1.3rem; color: var(--text); font: inherit; font-weight: 600; cursor: pointer; transition: 0.25s;
  &:hover { border-color: var(--accent); }
  &.on { border-color: #00e5ff; background: rgba(0, 229, 255, 0.12); box-shadow: 0 0 20px rgba(0, 229, 255, 0.35); } }

.panel { margin-top: 1.2rem; padding: 1.5rem; h3 { margin: 0 0 0.6rem; color: var(--accent); } h2 { margin: 0; } }
.head { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; }
.live { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: #5fe0a0;
  i { width: 8px; height: 8px; border-radius: 50%; background: #5fe0a0; box-shadow: 0 0 10px #5fe0a0; animation: blink 1.4s infinite; } }

.scroll { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; min-width: 480px;
  th, td { padding: 0.8rem 0.7rem; text-align: left; border-bottom: 1px solid var(--line); }
  th { color: var(--accent); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; } }
.val { font-weight: 700; font-size: 1.05rem; font-variant-numeric: tabular-nums; }
.barcol { min-width: 170px; }

.bar { position: relative; height: 10px; border-radius: 999px; background: rgba(255, 90, 90, 0.28);
  .zone { position: absolute; top: 0; bottom: 0; left: 25%; width: 50%; background: rgba(95, 224, 160, 0.45); }
  .centre { position: absolute; top: -3px; bottom: -3px; left: 50%; width: 1px; background: rgba(255, 255, 255, 0.6); }
  .mark { position: absolute; top: 50%; width: 16px; height: 16px; border-radius: 50%; transform: translate(-50%, -50%); border: 2px solid #fff;
    &.ok { background: #5fe0a0; box-shadow: 0 0 12px #5fe0a0; }
    &.bad { background: #ff6b6b; box-shadow: 0 0 12px #ff6b6b; } } }

.res { padding: 0.2rem 0.7rem; border-radius: 6px; font-weight: 800; font-size: 0.85rem;
  &.ok { color: #5fe0a0; background: rgba(60, 200, 120, 0.18); text-shadow: 0 0 8px rgba(95, 224, 160, 0.8); }
  &.bad { color: #ff6b6b; background: rgba(255, 90, 90, 0.18); text-shadow: 0 0 8px rgba(255, 107, 107, 0.8); } }

.radios { display: flex; gap: 1rem; margin-bottom: 1.2rem; flex-wrap: wrap;
  label { display: flex; align-items: center; gap: 0.5rem; padding: 0.8rem 1.8rem; border-radius: 10px; border: 1px solid var(--line); font-weight: 700; cursor: pointer; transition: 0.2s; color: var(--text);
    input { accent-color: var(--accent); }
    &.pass.on { border-color: #5fe0a0; background: rgba(60, 200, 120, 0.18); box-shadow: 0 0 18px rgba(95, 224, 160, 0.45); }
    &.fail.on { border-color: #ff6b6b; background: rgba(255, 90, 90, 0.18); box-shadow: 0 0 18px rgba(255, 107, 107, 0.45); } } }

textarea { width: 100%; box-sizing: border-box; margin-bottom: 1rem; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--line); background: #0d1119; color: #fff; font: inherit; resize: vertical; }

.feedback { &.good { border-color: #5fe0a0; box-shadow: 0 0 30px rgba(95, 224, 160, 0.35); }
  &.wrong { border-color: #ff6b6b; box-shadow: 0 0 30px rgba(255, 107, 107, 0.35); }
  p, li { color: var(--muted); line-height: 1.6; } }
.verdict { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.8rem; }
.big { font-family: 'Anton', sans-serif; font-size: 2rem; letter-spacing: 1px; }
.good .big { color: #5fe0a0; text-shadow: 0 0 14px rgba(95, 224, 160, 0.9); }
.wrong .big { color: #ff6b6b; text-shadow: 0 0 14px rgba(255, 107, 107, 0.9); }
.chip { padding: 0.3rem 0.9rem; border-radius: 999px; font-weight: 700; font-size: 0.85rem;
  &.ok { background: rgba(60, 200, 120, 0.2); color: #5fe0a0; }
  &.bad { background: rgba(255, 90, 90, 0.2); color: #ff6b6b; } }

@keyframes blink { 50% { opacity: 0.25; } }
</style>