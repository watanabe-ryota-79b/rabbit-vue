import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/debugger',
  name: 'debugger',
  component: () => import('./DebuggerView.vue'),
  meta: {
    sidebar: { label: 'デバッガー', icon: 'bug' },
  },
}

export default route
