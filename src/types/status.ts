// ============================================================
// Status effect types and registry
// ============================================================

/** Display template for a status effect. Instance state is in ActiveStatusEffect. */
export type StatusEffectDef = {
  name: string
  icon: string
}

/** Single source of truth for all status effect definitions */
export const STATUS_REGISTRY = {
  burn:        { name: 'Burn',        icon: '🔥' }, // #F60 毎ターン，value ダメージ
  freeze:      { name: 'Freeze',      icon: '❄️' }, // #4FF プレイヤー：value 個のランダムな目を無効化 / 敵：行動個数が value 減る
  strength:    { name: 'Strength',    icon: '⚔️' }, // #D44 value × 1%のダメージ増加
  shield:      { name: 'Shield',      icon: '🛡️' }, // #33D value × 1%のダメージ減少
  regen:       { name: 'Regen',       icon: '🌿' }, // #0D0 毎ターン，value 回復． value は半減（切り捨て）して減少．
  regen_plus:  { name: 'Regen+',      icon: '🍏' }, // #0F0 毎ターン，value 回復．
  radioactive: { name: 'Radioactive', icon: '☢️' }, // #FB4 value が 100 以上でHPが0になる
  garlic:      { name: 'Garlic',      icon: '🧄' }, // #F0F 与えるダメージと受けるダメージが value 倍
  carat:       { name: 'Carat',       icon: '💎' }, // #09F value ターンの間，受けるダメージが1になる
  invincible:  { name: 'Invincible',  icon: '⭐' }, // #FFD700 value ターンの間，受けるダメージが0になり，状態異常を受けない
} satisfies Record<string, StatusEffectDef>

export type StatusEffectId = keyof typeof STATUS_REGISTRY

/** A status effect currently active on a combatant */
export type ActiveStatusEffect = {
  id: StatusEffectId
  value: number
}
