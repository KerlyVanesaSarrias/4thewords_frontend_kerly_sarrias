import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
import LoginPage from '../pages/LoginPage.vue'
import CreateLegend from '../pages/legends/CreateLegend.vue'
import LegendsList from '../pages/legends/LegendsList.vue'


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
      },
      {
        path: 'create',
        name: 'CreateLegend',
        component: CreateLegend,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
