import { useReducer, useCallback } from 'react'
import type {
  BattleState,
  DicePairing,
  EnemyInstance,
  TurnPhase,
  LogEntry,
  DiceSum,
} from '../../types/game'
import { DAMAGE_TABLE, ENEMY_MARKERS } from '../../types/game'
import { rollAllDice, placeEnemyActions, computeSums } from './battleUtils'
import { ENEMY_REGISTRY } from './data/enemies'

import { BattleMainPanel } from './components/BattleMainPanel'
import { DiceSumPanel } from './components/DiceSumPanel'
import { DicePanel } from './components/DicePanel'
import { SkillPanel } from './components/SkillPanel'
import { BattleLog } from './components/BattleLog'
import { BattleStatus } from './components/BattleStatus'
import './BattleScreen.css'

// ─── Initial state factory ───────────────────────────────────

/** Player character icon: plain 🗿 (no color tint) */
const PLAYER_ICON = { layers: [{ char: '🗿' }] }

function createInitialEnemies(): EnemyInstance[] {
  const data = ENEMY_REGISTRY['red_moai']
  return [
    {
      data,
      variants: [],
      state: { currentHp: data.hp, statusEffects: [] },
    },
  ]
}

function createInitialState(): BattleState {
  const enemies = createInitialEnemies()
  return {
    player: {
      maxHp: 500,
      currentHp: 500,
      maxMp: 100,
      currentMp: 100,
      statusEffects: [],
      dice: { A: null, B: null, C: null, D: null },
      skills: [],
      icon: PLAYER_ICON,
    },
    enemies,
    turnNumber: 1,
    battleNumber: 1,
    floorNumber: 1,
    exp: 0,
    gold: 0,
    phase: 'rolling',
    selectedPairing: null,
    placedActions: placeEnemyActions(enemies, 0),
    log: [{ turn: 0, message: 'Battle start!' }],
    verboseLog: false,
  }
}

// ─── Reducer ─────────────────────────────────────────────────

type BattleAction =
  | { type: 'roll_dice' }
  | { type: 'select_pairing'; pairing: DicePairing }
  | { type: 'resolve_turn' }
  | { type: 'use_skill'; skillId: string }

function battleReducer(state: BattleState, action: BattleAction): BattleState {
  switch (action.type) {
    case 'roll_dice': {
      if (state.phase !== 'rolling') return state
      const dice = rollAllDice()
      return {
        ...state,
        player: { ...state.player, dice },
        phase: 'pairing',
        selectedPairing: null,
      }
    }

    case 'select_pairing': {
      if (state.phase !== 'pairing') return state
      return {
        ...state,
        selectedPairing: action.pairing,
      }
    }

    case 'resolve_turn': {
      if (state.phase !== 'pairing' || !state.selectedPairing) return state
      if (state.player.dice.A === null) return state

      const [sum1, sum2] = computeSums(state.player.dice, state.selectedPairing)
      const playerSums: DiceSum[] = [sum1, sum2]
      const newLog: LogEntry[] = [...state.log]

      // --- Player attack phase ---
      const newEnemies: EnemyInstance[] = state.enemies.map((e) => ({
        ...e,
        state: { ...e.state },
      }))

      for (const s of playerSums) {
        const damage = DAMAGE_TABLE[s]
        // Damage all alive enemies for simplicity (single target: first alive)
        const target = newEnemies.find((e) => e.state.currentHp > 0)
        if (target) {
          target.state.currentHp = Math.max(0, target.state.currentHp - damage)
          newLog.push({
            turn: state.turnNumber,
            message: `Player deals ${damage} to ${target.data.name} (sum ${s})`,
          })
        }
      }

      // --- Enemy attack phase ---
      let newHp = state.player.currentHp
      for (const placed of state.placedActions) {
        if (playerSums.includes(placed.targetSum)) {
          // Player landed on this sum → enemy action triggers
          const enemy = state.enemies[placed.enemyIndex]
          const t = placed.action.type
          if (t.kind === 'damage' || t.kind === 'damage_status') {
            newHp = Math.max(0, newHp - t.value)
            newLog.push({
              turn: state.turnNumber,
              message: `${enemy.data.name} deals ${t.value} to Player (sum ${placed.targetSum})`,
              markerColor: ENEMY_MARKERS[placed.enemyIndex % ENEMY_MARKERS.length].color,
            })
          }
          if (t.kind === 'nullify') {
            newLog.push({
              turn: state.turnNumber,
              message: `${enemy.data.name} nullifies Player damage on sum ${placed.targetSum}`,
              markerColor: ENEMY_MARKERS[placed.enemyIndex % ENEMY_MARKERS.length].color,
            })
          }
        }
      }

      // --- Check win / lose ---
      const allDead = newEnemies.every((e) => e.state.currentHp <= 0)
      let nextPhase: TurnPhase = 'rolling'
      if (allDead) {
        nextPhase = 'victory'
        newLog.push({ turn: state.turnNumber, message: 'Victory!' })
      } else if (newHp <= 0) {
        nextPhase = 'defeat'
        newLog.push({ turn: state.turnNumber, message: 'Defeated...' })
      }

      const nextTurn = state.turnNumber + 1
      const nextPlaced = allDead || newHp <= 0
        ? []
        : placeEnemyActions(newEnemies, nextTurn)

      return {
        ...state,
        player: {
          ...state.player,
          currentHp: newHp,
          dice: { A: null, B: null, C: null, D: null },
        },
        enemies: newEnemies,
        turnNumber: nextTurn,
        phase: nextPhase,
        selectedPairing: null,
        placedActions: nextPlaced,
        log: newLog,
        gold: allDead ? state.gold + state.enemies.reduce((a, e) => a + e.data.gold, 0) : state.gold,
        exp: allDead ? state.exp + state.enemies.reduce((a, e) => a + e.data.exp, 0) : state.exp,
      }
    }

    case 'use_skill':
      // Stub — skills not yet implemented
      return state

    default:
      return state
  }
}

// ─── Component ───────────────────────────────────────────────

type Props = {
  onExit: () => void
}

export function BattleScreen({ onExit }: Props) {
  const [state, dispatch] = useReducer(battleReducer, undefined, createInitialState)

  const handleRoll = useCallback(() => dispatch({ type: 'roll_dice' }), [])
  const handleSelectPairing = useCallback(
    (pairing: DicePairing) => dispatch({ type: 'select_pairing', pairing }),
    [],
  )
  const handleConfirm = useCallback(() => dispatch({ type: 'resolve_turn' }), [])
  const handleUseSkill = useCallback(
    (id: string) => dispatch({ type: 'use_skill', skillId: id }),
    [],
  )

  return (
    <div className="battle-screen">
      {/* --- Left column --- */}
      <div className="battle-screen__left">
        <BattleMainPanel player={state.player} enemies={state.enemies} />
        <DiceSumPanel
          placedActions={state.placedActions}
          selectedPairing={state.selectedPairing}
          dice={state.player.dice}
        />
      </div>

      {/* --- Right column --- */}
      <div className="battle-screen__right">
        <DicePanel
          dice={state.player.dice}
          phase={state.phase}
          selectedPairing={state.selectedPairing}
          onRoll={handleRoll}
          onSelectPairing={handleSelectPairing}
          onConfirm={handleConfirm}
          onExit={onExit}
        />
        <SkillPanel
          skills={state.player.skills}
          currentMp={state.player.currentMp}
          onUseSkill={handleUseSkill}
        />
        <BattleLog log={state.log} />
        <BattleStatus
          gold={state.gold}
          exp={state.exp}
          turnNumber={state.turnNumber}
          battleNumber={state.battleNumber}
          floorNumber={state.floorNumber}
        />

      </div>
    </div>
  )
}
