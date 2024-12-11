import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Questionnaire from './views/Questionnaire.vue'
import './index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faCheck, 
  faTimes, 
  faPlus, 
  faClipboardCheck,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faCheck, 
  faTimes, 
  faPlus, 
  faClipboardCheck,
  faExclamationCircle
)

const routes = [
  { path: '/', component: Home },
  { path: '/questionnaire', component: Questionnaire }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

