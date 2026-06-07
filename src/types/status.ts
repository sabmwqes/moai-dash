// ============================================================
// Status effect types and registry
// ============================================================

/** Display template for a status effect. Instance state is in ActiveStatusEffect. */
export type StatusEffectDef = {
  name: string
  icon: string
  color: string
  description: string
}

/** Single source of truth for all status effect definitions */
export const STATUS_REGISTRY = {
  // 毎ターン，value ダメージ
  burn: {
    name: 'Burn',
    icon: '🔥',
    color: '#F60',
    description: 'Deals damage every turn equal to its value.',
  },
  // プレイヤー：value 個のランダムな目を無効化 / 敵：行動個数が value 減る
  freeze: {
    name: 'Freeze',
    icon: '❄️',
    color: '#4FF',
    description: 'Disables a number of random dice faces for the player, or reduces an enemy action count by its value.',
  },
  // value × 1%のダメージ増加
  strength: {
    name: 'Strength',
    icon: '⚔️',
    color: '#D44',
    description: 'Increases outgoing damage by 1% per value.',
  },
  // value × 1%のダメージ減少
  shield: {
    name: 'Shield',
    icon: '🛡️',
    color: '#33D',
    description: 'Reduces incoming damage by 1% per value.',
  },
  // 毎ターン，value 回復． value は半減（切り捨て）して減少．
  regen: {
    name: 'Regen',
    icon: '🌿',
    color: '#8F8',
    description: 'Heals every turn, then halves its value each turn (rounded down).',
  },
  // 毎ターン，value 回復．
  regen_plus: {
    name: 'Regen+',
    icon: '🍏',
    color: '#0B0',
    description: 'Heals every turn.',
  },
  // value が 100 以上でHPが0になる
  radioactive: {
    name: 'Radioactive',
    icon: '☢️',
    color: '#FB4',
    description: 'Causes HP to drop to 0 when its value reaches 100 or more.',
  },
  // value ターンの間, 与えるダメージと受けるダメージが2倍
  garlic: {
    name: 'Garlic',
    icon: '🧄',
    color: '#F0F',
    description: 'Multiplies both dealt and received damage by 2 for the duration of the turn.',
  },
  // value ターンの間，受けるダメージが1になる
  carat: {
    name: 'Carat',
    icon: '💎',
    color: '#09F',
    description: 'Reduces incoming damage to 1 for the duration of the turn.',
  },
  // value ターンの間，受けるダメージが0になり，状態異常を受けない
  invincible: {
    name: 'Invincible',
    icon: '⭐',
    color: '#FFD700',
    description: 'Reduces incoming damage to 0 and prevents new status effects for the duration of the turn.',
  },
  // ???
  void: {
    name: 'Void',
    icon: '👁️‍🗨️',
    color: '#444',
    description: '???',
  },
} satisfies Record<string, StatusEffectDef>

export type StatusEffectId = keyof typeof STATUS_REGISTRY

/** A status effect currently active on a combatant */
export type ActiveStatusEffect = {
  id: StatusEffectId
  value: number
}
