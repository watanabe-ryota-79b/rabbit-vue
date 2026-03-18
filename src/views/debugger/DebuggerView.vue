<script setup lang="ts">
import { ref, computed } from 'vue'

const input = ref('')

const result = computed<{ formatted: string; valid: boolean } | null>(() => {
  if (!input.value.trim()) return null
  try {
    return { formatted: JSON.stringify(JSON.parse(input.value), null, 2), valid: true }
  } catch {
    return { formatted: '', valid: false }
  }
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-semibold text-gray-800 mb-6">デバッガー</h1>

    <div class="grid grid-cols-2 gap-4 h-[calc(100vh-10rem)]">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-gray-600">入力</label>
        <textarea
          v-model="input"
          class="flex-1 w-full rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="JSONを入力..."
        />
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-600">出力</label>
          <span
            v-if="result"
            :class="[
              'text-xs px-2 py-0.5 rounded-full font-medium',
              result.valid
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700',
            ]"
          >
            {{ result.valid ? '有効なJSON' : '無効なJSON' }}
          </span>
        </div>
        <pre
          class="flex-1 rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm overflow-auto"
        >{{ result?.valid ? result.formatted : '' }}</pre>
      </div>
    </div>
  </div>
</template>
