import { HomeHeroTitle } from './components/HomeTitle'
import { HomeMenuButton } from './components/HomeMenuButton'
import { utilityMenuItems } from './homeMenuData'
import './HomeScreen.css'

export function HomeScreen() {
  return (
    <main className="home-screen" aria-label="MOAI DASH home screen">
      <section className="home-screen__panel--left">
        <HomeHeroTitle />
        <button type="button" className="home-screen__left-button-section">
          START OPERATION
        </button>
      </section>

      <section className="home-screen__panel home-screen__panel--right" aria-label="Utility menu">
        {utilityMenuItems.map((item) => (
          <HomeMenuButton
            key={item.id}
            label={item.label}
            description={item.description}
            variant={item.variant}
          />
        ))}
      </section>
    </main>
  )
}
