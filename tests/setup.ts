import { afterAll, afterEach, beforeAll, expect, vi } from 'vitest'

beforeAll(async () => {
  console.log('テスト開始')

  vi.setConfig({ testTimeout: 600_000, hookTimeout: 600_000 });
})


afterEach(async () => {
    // モックをリセット
  vi.resetAllMocks()
})

// テスト終了時の処理
afterAll(async () => {
  console.log('テスト終了')
})

// グローバルなエクスペクトの拡張
expect.extend({
  // 必要に応じてカスタムマッチャーを追加
}) 