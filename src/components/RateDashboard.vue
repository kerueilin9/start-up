<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface Game {
  id: string;
  name: string;
  server: string;
  rate: number;
  dailyChange: number;
  history: number[];
}

const props = defineProps<{ game: Game }>()

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('zh-TW').format(num)
}

const chartData = computed(() => ({
  labels: ['5天前', '4天前', '3天前', '2天前', '昨天', '今天'],
  datasets: [
    {
      label: '匯率走勢 (1 TWD = 金幣)',
      backgroundColor: 'rgba(14, 165, 233, 0.1)',
      borderColor: '#0ea5e9',
      borderWidth: 2,
      pointBackgroundColor: '#0ea5e9',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#0ea5e9',
      fill: true,
      tension: 0.4,
      data: props.game.history
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      titleColor: '#f8fafc',
      bodyColor: '#e2e8f0',
      padding: 10,
      cornerRadius: 8,
      displayColors: false,
    }
  },
  scales: {
    y: {
      grid: { color: 'rgba(255, 255, 255, 0.05)' },
      ticks: { color: '#94a3b8' }
    },
    x: {
      grid: { display: false },
      ticks: { color: '#94a3b8' }
    }
  }
}
</script>

<template>
  <div class="glass-panel rate-dashboard animate-fade" style="animation-delay: 0.1s;">
    <div class="rate-header">
      <div class="rate-title">
        <h3>目前匯率</h3>
        <p class="subtitle">{{ game.name }} - {{ game.server }}</p>
      </div>
      <div class="rate-value">
        <span class="fiat">1 TWD = </span>
        <span class="gold">{{ formatNumber(game.rate) }}</span>
        <span class="unit">幣</span>
      </div>
    </div>
    
    <div class="change-indicator" :class="game.dailyChange >= 0 ? 'up' : 'down'">
      <span class="icon">{{ game.dailyChange >= 0 ? '▲' : '▼' }}</span>
      <span class="text">24H 漲跌幅: {{ Math.abs(game.dailyChange) }}%</span>
    </div>

    <div class="chart-container">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>
.rate-dashboard {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.rate-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.rate-title h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
}

.subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.rate-value {
  text-align: right;
}

.fiat {
  color: var(--text-muted);
  font-size: 1rem;
}

.gold {
  font-size: 2.25rem;
  font-weight: 800;
  font-family: 'Outfit', sans-serif;
  color: var(--secondary-color);
  text-shadow: 0 0 20px rgba(14, 165, 233, 0.4);
}

.unit {
  font-size: 1rem;
  color: var(--text-muted);
  margin-left: 0.2em;
}

.change-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  width: fit-content;
}

.change-indicator.up {
  background: rgba(34, 197, 94, 0.1);
  color: var(--accent-up);
}

.change-indicator.down {
  background: rgba(239, 68, 68, 0.1);
  color: var(--accent-down);
}

.chart-container {
  flex: 1;
  min-height: 250px;
  position: relative;
  width: 100%;
}
</style>
