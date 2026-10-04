<script setup lang="ts">
import PaymentRequest from '@/components/PaymentRequest.vue'
</script>

<template>
  <main class="page">
    <span class="tag glow-chip">Premium</span>
    <h1 class="glow-text">Go Premium</h1>
    <p class="sub">Unlock clinical cases, question bank, mock exams, certificates, live classes and mentoring.</p>

    <section class="box glass">
      <PaymentRequest />
    </section>

    <RouterLink to="/phase/phase-2" class="btn ghost">See what is included</RouterLink>
  </main>
</template>

<style scoped lang="scss">
.page {
  position: relative;
  z-index: 1;
  width: min(900px, 92vw);
  margin: 0 auto;
  padding: 3rem 0 2rem;
  text-align: center;
}

h1 {
  font-family: 'Anton', sans-serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  margin: 0.8rem 0 0.4rem;
}

.sub {
  color: var(--muted);
  font-size: 1.1rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 196, 87, 0.6);
  background: var(--card);
  color: #ffc457;
  font-size: 0.85rem;
}

.box {
  margin: 2rem 0 1.5rem;
  padding: 1.6rem;
  text-align: left;
  border-color: rgba(255, 196, 87, 0.45);
}
</style>