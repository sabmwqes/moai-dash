export type UtilityMenuItem = {
  id: 'encyclopedia' | 'tutorial' | 'credits' | 'settings'
  label: string
  description: string
  variant: 'large' | 'standard'
}

export const utilityMenuItems: UtilityMenuItem[] = [
  {
    id: 'encyclopedia',
    label: 'ENCYCLOPEDIA',
    description: 'Discover every Moai you have encountered.',
    variant: 'large',
  },
  {
    id: 'tutorial',
    label: 'TUTORIAL',
    description: 'Learn dice flow and battle pacing.',
    variant: 'standard',
  },
  {
    id: 'credits',
    label: 'CREDITS',
    description: 'Team and sound attributions.',
    variant: 'standard',
  },
  {
    id: 'settings',
    label: 'SETTINGS',
    description: 'Audio, language, and accessibility options.',
    variant: 'standard',
  },
]
