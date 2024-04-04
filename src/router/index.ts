import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: true
    },
    {
      path: '/add',
      name: 'post.add',
      component: () => import('@/views/AddPostView.vue')
    },
    {
      path: '/post/:id',
      name: 'post.view',
      component: () => import('@/views/EditPostView.vue')
    }
  ]
})

export default router
