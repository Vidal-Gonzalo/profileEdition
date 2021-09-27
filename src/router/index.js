import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/home.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "Signup" */ '../views/signup.vue')
  },
  {
    path: '/profile/:email',
    name: 'profile',
    component: () => import(/* webpackChunkName: "Profile" */ '../views/profile.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
