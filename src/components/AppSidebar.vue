<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'
import { computed } from 'vue'

defineProps<{ collapsed: boolean }>()
defineEmits<{ toggle: [] }>()

const router = useRouter()

const menuItems = computed(() =>
  router
    .getRoutes()
    .filter((r) => r.meta.sidebar)
    .map((r) => ({
      to: r.path,
      label: (r.meta.sidebar as { label: string; icon: string }).label,
      icon: (r.meta.sidebar as { label: string; icon: string }).icon,
    })),
)
</script>

<template>
  <aside
    :class="[
      'flex flex-col bg-gray-900 text-gray-100 transition-all duration-300 shrink-0',
      collapsed ? 'w-14' : 'w-56',
    ]"
  >
    <!-- ヘッダー -->
    <div
      :class="[
        'flex items-center border-b border-gray-700 h-14',
        collapsed ? 'justify-center px-0' : 'justify-between px-4',
      ]"
    >
      <span v-if="!collapsed" class="font-semibold text-sm tracking-wide">Rabbit</span>
      <button
        class="p-1.5 rounded hover:bg-gray-700 transition-colors"
        @click="$emit('toggle')"
        :aria-label="collapsed ? 'サイドバーを展開' : 'サイドバーを折り畳む'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path v-if="collapsed" d="M9 18l6-6-6-6" />
          <path v-else d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    </div>

    <!-- メニュー -->
    <nav class="flex-1 py-3">
      <RouterLink
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        :title="collapsed ? item.label : undefined"
        :class="[
          'flex items-center gap-3 py-2 transition-colors',
          collapsed ? 'justify-center px-0' : 'px-4',
        ]"
        active-class="bg-gray-700 text-white"
        class="hover:bg-gray-700/60 text-gray-300 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <!-- bug icon -->
          <path
            v-if="item.icon === 'bug'"
            d="M8 2l1.88 1.88M16 2l-1.88 1.88M9 7.13v-1a3.003 3.003 0 116 0v1M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 014-4h4a4 4 0 014 4v3c0 3.3-2.7 6-6 6zM6 13H2M22 13h-4M6 17H2M22 17h-4"
          />
        </svg>
        <span v-if="!collapsed" class="text-sm">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>
