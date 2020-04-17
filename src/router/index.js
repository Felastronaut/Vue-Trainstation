import Vue from 'vue'
import VueRouter from 'vue-router'
import DevForm from '../views/DevFormulaire.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/devform',
    name: 'DevForm',
    component: DevForm
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
