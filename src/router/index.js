import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "Signup" */ '../views/Signup.vue')
  },
  {
    path: '/profile/:email',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
