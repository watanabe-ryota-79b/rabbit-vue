import { ref } from 'vue'
import { fetchData } from './api'
import type { ApiError } from '@/api/types'

export function useFetch<T>() {
  const data = ref<T | null>(null)
  const error = ref<ApiError | null>(null)
  const loading = ref(false)

  async function execute(path: string) {
    loading.value = true
    error.value = null
    try {
      data.value = await fetchData<T>(path)
    } catch (e) {
      error.value = e as ApiError
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, execute }
}
