import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DevForm from '../views/DevFormulaire.vue'
import Formulaire from '../views/Formulaire.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/devform',
    name: 'DevForm',
    component: DevForm
  },
  {
    path: '/form',
    name: 'Formulaire',
    component: Formulaire
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
