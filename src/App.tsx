import { useState } from 'react'
import type { PageId } from './types/game'
import { HomeScreen } from './features/home/HomeScreen'
import { BattleScreen } from './features/battle/BattleScreen'
import { EncyclopediaScreen } from './features/encyclopedia/EncyclopediaScreen'
import './App.css'

function App() {
  const [page, setPage] = useState<PageId>('home')

  return (
    <div className="app-viewport">
      {page === 'home' && (
        <HomeScreen
          onStartGame={() => setPage('battle')}
          onOpenEncyclopedia={() => setPage('encyclopedia')}
        />
      )}
      {page === 'battle' && <BattleScreen onExit={() => setPage('home')} />}
      {page === 'encyclopedia' && <EncyclopediaScreen onExit={() => setPage('home')} />}
    </div>
  )
}

export default App
