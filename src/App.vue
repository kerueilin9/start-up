<script setup lang="ts">
import { ref } from 'vue'
import CurrencySelector from './components/CurrencySelector.vue'
import RateDashboard from './components/RateDashboard.vue'
import Calculator from './components/Calculator.vue'

// Mock Data
interface Game {
  id: string;
  name: string;
  server: string;
  rate: number;
  dailyChange: number;
  history: number[];
}

const games: Game[] = [
  { id: 'maplestory', name: '新楓之谷', server: '艾麗亞', rate: 15500000, dailyChange: 2.5, history: [14800000, 15000000, 15100000, 15300000, 15400000, 15500000] },
  { id: 'maplestory-b', name: '新楓之谷', server: '優依娜', rate: 16200000, dailyChange: -0.5, history: [16500000, 16300000, 16400000, 16300000, 16250000, 16200000] },
  { id: 'lineagem', name: '天堂M', server: '伊娃', rate: 450, dailyChange: -1.2, history: [458, 455, 460, 452, 455, 450] },
  { id: 'wow', name: '魔獸世界', server: '暗影之月', rate: 25000, dailyChange: 0.8, history: [24000, 24200, 24800, 24500, 24900, 25000] }
]

const selectedGame = ref<Game>(games[0])

const handleGameChange = (gameId: string) => {
  const found = games.find(g => g.id === gameId)
  if (found) selectedGame.value = found
}
</script>

<template>
  <div class="app-container">
    <header class="hero">
      <h1 class="gradient-text">遊戲幣匯率查詢中心</h1>
      <p>掌握各大遊戲即時幣值走勢，精采你的打機人生</p>
    </header>
    
    <main class="main-content">
      <CurrencySelector 
        :games="games" 
        :selectedId="selectedGame.id" 
        @select="handleGameChange" 
      />
      
      <div class="dashboard-grid">
        <RateDashboard :game="selectedGame" />
        <Calculator :game="selectedGame" />
      </div>
    </main>
    
    <footer>
      <p>© 2026 GameCurrency Exchange. Data is for demonstration only.</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 100vh;
}

.hero {
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 2rem;
  animation: fadeInDown 0.8s ease-out;
}

.hero h1 {
  font-family: 'Outfit', sans-serif;
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  letter-spacing: -1px;
}

.hero p {
  color: var(--text-muted);
  font-size: 1.2rem;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 2.2fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 900px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

footer {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: auto;
  padding-top: 2rem;
  padding-bottom: 1rem;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
