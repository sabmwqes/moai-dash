import type { EnemyData } from '../../../types/game'

export const RED_MOAI: EnemyData = {
  name: 'Red Moai',
  emoji: '🗿',
  hp: 200,
  actions: [
    // Turn pattern 1: one damage action
    [{ type: { kind: 'damage', value: 30 } }],
    // Turn pattern 2: two actions
    [
      { type: { kind: 'damage', value: 20 } },
      { type: { kind: 'damage', value: 20 } },
    ],
  ],
  exp: 10,
  gold: 5,
  rarity: 'normal',
}

export const BLUE_MOAI: EnemyData = {
  name: 'Blue Moai',
  emoji: '🗿',
  hp: 150,
  actions: [
    [{ type: { kind: 'damage', value: 25 } }],
    [
      { type: { kind: 'damage', value: 15 } },
      { type: { kind: 'damage_status', value: 10, status: { id: 'freeze', name: 'Freeze', icon: '❄️', remainingTurns: 2 } } },
    ],
  ],
  exp: 15,
  gold: 8,
  rarity: 'normal',
}
