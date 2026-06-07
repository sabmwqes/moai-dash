// ============================================================
// Character icon types
// ============================================================

import type { CSSProperties } from 'react'

/**
 * A single visual layer of a character icon.
 * Layers are rendered bottom-to-top (first = back, last = front).
 */
export type EmojiLayer = {
  /** The emoji string to display (can be multi-codepoint, e.g. 🗿) */
  char: string
  /** BEM modifier class applied to this layer, e.g. 'char-icon__layer--red-tint' */
  className?: string
  /** Inline styles for one-off overrides (offset, rotation, scale, etc.) */
  style?: CSSProperties
}

/**
 * Serialisable icon definition — no JSX.
 * Passed as data to <CharIcon> for actual rendering.
 */
export type CharacterIconDef = {
  layers: EmojiLayer[]
}
