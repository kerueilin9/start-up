<script setup lang="ts">
import { ref, watch } from 'vue'

interface Game {
  id: string;
  name: string;
  server: string;
  rate: number;
  dailyChange: number;
  history: number[];
}

const props = defineProps<{ game: Game }>()

const twdAmount = ref<number | ''>(100)
const goldAmount = ref<number | ''>(props.game.rate * 100)

let isTypingTwd = false

const onTwdInput = () => {
  isTypingTwd = true
  if (twdAmount.value !== '' && typeof twdAmount.value === 'number' && twdAmount.value >= 0) {
    goldAmount.value = Math.floor(twdAmount.value * props.game.rate)
  } else {
    goldAmount.value = ''
  }
}

const onGoldInput = () => {
  isTypingTwd = false
  if (goldAmount.value !== '' && typeof goldAmount.value === 'number' && goldAmount.value >= 0) {
    twdAmount.value = Number((goldAmount.value / props.game.rate).toFixed(2))
  } else {
    twdAmount.value = ''
  }
}

watch(() => props.game.rate, (newRate) => {
  if (isTypingTwd) {
     goldAmount.value = twdAmount.value !== '' ? Math.floor(Number(twdAmount.value) * newRate) : ''
  } else {
     twdAmount.value = goldAmount.value !== '' ? Number((Number(goldAmount.value) / newRate).toFixed(2)) : ''
  }
})

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('zh-TW').format(num)
}
</script>

<template>
  <div class="glass-panel calculator animate-fade" style="animation-delay: 0.2s;">
    <h3 class="calc-title">換算計算機</h3>
    
    <div class="input-group">
      <label>您有 (新台幣 TWD)</label>
      <div class="input-wrapper">
        <span class="currency-symbol">NT$</span>
        <input 
          type="number" 
          v-model="twdAmount" 
          @input="onTwdInput"
          min="0"
          placeholder="0"
        >
      </div>
    </div>
    
    <div class="swap-icon">
      <span>⇅</span>
    </div>
    
    <div class="input-group">
      <label>可換得 (遊戲幣)</label>
      <div class="input-wrapper focus-gold">
        <span class="currency-symbol">G</span>
        <input 
          type="number" 
          v-model="goldAmount" 
          @input="onGoldInput"
          min="0"
          placeholder="0"
        >
      </div>
    </div>
    
    <div class="summary">
      <p>目前比率: <strong>1 : {{ formatNumber(game.rate) }}</strong></p>
    </div>
  </div>
</template>

<style scoped>
.calculator {
  padding: 2rem;
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%);
}

.calc-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: var(--text-main);
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.2s;
}

.input-wrapper:focus-within {
  border-color: var(--secondary-color);
  box-shadow: 0 0 0 1px var(--secondary-color);
}

.input-wrapper.focus-gold:focus-within {
  border-color: #a855f7;
  box-shadow: 0 0 0 1px #a855f7;
}

.currency-symbol {
  padding: 0 1rem;
  color: var(--text-muted);
  font-weight: 600;
  background: rgba(255, 255, 255, 0.05);
  height: 100%;
  display: flex;
  align-items: center;
}

input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-main);
  font-size: 1.25rem;
  font-weight: 600;
  padding: 0.75rem 1rem;
  outline: none;
  width: 100%;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.swap-icon {
  text-align: center;
  color: var(--text-muted);
  font-size: 1.5rem;
  margin: 0.5rem 0;
}

.summary {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.summary strong {
  color: var(--secondary-color);
}
</style>
