import { apiClient } from '@/lib/axios'

/** 任意のエンドポイントに GET リクエストを送信してレスポンスを返す */
export async function fetchData<T>(path: string): Promise<T> {
  const { data } = await apiClient.get<T>(path)
  return data
}
