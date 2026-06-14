type HomeMenuButtonProps = {
  label: string
  description: string
  variant: 'large' | 'standard'
  onClick?: () => void
}

export function HomeMenuButton({
  label,
  description,
  variant,
  onClick,
}: HomeMenuButtonProps) {
  return (
    <button type="button" className={`menu-button menu-button--${variant}`} onClick={onClick}>
      <span className="menu-button__label">{label}</span>
      <span className="menu-button__description">{description}</span>
    </button>
  )
}
