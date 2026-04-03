<script setup lang="ts">
interface Game {
  id: string;
  name: string;
  server: string;
  rate: number;
  dailyChange: number;
  history: number[];
}

defineProps<{
  games: Game[];
  selectedId: string;
}>();

const emit = defineEmits<{
  (e: 'select', id: string): void
}>();
</script>

<template>
  <div class="glass-panel selector-panel animate-fade">
    <div class="header">
      <h2>選擇遊戲與伺服器</h2>
      <span class="badge">即時行情</span>
    </div>
    
    <div class="game-grid">
      <button 
        v-for="game in games" 
        :key="game.id"
        class="game-card"
        :class="{ active: game.id === selectedId }"
        @click="emit('select', game.id)"
      >
        <div class="game-info">
          <h3>{{ game.name }}</h3>
          <p class="server-label">伺服器: {{ game.server }}</p>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.selector-panel {
  padding: 1.5rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header h2 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
}

.badge {
  background: rgba(34, 197, 94, 0.2);
  color: var(--accent-up);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.game-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  padding: 1rem;
  border-radius: 12px;
  text-align: left;
  transition: all 0.3s ease;
  color: var(--text-main);
  display: flex;
  align-items: center;
}

.game-card:hover {
  background: var(--glass-hover);
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.2);
}

.game-card.active {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(168, 85, 247, 0.2));
  border-color: var(--secondary-color);
  box-shadow: 0 0 15px rgba(14, 165, 233, 0.3);
}

.game-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.server-label {
  font-size: 0.85rem;
  color: var(--text-muted);
}
</style>
