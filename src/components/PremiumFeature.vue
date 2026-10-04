<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { courses } from '@/data/content'
import type { Quiz } from '@/data/content'
import { clinicalCases, qbankSets, mockExam, liveSessions, facultyRoles, researchProjects } from '@/data/premium'
import { site } from '@/data/site'
import { useAccess } from '@/composables/useAccess'
import QuizPlayer from '@/components/QuizPlayer.vue'

defineProps<{ featKey: string }>()

const { license, until, lock } = useAccess()

const shown = reactive<Record<string, boolean>>({})
const qset = ref<Quiz | undefined>(qbankSets[0])

const certName = ref('')
const certCourse = ref(courses[0]?.title ?? '')
const certId = computed(() => {
  let sum = 0
  for (const ch of certName.value.trim().toUpperCase()) sum += ch.charCodeAt(0)
  return `IMPA-${new Date().getFullYear()}-${String(sum * 37).slice(-5).padStart(5, '0')}`
})

const mail = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
</script>

<template>
  <div class="wrap">
    <!-- Clinical cases -->
    <section v-if="featKey === 'cases'" class="stack">
      <article v-for="c in clinicalCases" :key="c.id" class="glass box">
        <h3>{{ c.title }}</h3>
        <p class="meta">{{ c.setting }}</p>
        <ul>
          <li v-for="d in c.details" :key="d">{{ d }}</li>
        </ul>
        <p class="q">{{ c.question }}</p>
        <button class="btn ghost" @click="shown[c.id] = !shown[c.id]">
          {{ shown[c.id] ? 'Hide expert answer' : 'Show expert answer' }}
        </button>
        <div v-if="shown[c.id]" class="answer">
          <h4>Expert answer</h4>
          <ol>
            <li v-for="a in c.answer" :key="a">{{ a }}</li>
          </ol>
        </div>
      </article>
    </section>

    <!-- Question bank -->
    <section v-else-if="featKey === 'qbank'" class="stack">
      <div class="tabs">
        <button v-for="s in qbankSets" :key="s.id" class="btn" :class="{ ghost: qset?.id !== s.id }" @click="qset = s">
          {{ s.title }}
        </button>
      </div>
      <QuizPlayer v-if="qset" :key="qset.id" :quiz="qset" />
    </section>

    <!-- Mock exam -->
    <section v-else-if="featKey === 'mock'" class="stack">
      <div class="glass box">
        <h3>{{ mockExam.title }}</h3>
        <p class="meta">{{ mockExam.questions.length }} questions, mixed topics. Answer all questions and check your score at the end.</p>
      </div>
      <QuizPlayer :quiz="mockExam" />
    </section>

    <!-- Certificates -->
    <section v-else-if="featKey === 'certs'" class="stack">
      <div class="glass box">
        <h3>Certificate preview</h3>
        <p class="meta">
          A certificate is issued after you complete a course and pass its final exam. Enter your name to preview it.
        </p>
        <div class="form">
          <input v-model="certName" type="text" placeholder="Your full name" />
          <select v-model="certCourse">
            <option v-for="c in courses" :key="c.id">{{ c.title }}</option>
          </select>
        </div>
      </div>

      <div class="cert">
        <p class="org">{{ site.fullName }}</p>
        <h2>Certificate of Completion</h2>
        <p class="small">This is to certify that</p>
        <p class="name">{{ certName.trim() || 'Your Name' }}</p>
        <p class="small">has successfully completed</p>
        <p class="course">{{ certCourse }}</p>
        <p class="id">Certificate ID: {{ certId }}</p>
      </div>
    </section>

    <!-- Live classes -->
    <section v-else-if="featKey === 'live'" class="stack">
      <article v-for="s in liveSessions" :key="s.title" class="glass box row">
        <div>
          <h3>{{ s.title }}</h3>
          <p class="meta">{{ s.topic }} · {{ s.level }}</p>
          <p class="meta">Date and time: to be announced</p>
        </div>
        <a class="btn" :href="mail(`Register interest: ${s.title}`)">Register interest</a>
      </article>
    </section>

    <!-- Faculty -->
    <section v-else-if="featKey === 'faculty'" class="stack">
      <article v-for="f in facultyRoles" :key="f.role" class="glass box">
        <h3>{{ f.role }}</h3>
        <p class="meta">Focus: {{ f.focus }}</p>
        <p class="meta">Profile: to be announced</p>
      </article>
      <div class="glass box row">
        <div>
          <h3>Teach with IMPA</h3>
          <p class="meta">Are you a medical physicist who wants to mentor or teach? Get in touch.</p>
        </div>
        <a class="btn" :href="mail('Faculty application')">Apply as faculty</a>
      </div>
    </section>

    <!-- Research -->
    <section v-else-if="featKey === 'research'" class="stack">
      <article v-for="r in researchProjects" :key="r.title" class="glass box">
        <span class="pill">{{ r.status }}</span>
        <h3>{{ r.title }}</h3>
        <p class="meta">{{ r.desc }}</p>
      </article>
      <div class="glass box">
        <h3>Publication guidelines</h3>
        <ul>
          <li>Describe the clinical question and the method clearly.</li>
          <li>Share data in a way that protects patient privacy.</li>
          <li>Agree on authorship at the start of the project.</li>
          <li>Send your project idea to the IMPA team for review.</li>
        </ul>
        <a class="btn" :href="mail('Research collaboration')">Propose a project</a>
      </div>
    </section>

    <!-- Student accounts -->
    <section v-else-if="featKey === 'accounts'" class="stack">
      <div class="glass box">
        <h3>Your membership</h3>
        <p v-if="license" class="meta">Member email: <strong>{{ license.e }}</strong></p>
        <p class="meta">
          Premium access: <strong class="ok">Active</strong><span v-if="until"> until {{ until }}</span>
        </p>
        <p class="meta">
          Your premium access is saved on this device. To renew, pay again and open the new activation link we send you.
        </p>
        <button class="btn ghost" @click="lock">Remove premium access from this device</button>
      </div>
      <div class="glass box">
        <h3>Coming to your dashboard</h3>
        <ul>
          <li>Course and quiz progress</li>
          <li>Exam history and scores</li>
          <li>Certificates you have earned</li>
          <li>Booked live classes and mentor sessions</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.stack {
  display: grid;
  gap: 1rem;
}

.box {
  padding: 1.5rem;
  text-align: left;

  h3 {
    margin: 0.4rem 0 0.4rem;
  }

  h4 {
    margin: 0 0 0.4rem;
    color: #5fe0a0;
  }

  ul,
  ol {
    color: var(--muted);
    line-height: 1.7;
    padding-left: 1.2rem;
  }
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.meta {
  color: var(--muted);
  margin: 0 0 0.5rem;
  line-height: 1.6;
}

.q {
  font-weight: 700;
  margin: 1rem 0;
}

.answer {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(95, 224, 160, 0.5);
  background: rgba(60, 200, 120, 0.1);
}

.tabs {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.pill {
  padding: 0.2rem 0.8rem;
  border-radius: 999px;
  background: rgba(110, 160, 255, 0.2);
  color: var(--accent);
  font-size: 0.8rem;
}

.ok {
  color: #5fe0a0;
}

.form {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  margin-top: 0.8rem;

  input,
  select {
    flex: 1;
    min-width: 220px;
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid var(--line);
    background: #0d1119;
    color: #fff;
    font: inherit;
  }
}

.cert {
  padding: 2.5rem 1.5rem;
  text-align: center;
  border-radius: 14px;
  background: #0e1422;
  border: 2px solid rgba(255, 196, 87, 0.7);
  box-shadow: 0 0 30px rgba(255, 196, 87, 0.2), inset 0 0 0 6px rgba(9, 10, 15, 0.9), inset 0 0 0 7px rgba(255, 196, 87, 0.4);

  .org {
    margin: 0;
    color: #ffc457;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 0.85rem;
  }

  h2 {
    font-family: 'Anton', sans-serif;
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    margin: 0.8rem 0;
  }

  .small {
    color: var(--muted);
    margin: 0.4rem 0;
  }

  .name {
    font-size: 1.8rem;
    font-weight: 800;
    margin: 0.5rem 0;
    color: #fff;
  }

  .course {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--accent);
    margin: 0.5rem 0 1.2rem;
  }

  .id {
    margin: 0;
    color: var(--muted);
    font-size: 0.85rem;
  }
}
</style>