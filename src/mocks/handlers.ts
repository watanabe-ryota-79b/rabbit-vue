import { http, HttpResponse } from 'msw'

export const handlers = [
  // ここにモックハンドラーを追加する
  // 例:
  // http.get('/api/users', () => {
  //   return HttpResponse.json([
  //     { id: 1, name: 'Alice' },
  //     { id: 2, name: 'Bob' },
  //   ])
  // }),
]
