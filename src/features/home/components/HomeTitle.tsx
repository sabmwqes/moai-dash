import './HomeTitle.css'

export function HomeHeroTitle() {
  return (
    <div className="home-hero-title">
      <p className="home-hero-title__tagline">DICE ROGUELITE / MOAI BATTLE DASHBOARD</p>
      <h1 className="home-hero-title__main">
        MOAI
        <span className="home-hero-title__suffix">DASH</span>
      </h1>
      <p className="home-hero-title__lead">
        Your monolith enters endless duels. Roll fast, route smart, survive.
      </p>
      <p className="home-hero-title__note">🗿</p>
    </div>
  )
}
