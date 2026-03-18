# CLAUDE.md

## スタック

Vue 3 / TypeScript / Vite / Pinia / Vue Router / Vitest / MSW / Axios / Tailwind CSS / oxlint + ESLint / Prettier

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
- Vue Router のコンポーネントは遅延読み込み: `() => import('./XxxView.vue')`
- テストは `__tests__/XxxComponent.spec.ts`
- `views/` は機能ごとにサブディレクトリを切る。各機能に `XxxView.vue` と `route.ts` を置き、`router/index.ts` で `route.ts` をインポートして `children` に追加する
- **CSS は Tailwind ユーティリティクラスを基本とする**。`<style scoped>` は複雑な疑似要素など Tailwind で表現できない場合のみ使う
- クラスが増えすぎた場合はコンポーネント分割を優先する（`@apply` より再利用性が高い）
- `@apply` は同じクラスの組み合わせが複数箇所で繰り返す場合のみ使う
- 任意値 (`w-[123px]` など) は極力避け、Tailwind のデザイントークン内の値を使う

## コミットルール

- コミットメッセージは日本語で記述する
- プレフィックスを付ける（`feat:`, `fix:`, `refactor:`, `test:`, `docs:` など）
- 1コミット1変更（機能追加とリファクタリングを混在させない）

## API 層 (Axios)

- Axios インスタンスは `src/lib/axios.ts` の `apiClient` のみ使用する（`axios` を直接インポートしない）
- ベースURLは `VITE_API_BASE_URL` 環境変数で切り替える（`.env` / `.env.production` / `.env.local`）
- 共通の型（`ApiResponse<T>` など）は `src/api/types.ts` に定義する
- API関数・Composableは `src/composables/[関心事]/` にまとめる（views への依存禁止）
- ディレクトリ名は機能の関心事を表す名前にする（例: `fetch/`, `auth/`）
- `src/composables/[関心事]/api.ts` にAPI関数、`src/composables/[関心事]/useXxx.ts` にComposableを置く
- Composableは `loading` / `error` / `data` を返す
- Views は `src/composables/` からインポートする。逆方向の依存は禁止

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
