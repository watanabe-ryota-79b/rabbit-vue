<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'

const isCollapsed = ref(false)
</script>

<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden">
    <AppSidebar :collapsed="isCollapsed" @toggle="isCollapsed = !isCollapsed" />
    <main class="flex-1 overflow-auto">
      <RouterView />
    </main>
  </div>
</template>
