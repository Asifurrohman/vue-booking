import { createRouter, createWebHistory } from 'vue-router'

import Homepage from '@/views/HomepageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage,
    },
  ],
})

export default router
