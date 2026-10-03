<script setup lang="ts">
import ShootingStars from '@/components/ShootingStars.vue'
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>

<template>
  <ShootingStars />
  <div class="app">
    <NavBar />
    <div class="content">
      <RouterView />
    </div>
    <FooterBar />
  </div>
</template>

<style>
.app { position: relative; z-index: 1; min-height: 100vh; display: flex; flex-direction: column; }
.content { flex: 1; }
</style>