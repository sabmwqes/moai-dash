import { FLOOR1_ENEMIES } from './floor1'
import { FLOORX_ENEMIES } from './floorx'
import { SPECIAL_ENEMIES } from './special'

// ─────────────────────────────────────────────────────────────────────────────
// Enemy registry — すべての敵定義を集約する単一エントリポイント
//
// 消費者は `ENEMY_REGISTRY['red_moai']` のようにIDで参照する。
// 新しいフロアが追加されたら、対応する floor*.ts を作成して
// ここでスプレッドするだけでよい。
// ─────────────────────────────────────────────────────────────────────────────

export const ENEMY_REGISTRY = {
  ...FLOOR1_ENEMIES,
  ...FLOORX_ENEMIES,
  ...SPECIAL_ENEMIES,
}

// EnemyId はレジストリのキーから自動導出される。
// 新しい敵を追加しても手動でユニオンを更新する必要はない。
export type EnemyId = keyof typeof ENEMY_REGISTRY
