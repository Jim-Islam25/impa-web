<script setup lang="ts">
import { computed, ref } from 'vue'
import { phases } from '@/data/phases'
import { courses, lectures, notes, quizzes, type Lecture } from '@/data/content'
import { useAccess } from '@/composables/useAccess'
import QuizPlayer from '@/components/QuizPlayer.vue'
import CalcPractice from '@/components/CalcPractice.vue'
import UnlockPanel from '@/components/UnlockPanel.vue'
import PremiumFeature from '@/components/PremiumFeature.vue'

const props = defineProps<{ slug: string; feature: string }>()
const { unlocked } = useAccess()

const phase = computed(() => phases.find((p) => p.slug === props.slug))
const feat = computed(() => phase.value?.features.find((f) => f.key === props.feature))

const openCourse = ref<string | null>(null)
const lecture = ref<Lecture | undefined>(lectures[0])
const quiz = ref(quizzes[0])
</script>

<template>
  <main class="page" v-if="phase && feat">
    <RouterLink :to="`/phase/${phase.slug}`" class="back">Back to {{ phase.title }}</RouterLink>
    <h1>{{ feat.title }}</h1>
    <p class="sub">{{ feat.desc }}</p>

    <!-- Free content -->
    <template v-if="feat.access === 'free'">
      <section v-if="feat.key === 'courses'" class="stack">
        <article v-for="c in courses" :key="c.id" class="glass box">
          <span class="pill">{{ c.level }}</span>
          <h3>{{ c.title }}</h3>
          <p>{{ c.desc }}</p>
          <button class="btn ghost" @click="openCourse = openCourse === c.id ? null : c.id">
            {{ openCourse === c.id ? 'Hide lessons' : `View ${c.lessons.length} lessons` }}
          </button>
          <ol v-if="openCourse === c.id">
            <li v-for="l in c.lessons" :key="l.title">{{ l.title }} <small>({{ l.minutes }} min)</small></li>
          </ol>
        </article>
      </section>

      <section v-else-if="feat.key === 'lectures'" class="lec">
        <div class="glass player">
          <video v-if="lecture?.src" :src="lecture.src" controls />
          <div v-else class="ph">Video will appear here</div>
          <h3>{{ lecture?.title }}</h3>
          <p>{{ lecture?.topic }} · {{ lecture?.duration }}</p>
        </div>
        <div class="glass side">
          <button v-for="l in lectures" :key="l.id" class="item" :class="{ on: lecture?.id === l.id }" @click="lecture = l">
            {{ l.title }}<small>{{ l.duration }}</small>
          </button>
        </div>
      </section>

      <section v-else-if="feat.key === 'notes'" class="stack">
        <article v-for="n in notes" :key="n.id" class="glass box row">
          <div>
            <h3>{{ n.title }}</h3>
            <p>{{ n.pages }} pages · PDF</p>
          </div>
          <a class="btn" :href="n.file" download>Download</a>
        </article>
      </section>

      <section v-else-if="feat.key === 'quizzes'" class="stack">
        <div class="tabs">
          <button v-for="q in quizzes" :key="q.id" class="btn" :class="{ ghost: quiz?.id !== q.id }" @click="quiz = q">{{ q.title }}</button>
        </div>
        <QuizPlayer v-if="quiz" :key="quiz.id" :quiz="quiz" />
      </section>

      <CalcPractice v-else-if="feat.key === 'calculations'" />
    </template>

    <!-- Premium (locked) and coming soon -->
    <UnlockPanel v-else-if="feat.access === 'soon' || !unlocked" :feature="feat" />

    <!-- Premium (unlocked) -->
    <PremiumFeature v-else :feat-key="feat.key" />
  </main>

  <main class="page" v-else>
    <h1>Page not found</h1>
    <RouterLink to="/">Back to Home</RouterLink>
  </main>
</template>

<style scoped lang="scss">
.page { position: relative; z-index: 1; width: min(1000px, 92vw); margin: 0 auto; padding: 2.5rem 0 4rem; }
h1 { font-family: 'Anton', sans-serif; font-size: clamp(1.8rem, 4vw, 2.8rem); margin: 0.6rem 0 0.3rem; }
.sub { color: var(--muted); margin-bottom: 1.5rem; }
.back { color: var(--accent); text-decoration: none; font-weight: 600; }
.stack { display: grid; gap: 1rem; }
.box { padding: 1.4rem; h3 { margin: 0.5rem 0 0.3rem; } p { color: var(--muted); margin: 0 0 0.8rem; } ol { margin-top: 1rem; li { margin: 0.4rem 0; } small { color: var(--muted); } } }
.row { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; p { margin: 0; } }
.pill { padding: 0.2rem 0.8rem; border-radius: 999px; background: rgba(110, 160, 255, 0.2); color: var(--accent); font-size: 0.8rem; }
.tabs { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.lec { display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; @media (max-width: 800px) { grid-template-columns: 1fr; } }
.player { padding: 1rem; video, .ph { width: 100%; aspect-ratio: 16/9; border-radius: 8px; background: #05070c; display: grid; place-items: center; color: var(--muted); } p { color: var(--muted); } }
.side { padding: 0.6rem; display: flex; flex-direction: column; gap: 0.4rem; }
.item { display: flex; justify-content: space-between; gap: 0.5rem; text-align: left; padding: 0.8rem; border-radius: 8px; border: 1px solid transparent; background: transparent; color: var(--text); font: inherit; cursor: pointer;
  small { color: var(--muted); }
  &:hover { background: rgba(255, 255, 255, 0.07); }
  &.on { border-color: var(--accent); background: rgba(110, 160, 255, 0.15); } }
</style>