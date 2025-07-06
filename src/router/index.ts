import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
import LoginPage from '../pages/LoginPage.vue'
import CreateLegend from '../pages/legends/CreateLegend.vue'
import LegendsList from '../pages/legends/LegendsList.vue'
import { useAuthStore } from '../stores/auth'


const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage, 
  },
  {
    path: '/legends',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'LegendsList',
        component: LegendsList,
        meta: { requiresAuth: true },
      },
      {
        path: 'create',
        name: 'CreateLegend',
        component: CreateLegend,
        meta: { requiresAuth: true },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
