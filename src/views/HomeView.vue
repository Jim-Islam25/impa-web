<script setup lang="ts">
import HeroSlider from '@/components/HeroSlider.vue'
import { phases } from '@/data/phases'
import { site } from '@/data/site'
import { useAccess } from '@/composables/useAccess'

const { unlocked } = useAccess()

const tone = (i: number) => (i === 0 ? 'free' : i === 3 ? 'soon' : 'premium')
const stateText = (i: number) => (i === 0 ? 'Free' : i === 3 ? 'Coming soon' : 'Premium')
const clean = (s: string) => s.replace(/^(Premium|Coming soon) — /, '')

const explore = [
  { title: 'About IMPA', text: 'Our mission, vision and team.', to: '/about', access: 'open' },
  { title: 'Courses', text: 'Structured medical physics curriculum.', to: '/phase/phase-1/courses', access: 'free' },
  { title: 'Free Learning', text: 'Lectures, notes, quizzes and calculations.', to: '/phase/phase-1', access: 'free' },
  { title: 'Clinical Cases', text: 'Real patient cases and troubleshooting.', to: '/phase/phase-2/cases', access: 'premium' },
  { title: 'Question Bank', text: 'Board-exam style practice questions.', to: '/phase/phase-2/qbank', access: 'premium' },
  { title: 'Resources', text: 'Cheat sheets, formulas and tools.', to: '/resources', access: 'free' },
  { title: 'Exams', text: 'Mock exams with score reports.', to: '/phase/phase-2/mock', access: 'premium' },
  { title: 'Faculty', text: 'Mentors and global medical physicists.', to: '/phase/phase-3/faculty', access: 'premium' },
  { title: 'Certificates', text: 'Verified digital certificates.', to: '/phase/phase-2/certs', access: 'premium' },
  { title: 'Contact', text: 'Questions, partnerships or feedback.', to: '/contact', access: 'open' },
]

const badge = (a: string) => (a === 'free' ? 'Free' : a === 'premium' ? (unlocked.value ? 'Unlocked' : 'Premium') : 'Open')
const cls = (a: string) => (a === 'premium' && unlocked.value ? 'free' : a)

const preview = [
  { name: 'Output', value: '1.01', tol: '±2%' },
  { name: 'Energy', value: '10.2 MV', tol: '±2%' },
  { name: 'Symmetry', value: '1.3%', tol: '±2%' },
  { name: 'Flatness', value: '2.1%', tol: '±3%' },
]
</script>

<template>
  <div class="home">
    <section class="hero">
      <span class="eyebrow glow-chip moving-border">Medical Physics • Learn • Practice • Simulate</span>
      <h1>
        <span class="glow-text">Global Hub for Medical Physics</span><br />
        <span class="glow-grad">Education &amp; Clinical Simulation</span>
      </h1>
      <div class="actions">
        <RouterLink to="/phase/phase-1" class="btn">Explore Free Courses</RouterLink>
        <RouterLink to="/simulator" class="btn ghost">Try Simulator</RouterLink>
      </div>
    </section>

    <HeroSlider />

    <!-- About -->
    <section class="block">
      <div class="about moving-border">
        <span class="kicker">About IMPA</span>
        <h2 class="glow-text">{{ site.fullName }}</h2>
        <p>
          {{ site.shortName }} is a global hub for medical physics education. Start with free courses, prepare with
          clinical cases and mock exams, and practise real QA decisions in our clinical simulator.
        </p>
        <RouterLink to="/about" class="btn ghost">Read more about IMPA →</RouterLink>
      </div>
    </section>

    <!-- Explore -->
    <section class="block">
      <span class="kicker">Everything in one place</span>
      <h2 class="glow-text">Explore IMPA</h2>

      <div class="explore">
        <RouterLink v-for="e in explore" :key="e.to" :to="e.to" class="tile" :class="cls(e.access)">
          <h3>{{ e.title }}</h3>
          <p>{{ e.text }}</p>
          <span class="badge" :class="cls(e.access)">{{ badge(e.access) }}</span>
        </RouterLink>
      </div>
    </section>

    <!-- Journey -->
    <section class="block">
      <span class="kicker">Step by step</span>
      <h2 class="glow-text">Your 4-Step Learning Journey</h2>

      <div class="steps">
        <div v-for="(p, i) in phases" :key="p.slug" class="step">
          <div class="marker">
            <span class="num" :class="tone(i)">{{ i + 1 }}</span>
          </div>

          <div class="frame" :class="tone(i)">
            <RouterLink :to="`/phase/${p.slug}`" class="card" :class="tone(i)">
              <div class="top">
                <span class="state" :class="tone(i)">{{ stateText(i) }}</span>
              </div>
              <h3>{{ p.title }}</h3>
              <p>{{ clean(p.subtitle) }}</p>
              <ul>
                <li v-for="f in p.features.slice(0, 4)" :key="f.key">{{ f.title }}</li>
              </ul>
              <span class="go">{{ i === 0 ? 'Start learning' : i === 3 ? 'See preview' : 'Preview and unlock' }} →</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator teaser -->
    <section class="block sim">
      <div class="teaser moving-border">
        <div class="left">
          <span class="kicker cyan">Special feature</span>
          <h2 class="glow-text">IMPA Clinical Medical Physics Simulator</h2>
          <p>Get simulated QA measurements, decide PASS or FAIL, and justify your clinical reasoning.</p>
          <RouterLink to="/simulator" class="btn">Launch Simulator →</RouterLink>
        </div>

        <div class="right">
          <div class="mini">
            <div class="mini-head">
              <span>LINAC QA</span>
              <span class="live"><i></i> Simulated</span>
            </div>
            <div v-for="r in preview" :key="r.name" class="row">
              <span>{{ r.name }}</span>
              <strong>{{ r.value }}</strong>
              <em>{{ r.tol }}</em>
            </div>
            <div class="decide">
              <span class="p">PASS</span>
              <span class="f">FAIL</span>
              <small>Your call?</small>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="block">
      <div class="contact glass">
        <h2 class="glow-text">Have a question?</h2>
        <p>Partnerships, feedback or support, we would love to hear from you.</p>
        <div class="actions">
          <RouterLink to="/contact" class="btn">Contact IMPA</RouterLink>
          <RouterLink to="/join" class="btn ghost">Join IMPA</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.home { position: relative; z-index: 1; padding-bottom: 2rem; }

.hero { text-align: center; padding: 4rem 1rem 1rem;
  h1 { font-family: 'Anton', sans-serif; font-size: clamp(2rem, 5vw, 3.6rem); letter-spacing: 1px; margin: 0.8rem 0 1.5rem; line-height: 1.25; } }

.eyebrow { display: inline-block; padding: 0.4rem 1.2rem; border-radius: 999px; color: #cfe0ff; font-size: 0.8rem; letter-spacing: 1px; }
.actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

.block { width: min(1100px, 92vw); margin: 4rem auto 0; text-align: center;
  h2 { font-family: 'Anton', sans-serif; font-size: 2rem; letter-spacing: 1px; margin: 0.6rem 0 0; } }

.kicker { display: inline-block; padding: 0.2rem 0.9rem; border-radius: 999px; font-size: 0.78rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
  color: #8db4ff; background: rgba(110, 160, 255, 0.12); border: 1px solid rgba(110, 160, 255, 0.4);
  &.cyan { color: #4deeff; background: rgba(0, 229, 255, 0.1); border-color: rgba(0, 229, 255, 0.45); } }

/* About (moving border) */
.about { padding: 2.5rem 1.5rem; border-radius: 20px;
  p { max-width: 720px; margin: 1rem auto 1.5rem; color: var(--muted); line-height: 1.7; font-size: 1.05rem; } }

/* Explore tiles */
.explore { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 1rem; margin-top: 2rem; }
.tile { display: flex; flex-direction: column; align-items: flex-start; text-align: left; padding: 1.3rem; border-radius: 14px; text-decoration: none; color: var(--text);
  background: var(--card); border: 1px solid var(--line); transition: 0.25s;
  h3 { margin: 0 0 0.3rem; font-size: 1.05rem; }
  p { margin: 0 0 0.9rem; color: var(--muted); font-size: 0.88rem; line-height: 1.45; }
  .badge { margin-top: auto; font-size: 0.7rem; font-weight: 700; padding: 0.15rem 0.6rem; border-radius: 999px;
    &.free { background: rgba(60, 200, 120, 0.2); color: #5fe0a0; }
    &.premium { background: rgba(255, 190, 70, 0.2); color: #ffc457; }
    &.open { background: rgba(110, 160, 255, 0.2); color: #8db4ff; } }
  &:hover { transform: translateY(-5px); border-color: var(--accent); box-shadow: 0 0 22px rgba(110, 160, 255, 0.3); }
  &.free { border-color: rgba(95, 224, 160, 0.4); &:hover { border-color: #5fe0a0; box-shadow: 0 0 22px rgba(95, 224, 160, 0.3); } }
  &.premium { border-color: rgba(255, 196, 87, 0.55); &:hover { border-color: #ffd37a; box-shadow: 0 0 24px rgba(255, 196, 87, 0.4); } } }

/* Journey */
.steps { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 2.5rem; padding: 0.5rem 0 1.5rem; }
.step { display: flex; flex-direction: column; padding: 0 0.6rem; }

.marker { position: relative; display: flex; justify-content: center; margin-bottom: 1.1rem;
  &::before { content: ''; position: absolute; top: 50%; left: -0.6rem; right: -0.6rem; height: 3px; transform: translateY(-50%); border-radius: 3px;
    background: linear-gradient(90deg, #3d6bff, #00e5ff, #3d6bff); background-size: 200% 100%; box-shadow: 0 0 10px rgba(0, 229, 255, 0.6); animation: flow 3s linear infinite; } }
.step:first-child .marker::before { left: 50%; }
.step:last-child .marker::before { right: 50%; }

.num { position: relative; z-index: 1; display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; color: #fff; font-weight: 800; font-size: 1.1rem;
  background: linear-gradient(135deg, #6ea0ff, #3d6bff); box-shadow: 0 0 0 4px rgba(9, 10, 15, 0.9), 0 0 16px rgba(110, 160, 255, 0.8);
  &.free { background: linear-gradient(135deg, #5fe0a0, #1fa56a); box-shadow: 0 0 0 4px rgba(9, 10, 15, 0.9), 0 0 16px rgba(95, 224, 160, 0.8); }
  &.premium { background: linear-gradient(135deg, #ffd37a, #e69a1d); color: #2a1a00; box-shadow: 0 0 0 4px rgba(9, 10, 15, 0.9), 0 0 16px rgba(255, 196, 87, 0.8); } }

.frame { --c1: #3d6bff; --c2: #00e5ff; --c3: #ffffff; --c4: #a56bff;
  position: relative; isolation: isolate; flex: 1; padding: 2px; border-radius: 16px;
  background: conic-gradient(from var(--angle), var(--c1), var(--c2), var(--c3), var(--c4), var(--c1)); animation: borderSpin 4s linear infinite; transition: transform 0.25s;
  &::before { content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
    background: conic-gradient(from var(--angle), var(--c1), var(--c2), var(--c3), var(--c4), var(--c1)); filter: blur(12px); opacity: 0.5; transition: opacity 0.25s; }
  &:hover { transform: translateY(-6px); }
  &:hover::before { opacity: 0.85; }
  &.free { --c1: #1fa56a; --c2: #5fe0a0; --c3: #ffffff; --c4: #00e5ff; }
  &.premium { --c1: #e69a1d; --c2: #ffd37a; --c3: #ffffff; --c4: #ff8a3d; }
  &.soon { --c1: #3d6bff; --c2: #8db4ff; --c3: #ffffff; --c4: #a56bff; } }

.card { position: relative; overflow: hidden; display: flex; flex-direction: column; height: 100%; box-sizing: border-box; text-align: left; padding: 1.3rem;
  border-radius: 14px; text-decoration: none; color: var(--text); background: #0e1422;
  h3 { margin: 0.9rem 0 0.35rem; font-size: 1.1rem; }
  p { color: var(--muted); margin: 0 0 0.9rem; line-height: 1.5; font-size: 0.92rem; }
  &.premium::after { content: ''; position: absolute; top: 0; left: -80%; width: 50%; height: 100%; pointer-events: none;
    background: linear-gradient(120deg, transparent, rgba(255, 215, 130, 0.18), transparent); transform: skewX(-20deg); animation: shimmer 4s ease-in-out infinite; } }

.top { display: flex; justify-content: flex-start; align-items: center; }
.state { font-size: 0.72rem; font-weight: 700; padding: 0.2rem 0.7rem; border-radius: 999px;
  &.free { background: rgba(60, 200, 120, 0.2); color: #5fe0a0; }
  &.premium { background: rgba(255, 190, 70, 0.2); color: #ffc457; }
  &.soon { background: rgba(110, 160, 255, 0.2); color: #8db4ff; } }

ul { list-style: none; display: flex; flex-wrap: wrap; gap: 0.4rem; padding: 0; margin: 0 0 1rem;
  li { padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.75rem; color: var(--text); border: 1px solid var(--line); background: rgba(255, 255, 255, 0.05); } }

.go { margin-top: auto; font-weight: 700; font-size: 0.9rem; color: var(--accent); }
.card.premium .go { color: #ffc457; }
.card.free .go { color: #5fe0a0; }

/* Simulator teaser */
.sim { margin-top: 4rem; }
.teaser { display: grid; grid-template-columns: 1.1fr 1fr; gap: 2rem; align-items: center; padding: 2.5rem; border-radius: 20px; text-align: left;
  .left h2 { font-size: clamp(1.6rem, 3.4vw, 2.3rem); line-height: 1.2; margin: 0.9rem 0 0.8rem; }
  .left p { color: var(--muted); font-size: 1.05rem; margin: 0 0 1.5rem; line-height: 1.6; } }

.mini { padding: 1.1rem 1.2rem; border-radius: 14px; background: rgba(5, 8, 16, 0.75); border: 1px solid rgba(0, 229, 255, 0.35); box-shadow: 0 0 24px rgba(0, 229, 255, 0.15); }
.mini-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; font-weight: 700; color: #4deeff; font-size: 0.9rem; }
.live { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; color: #5fe0a0; font-weight: 600;
  i { width: 7px; height: 7px; border-radius: 50%; background: #5fe0a0; box-shadow: 0 0 8px #5fe0a0; animation: blink 1.4s infinite; } }
.row { display: grid; grid-template-columns: 1fr auto 56px; gap: 0.8rem; padding: 0.55rem 0; border-bottom: 1px solid var(--line); font-size: 0.92rem;
  strong { font-variant-numeric: tabular-nums; }
  em { font-style: normal; color: var(--muted); text-align: right; } }
.decide { display: flex; align-items: center; gap: 0.6rem; margin-top: 0.9rem;
  span { padding: 0.3rem 1rem; border-radius: 8px; font-weight: 800; font-size: 0.85rem; }
  .p { color: #5fe0a0; background: rgba(60, 200, 120, 0.15); border: 1px solid rgba(95, 224, 160, 0.5); }
  .f { color: #ff6b6b; background: rgba(255, 90, 90, 0.15); border: 1px solid rgba(255, 107, 107, 0.5); }
  small { color: var(--muted); margin-left: auto; } }

/* Contact */
.contact { padding: 2.5rem 1.5rem; border-color: rgba(110, 160, 255, 0.4);
  p { color: var(--muted); margin: 0.8rem 0 1.5rem; } }

@keyframes flow { to { background-position: 200% 0; } }
@keyframes shimmer { 0% { left: -80%; } 60%, 100% { left: 140%; } }
@keyframes blink { 50% { opacity: 0.25; } }

@media (max-width: 1000px) {
  .steps { grid-template-columns: repeat(4, 250px); overflow-x: auto; padding: 0.5rem 0.5rem 1.5rem; }
  .teaser { grid-template-columns: 1fr; padding: 1.6rem; }
}

@media (prefers-reduced-motion: reduce) {
  .frame { animation: none; }
}
</style>