// ============================================================
// Player types
// ============================================================

import type { DiceState } from './dice'
import type { CharacterIconDef } from './icon'
import type { ActiveStatusEffect } from './status'

export type PlayerState = {
  maxHp: number
  currentHp: number
  maxMp: number
  currentMp: number
  statusEffects: ActiveStatusEffect[]
  dice: DiceState
  skills: Skill[]
  icon: CharacterIconDef
}

export type Skill = {
  id: string
  name: string
  icon: string
  description: string
  mpCost: number
}
