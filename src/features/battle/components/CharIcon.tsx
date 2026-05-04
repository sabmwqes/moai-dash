import type { CharacterIconDef } from '../../../types/game'
import './CharIcon.css'

type Size = 'sm' | 'md' | 'lg'

type Props = {
  icon: CharacterIconDef
  /** Display size (sm=1.5rem, md=2.5rem, lg=3.5rem) */
  size?: Size
  /** Flip horizontally — use for right-side characters */
  mirrored?: boolean
  className?: string
}

/**
 * Renders a CharacterIconDef as a stacked set of emoji layers.
 * Each layer is absolutely positioned inside a relative container,
 * so multiple emoji can be overlaid (e.g. status effects on top).
 */
export function CharIcon({ icon, size = 'md', mirrored = false, className }: Props) {
  const rootClass = [
    'char-icon',
    `char-icon--${size}`,
    mirrored ? 'char-icon--mirrored' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={rootClass} aria-hidden="true">
      {icon.layers.map((layer, i) => (
        <span
          key={i}
          className={['char-icon__layer', layer.className ?? ''].filter(Boolean).join(' ')}
          style={layer.style}
        >
          {layer.char}
        </span>
      ))}
    </span>
  )
}
