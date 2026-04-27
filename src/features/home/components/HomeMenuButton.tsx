type HomeMenuButtonProps = {
  label: string
  description: string
  variant: 'large' | 'standard'
}

export function HomeMenuButton({
  label,
  description,
  variant,
}: HomeMenuButtonProps) {
  return (
    <button type="button" className={`menu-button menu-button--${variant}`}>
      <span className="menu-button__label">{label}</span>
      <span className="menu-button__description">{description}</span>
    </button>
  )
}
