import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Questionnaire from '../views/Questionnaire.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/questionnaire',
      name: 'questionnaire',
      component: Questionnaire
    }
  ]
})

export default router