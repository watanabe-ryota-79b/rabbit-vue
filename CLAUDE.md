# CLAUDE.md

## スタック

Vue 3 / TypeScript / Vite / Pinia / Vue Router / Vitest / MSW / oxlint + ESLint / Prettier

## コマンド

```bash
npm run dev        # 開発サーバー
npm run build      # 型チェック + ビルド
npm run test:unit  # Vitest
npm run lint       # oxlint → ESLint (自動修正)
npm run format     # Prettier
```

## 規約

- `<script setup lang="ts">` を使う (Options API 禁止)
- `any` 禁止。`defineProps` / `defineEmits` は型引数で定義
- SFC ブロック順: `<script setup>` → `<template>` → `<style scoped>`
- インポートは `@/` エイリアスを使う
- コンポーネント命名: 再利用=`BaseXxx`、ページ=`XxxView`、シングルトン=`TheXxx`
- Pinia は Setup Store 形式。ストア ID はファイル名と一致させる
- Vue Router のコンポーネントは遅延読み込み: `() => import('@/views/XxxView.vue')`
- テストは `__tests__/XxxComponent.spec.ts`

## コミットルール

- コミットメッセージは日本語で記述する
- プレフィックスを付ける（`feat:`, `fix:`, `refactor:`, `test:`, `docs:` など）
- 1コミット1変更（機能追加とリファクタリングを混在させない）

## モック API (MSW)

ハンドラーは `src/mocks/handlers.ts` に追加する。

```ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/users', () => HttpResponse.json([{ id: 1, name: 'Alice' }])),
]
```

- **開発**: `npm run dev` で自動起動。未定義リクエストは実サーバーに素通り
- **テスト**: `vitest.config.ts` の `setupFiles` で全テストに自動適用
- テスト内で上書き: `server.use(http.get('/api/users', () => HttpResponse.json({}, { status: 500 })))`
