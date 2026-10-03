import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/phase/:slug', name: 'phase', component: () => import('@/views/PhaseView.vue'), props: true },
    { path: '/phase/:slug/:feature', name: 'feature', component: () => import('@/views/FeatureView.vue'), props: true },
    { path: '/simulator', name: 'simulator', component: () => import('@/views/SimulatorView.vue') },
  ],
})