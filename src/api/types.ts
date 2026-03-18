/** API レスポンスの共通ラッパー型 */
export interface ApiResponse<T> {
  data: T
  message?: string
}

/** ページネーション付きレスポンス型 */
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  perPage: number
}

/** API エラーの型 */
export interface ApiError {
  status: number
  message: string
}
