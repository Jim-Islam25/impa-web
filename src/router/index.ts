import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { pages } from '@/data/pages'

// Premium pages open the real unlock pages inside the phases
const redirects: Record<string, string> = {
  'clinical-cases': '/phase/phase-2/cases',
  'question-bank': '/phase/phase-2/qbank',
  exams: '/phase/phase-2/mock',
  certificates: '/phase/phase-2/certs',
  faculty: '/phase/phase-3/faculty',
}

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/phase/:slug', name: 'phase', component: () => import('@/views/PhaseView.vue'), props: true },
    { path: '/phase/:slug/:feature', name: 'feature', component: () => import('@/views/FeatureView.vue'), props: true },
    { path: '/simulator', name: 'simulator', component: () => import('@/views/SimulatorView.vue') },
    { path: '/activate', name: 'activate', component: () => import('@/views/ActivateView.vue') },
    { path: '/issue', name: 'issue', component: () => import('@/views/IssueView.vue') },
    ...Object.entries(redirects).map(([from, to]) => ({ path: `/${from}`, redirect: to })),
    ...pages.map((p) => ({
      path: `/${p.key}`,
      name: p.key,
      component: () => import('@/views/PageView.vue'),
      props: { pageKey: p.key },
    })),
  ],
})