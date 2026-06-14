import { HomeHeroTitle as HomeTitle } from './components/HomeTitle'
import { HomeMenuButton } from './components/HomeMenuButton'
import { utilityMenuItems } from './homeMenuData'
import './HomeScreen.css'

type HomeScreenProps = {
  onStartGame: () => void
  onOpenEncyclopedia: () => void
}

export function HomeScreen({ onStartGame, onOpenEncyclopedia }: HomeScreenProps) {
  return (
    <main className="home-screen" aria-label="MOAI DASH home screen">
      <section className="home-screen__section--left">
        <HomeTitle />
        <button type="button" className="home-screen__left-button-section" onClick={onStartGame}>
          START GAME (WIP)
        </button>
      </section>

      <section className="home-screen__section--right" aria-label="Utility menu">
        {utilityMenuItems.map((item) => (
          <HomeMenuButton
            key={item.id}
            label={item.label}
            description={item.description}
            variant={item.variant}
            onClick={item.id === 'encyclopedia' ? onOpenEncyclopedia : undefined}
          />
        ))}
      </section>
    </main>
  )
}
