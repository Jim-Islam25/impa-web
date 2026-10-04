<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { site } from '@/data/site'

const props = defineProps<{ mode: 'contact' | 'join' }>()

const form = reactive({
  name: '',
  email: '',
  topic: props.mode === 'join' ? 'Student' : 'General question',
  country: '',
  message: '',
})

const sent = ref(false)

const topics =
  props.mode === 'join'
    ? ['Student', 'Medical physicist', 'Radiation oncologist', 'Institution', 'Other']
    : ['General question', 'Membership and premium access', 'Courses and exams', 'Partnership', 'Technical support', 'Feedback']

const validEmail = computed(() => /^\S+@\S+\.\S+$/.test(form.email))
const canSend = computed(() => form.name.trim().length > 1 && validEmail.value && form.message.trim().length >= 10)

const submit = () => {
  if (!canSend.value) return

  const subject =
    props.mode === 'join' ? `${site.shortName} membership request: ${form.name}` : `${site.shortName} contact: ${form.topic}`

  const body = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    props.mode === 'join' ? `I am a: ${form.topic}` : `Topic: ${form.topic}`,
    form.country ? `Country: ${form.country}` : '',
    '',
    form.message,
  ].join('\n')

  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  sent.value = true
}
</script>

<template>
  <section class="form glass">
    <h2 class="glow-text">{{ mode === 'join' ? 'Request to join' : 'Send us a message' }}</h2>
    <p class="hint">
      Fill in the form and press Send. Your email app will open with the message ready to send to
      <a :href="`mailto:${site.email}`">{{ site.email }}</a>.
    </p>

    <div class="grid">
      <label>
        Full name
        <input v-model="form.name" type="text" placeholder="Your name" autocomplete="name" />
      </label>

      <label>
        Email
        <input v-model="form.email" type="email" placeholder="you@example.com" autocomplete="email" />
      </label>

      <label>
        {{ mode === 'join' ? 'I am a' : 'Topic' }}
        <select v-model="form.topic">
          <option v-for="t in topics" :key="t">{{ t }}</option>
        </select>
      </label>

      <label v-if="mode === 'join'">
        Country
        <input v-model="form.country" type="text" placeholder="Country" autocomplete="country-name" />
      </label>
    </div>

    <label class="full">
      Message
      <textarea v-model="form.message" rows="5" placeholder="Write your message (at least 10 characters)"></textarea>
    </label>

    <button class="btn" :disabled="!canSend" @click="submit">Send message</button>

    <p v-if="sent" class="ok">
      If your email app did not open, write to us directly at
      <a :href="`mailto:${site.email}`">{{ site.email }}</a>.
    </p>
  </section>
</template>

<style scoped lang="scss">
.form {
  margin-top: 2rem;
  padding: 1.8rem;
  text-align: left;

  h2 {
    margin: 0 0 0.5rem;
    font-family: 'Anton', sans-serif;
    font-size: 1.6rem;
  }
}

.hint {
  color: var(--muted);
  margin: 0 0 1.2rem;
  line-height: 1.6;

  a {
    color: var(--accent);
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 600;
}

.full {
  margin-bottom: 1.2rem;
}

input,
select,
textarea {
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: #0d1119;
  color: #fff;
  font: inherit;
  font-weight: 400;

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 10px rgba(110, 160, 255, 0.4);
  }
}

textarea {
  resize: vertical;
}

.ok {
  margin: 1rem 0 0;
  color: #5fe0a0;

  a {
    color: #5fe0a0;
  }
}
</style>