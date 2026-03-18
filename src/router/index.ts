import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import debuggerRoute from '@/views/debugger/route'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      redirect: '/debugger',
      children: [
        debuggerRoute,
        // 新しい機能を追加する場合はここに route をインポートして追加する
      ],
    },
  ],
})

export default router
