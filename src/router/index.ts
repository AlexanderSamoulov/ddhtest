import { createRouter, createWebHistory } from 'vue-router'
import SectionsList from '../views/SectionsList.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/1' },
    {
      path: '/:id',
      component: SectionsList
    }
  ]
})

export default router
