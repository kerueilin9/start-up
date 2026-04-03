<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import {
  NButton,
  NCard,
  NDropdown,
  NInput,
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NTag,
  NText,
} from 'naive-ui'
import { useHomepageStore } from '@/stores/useHomepageStore'

interface GameCard {
  id: string
  name: string
  server: string
  category: string
  rate: number
  dailyChange: number
  riskLevel: '低' | '中' | '高'
  vendorCount: number
}

const navItems = ['all game', 'game item', 'game item', 'game item', 'more game']
const categories = ['all game', 'MMORPG', '手遊', 'PC', '熱門代儲']

const homepageStore = useHomepageStore()
const { keyword, activeCategory } = storeToRefs(homepageStore)

const games: GameCard[] = [
  {
    id: 'ms-aria',
    name: '新楓之谷',
    server: '艾麗亞',
    category: 'PC',
    rate: 15500000,
    dailyChange: 2.5,
    riskLevel: '中',
    vendorCount: 11,
  },
  {
    id: 'ms-luna',
    name: '新楓之谷',
    server: '優依娜',
    category: 'PC',
    rate: 16200000,
    dailyChange: -0.5,
    riskLevel: '中',
    vendorCount: 8,
  },
  {
    id: 'lineage-m',
    name: '天堂M',
    server: '伊娃',
    category: 'MMORPG',
    rate: 450,
    dailyChange: -1.2,
    riskLevel: '高',
    vendorCount: 15,
  },
  {
    id: 'wow-shadow',
    name: '魔獸世界',
    server: '暗影之月',
    category: 'PC',
    rate: 25000,
    dailyChange: 0.8,
    riskLevel: '低',
    vendorCount: 9,
  },
  {
    id: 'diablo4',
    name: '暗黑破壞神 IV',
    server: '亞服',
    category: 'MMORPG',
    rate: 9300,
    dailyChange: 1.1,
    riskLevel: '中',
    vendorCount: 6,
  },
  {
    id: 'valorant',
    name: '特戰英豪',
    server: '亞太',
    category: '手遊',
    rate: 1280,
    dailyChange: -0.2,
    riskLevel: '低',
    vendorCount: 5,
  },
  {
    id: 'genshin',
    name: '原神',
    server: '亞洲',
    category: '手遊',
    rate: 86,
    dailyChange: 3.4,
    riskLevel: '中',
    vendorCount: 14,
  },
  {
    id: 'fifa',
    name: 'EA SPORTS FC',
    server: '國際',
    category: 'PC',
    rate: 5400,
    dailyChange: -1.8,
    riskLevel: '低',
    vendorCount: 7,
  },
  {
    id: 'lostark',
    name: '失落的方舟',
    server: '卡丹',
    category: 'MMORPG',
    rate: 67000,
    dailyChange: 1.7,
    riskLevel: '中',
    vendorCount: 10,
  },
]

const filteredGames = computed(() => {
  return games.filter((game) => {
    const matchCategory =
      activeCategory.value === 'all game' || game.category === activeCategory.value
    const key = keyword.value.trim().toLowerCase()
    const matchKeyword = !key || `${game.name} ${game.server}`.toLowerCase().includes(key)
    return matchCategory && matchKeyword
  })
})

const topMover = computed(() => {
  return [...games].sort((a, b) => b.dailyChange - a.dailyChange)[0]
})

const formatRate = (value: number) => new Intl.NumberFormat('zh-TW').format(value)

const getRiskTagType = (riskLevel: GameCard['riskLevel']) => {
  if (riskLevel === '低') return 'success'
  if (riskLevel === '中') return 'warning'
  return 'error'
}

const handleCategorySelect = (category: string) => {
  homepageStore.setCategory(category)
}

const accountOptions = [
  { label: '個人資料', key: 'profile' },
  { label: '設定', key: 'settings' },
  { type: 'divider', key: 'd1' },
  { label: '登出', key: 'signout' },
]

const handleAccountSelect = (key: string | number) => {
  if (key === 'profile' || key === 'settings' || key === 'signout') {
    return
  }
}
</script>

<template>
    <NLayout class="home-page min-h-screen" :native-scrollbar="false">
      <div class="background-orb orb-a"></div>
      <div class="background-orb orb-b"></div>

      <NLayoutHeader class="top-nav panel">
        <div class="brand">GFX</div>
        <nav class="nav-list" aria-label="主導覽">
          <NButton
            v-for="(item, idx) in navItems"
            :key="`${item}-${idx}`"
            class="nav-item"
            quaternary
            size="medium"
          >
            {{ item }}
          </NButton>
        </nav>
        <NButton class="sign-btn" size="medium" secondary>sign in</NButton>
      </NLayoutHeader>

      <NLayoutContent class="min-h-[800px] pb-4">
        <section class="search-strip panel" aria-label="搜尋與分類">
          <div class="w-full">
            <NInput
              v-model:value="keyword"
              class="search-field"
              placeholder="搜尋遊戲 / 伺服器"
              clearable
            >
              <template #prefix>
                <span class="search-icon">⌕</span>
              </template>
            </NInput>
          </div>

          <div class="category-list" role="tablist" aria-label="分類">
            <NButton
              v-for="category in categories"
              :key="category"
              :class="['category-chip', { active: category === activeCategory }]"
              @click="handleCategorySelect(category)"
              :type="category === activeCategory ? 'primary' : 'default'"
              secondary
              size="medium"
            >
              {{ category }}
            </NButton>
          </div>

          <NDropdown
            trigger="click"
            :options="accountOptions"
            @select="handleAccountSelect"
            placement="bottom-end"
          >
            <NButton class="account-btn" aria-label="帳號選單">
              <span class="account-avatar" aria-hidden="true">👤</span>
              <span class="account-label">My Account</span>
              <span class="account-caret" aria-hidden="true">⌄</span>
            </NButton>
          </NDropdown>
        </section>

        <main class="content-layout">
          <aside class="left-rail">
            <NTag class="rail-label panel" size="small" round>game item</NTag>
            <NCard class="spotlight panel" size="small" :bordered="false">
              <div class="thumb"></div>
              <h3>{{ topMover.name }}</h3>
              <p>{{ topMover.server }}</p>
              <NTag class="spotlight-tag" type="success" round size="small"
                >今日波動 +{{ topMover.dailyChange }}%</NTag
              >
            </NCard>
          </aside>

          <NCard class="center-feed panel" size="small" :bordered="false">
            <div class="feed-header">
              <h1>GameForex 首頁導覽</h1>
              <NText depth="3">即時比價、風險提示與廠商導流整合</NText>
            </div>

            <div class="game-grid">
              <NCard
                v-for="game in filteredGames"
                :key="game.id"
                class="game-card"
                size="small"
                hoverable
              >
                <div class="card-cover"></div>
                <div class="card-body">
                  <h2>{{ game.name }}</h2>
                  <p class="server">{{ game.server }}</p>

                  <div class="meta-row">
                    <NText class="rate">1 TWD : {{ formatRate(game.rate) }}</NText>
                    <span :class="['change', game.dailyChange >= 0 ? 'up' : 'down']">
                      {{ game.dailyChange >= 0 ? '+' : '' }}{{ game.dailyChange }}%
                    </span>
                  </div>

                  <div class="meta-row">
                    <NTag :type="getRiskTagType(game.riskLevel)" size="small" round
                      >{{ game.riskLevel }}風險</NTag
                    >
                    <NTag class="vendors" size="small" round>{{ game.vendorCount }} 家供應</NTag>
                  </div>
                </div>
              </NCard>
            </div>

            <div class="feed-footer">
              <NButton class="more-btn" size="small" secondary>more game</NButton>
            </div>
          </NCard>

          <aside class="right-rail panel">
            <NCard class="insight-box" size="small" :bordered="false">
              <h3>市場速報</h3>
              <NText depth="3">高波動遊戲建議每 2 小時刷新，低波動遊戲每日更新。</NText>
            </NCard>
            <NCard class="insight-box" size="small" :bordered="false">
              <h3>風險提示</h3>
              <NText depth="3">代儲交易前請先確認遊戲政策，避免高風險伺服器操作。</NText>
            </NCard>
          </aside>
        </main>

    </NLayoutContent>
    <NLayoutFooter class="page-footer">
      <NText depth="3">© 2026 GameForex. Data for navigation and reference only.</NText>
    </NLayoutFooter>
    </NLayout>
</template>

<style scoped>
/* ── Layout shells ── */
.home-page {
  position: relative;
  overflow: hidden;
  padding: 0 0 2rem;
  display: flex;
  flex-direction: column;
}

/* ── Background orbs (complex filter + gradient — cannot use Tailwind) ── */
.background-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(80px);
  opacity: 0.25;
  pointer-events: none;
}
.orb-a {
  width: 380px;
  height: 380px;
  background: #2dd4bf;
  top: -120px;
  left: -120px;
}
.orb-b {
  width: 420px;
  height: 420px;
  background: #f59e0b;
  bottom: -180px;
  right: -120px;
}

/* ── Glass panel (backdrop-filter + rgba border) ── */
.panel {
  background: rgba(18, 20, 28, 0.84);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
}

/* ── Top nav (clamp padding + animation) ── */
.top-nav {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.7rem;
  align-items: center;
  padding: 0.55rem clamp(1rem, 4vw, 3rem);
  border-radius: 0;
  animation: rise-in 0.5s ease-out;
}

/* ── Brand block ── */
.brand {
  background: #e86d73;
  color: #0c101a;
  font-weight: 800;
  min-width: 112px;
  text-align: center;
  padding: 0.45rem 0.9rem;
  border-radius: 0;
  letter-spacing: 0.08em;
}

/* ── Nav list (scrollbar hide) ── */
.nav-list {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  overflow-x: auto;
  scrollbar-width: none;
}
.nav-list::-webkit-scrollbar {
  display: none;
}

/* ── Naive UI button overrides (CSS vars — cannot use Tailwind) ── */
.nav-item {
  color: #b4aeb3;
  font-size: 0.82rem;
  min-width: 120px;
  border-radius: 0;
  white-space: nowrap;
  --n-color: rgba(255, 255, 255, 0.06);
  --n-color-hover: rgba(255, 255, 255, 0.12);
  --n-color-pressed: rgba(255, 255, 255, 0.16);
  --n-color-focus: rgba(255, 255, 255, 0.1);
  --n-border: 1px solid transparent;
  --n-border-hover: 1px solid transparent;
  --n-border-pressed: 1px solid transparent;
  --n-border-focus: 1px solid transparent;
  --n-text-color: #bdb0b5;
  --n-text-color-hover: #f2f4f8;
  --n-text-color-pressed: #f2f4f8;
  --n-text-color-focus: #f2f4f8;
  --n-padding: 0 14px;
  --n-height: 38px;
}
.nav-item:deep(.n-button__content) {
  width: 100%;
  justify-content: center;
}

.sign-btn,
.account-btn,
.more-btn {
  border-radius: 0;
  font-size: 0.8rem;
  --n-height: 38px;
  --n-padding: 0 16px;
  --n-border: 1px solid rgba(255, 255, 255, 0.12);
  --n-border-hover: 1px solid rgba(255, 255, 255, 0.2);
  --n-border-focus: 1px solid rgba(255, 255, 255, 0.2);
  --n-border-pressed: 1px solid rgba(255, 255, 255, 0.2);
  --n-color: rgba(255, 255, 255, 0.08);
  --n-color-hover: rgba(255, 255, 255, 0.16);
  --n-color-focus: rgba(255, 255, 255, 0.16);
  --n-color-pressed: rgba(255, 255, 255, 0.2);
  --n-text-color: #e8ebf3;
}
.sign-btn:hover,
.account-btn:hover,
.more-btn:hover {
  transform: translateY(-1px);
}

/* ── Search strip (clamp padding + named grid) ── */
.search-strip {
  position: relative;
  z-index: 2;
  margin-top: 0.2rem;
  border-radius: 0;
  display: grid;
  grid-template-columns: minmax(220px, 280px) minmax(0, 1fr) auto;
  gap: 0.65rem;
  align-items: center;
  padding: 0.5rem clamp(1rem, 4vw, 3rem);
  animation: rise-in 0.6s ease-out;
}

/* ── Search field (deep selector + glow focus) ── */
.search-field {
  width: 100%;
  transition: box-shadow 0.25s ease;
}
.search-field:deep(.n-input-wrapper) {
  border-radius: 0;
  background: rgba(245, 245, 245, 0.9);
  border: none;
  transition: box-shadow 0.25s ease;
}
.search-field:deep(.n-input-wrapper):focus-within {
  box-shadow:
    0 0 0 2px rgba(45, 212, 191, 0.45),
    0 0 14px rgba(45, 212, 191, 0.18);
}
.search-field:deep(.n-input__input-el) {
  color: #1e2432;
}
.search-field:deep(.n-base-icon) {
  color: #1e2432;
}
.search-icon {
  font-size: 1.05rem;
  color: #555e72;
  line-height: 1;
}

/* ── Category list (scrollbar hide) ── */
.category-list {
  display: flex;
  gap: 0.4rem;
  min-width: 0;
  overflow-x: auto;
  flex-wrap: nowrap;
  scrollbar-width: none;
}
.category-list::-webkit-scrollbar {
  display: none;
}

/* ── Category chip (Naive UI var overrides + glow active) ── */
.category-chip {
  color: #bbb0b3;
  font-size: 0.78rem;
  white-space: nowrap;
  border-radius: 0;
  transition:
    transform 0.15s ease,
    opacity 0.15s ease;
  --n-height: 34px;
  --n-padding: 0 16px;
  --n-border: 1px solid transparent;
  --n-border-hover: 1px solid rgba(255, 255, 255, 0.18);
  --n-border-focus: 1px solid rgba(255, 255, 255, 0.18);
  --n-border-pressed: 1px solid rgba(255, 255, 255, 0.2);
  --n-color: rgba(255, 255, 255, 0.05);
  --n-color-hover: rgba(255, 255, 255, 0.12);
  --n-color-focus: rgba(255, 255, 255, 0.12);
  --n-color-pressed: rgba(255, 255, 255, 0.16);
  --n-text-color: #aaa0a5;
  --n-text-color-hover: #f0f1f5;
  --n-text-color-pressed: #f0f1f5;
}
.category-chip:hover {
  transform: translateY(-1px);
}
.category-chip.active {
  font-weight: 700;
  box-shadow:
    0 0 0 1px rgba(45, 212, 191, 0.5),
    0 0 10px rgba(45, 212, 191, 0.15);
  --n-color: rgba(45, 212, 191, 0.18);
  --n-color-hover: rgba(45, 212, 191, 0.24);
  --n-color-focus: rgba(45, 212, 191, 0.24);
  --n-color-pressed: rgba(45, 212, 191, 0.3);
  --n-border: 1px solid rgba(45, 212, 191, 0.45);
  --n-border-hover: 1px solid rgba(45, 212, 191, 0.6);
  --n-text-color: #a8f5ec;
  --n-text-color-hover: #d4faf6;
}

/* ── Account button (rgba border/bg + multi-transition) ── */
.account-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 148px;
  justify-self: end;
  white-space: nowrap;
  padding: 0 14px;
  height: 38px;
  border-radius: 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.07);
  color: #e0e4ef;
  font-size: 0.8rem;
  font-family: inherit;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}
.account-btn:hover {
  background: rgba(255, 255, 255, 0.13);
  border-color: rgba(255, 255, 255, 0.22);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}
.account-btn:active {
  transform: translateY(0);
  box-shadow: none;
}
.account-avatar {
  font-size: 1rem;
  line-height: 1;
  opacity: 0.85;
}
.account-label {
  flex: 1;
  text-align: left;
}
.account-caret {
  font-size: 0.9rem;
  opacity: 0.6;
  transition: transform 0.2s ease;
}
.account-btn:hover .account-caret {
  transform: translateY(2px);
}

/* ── Content layout (clamp padding + named grid) ── */
.content-layout {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 190px 1fr 260px;
  gap: 1rem;
  margin: 1rem auto 0;
  max-width: 1280px;
  padding: 0 clamp(0.75rem, 3vw, 2rem);
}

/* ── Left rail ── */
.left-rail {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.rail-label {
  color: #b4bbcc;
  font-size: 0.78rem;
  justify-content: center;
}
.spotlight {
  border-radius: 10px;
  padding: 0.7rem;
  animation: rise-in 0.65s ease-out;
}

/* ── Thumb (complex radial gradient) ── */
.thumb {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 8px;
  background:
    linear-gradient(180deg, rgba(15, 23, 42, 0.35), rgba(2, 6, 23, 0.85)),
    radial-gradient(circle at 20% 15%, rgba(125, 211, 252, 0.4), transparent 40%),
    radial-gradient(circle at 80% 85%, rgba(245, 158, 11, 0.4), transparent 45%), #0c1320;
  margin-bottom: 0.7rem;
}
.spotlight h3 {
  margin: 0;
  font-size: 1rem;
}
.spotlight p {
  margin: 0.2rem 0 0;
  color: #97a0b6;
  font-size: 0.85rem;
}
.spotlight-tag {
  margin-top: 0.65rem;
}

/* ── Center feed ── */
.center-feed {
  border-radius: 12px;
  padding: 1rem;
  animation: rise-in 0.7s ease-out;
}
.feed-header h1 {
  margin: 0;
  font-size: 1.65rem;
  letter-spacing: 0.01em;
}
.feed-header p {
  margin: 0.25rem 0 1rem;
  color: #9ca5b9;
}

/* ── Game grid ── */
.game-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
}
.game-card {
  overflow: hidden;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}
.game-card:hover {
  transform: translateY(-2px);
  border-color: rgba(125, 211, 252, 0.45);
}

/* ── Card cover (complex radial gradient) ── */
.card-cover {
  aspect-ratio: 4/3;
  background:
    linear-gradient(180deg, rgba(3, 7, 18, 0.25), rgba(3, 7, 18, 0.9)),
    radial-gradient(circle at 30% 20%, rgba(125, 211, 252, 0.35), transparent 38%),
    radial-gradient(circle at 75% 72%, rgba(45, 212, 191, 0.3), transparent 40%), #0f172a;
}

/* ── Card body ── */
.card-body {
  padding: 0.65rem 0.75rem 0.75rem;
}
.card-body h2 {
  margin: 0;
  font-size: 0.95rem;
}
.server {
  margin: 0.18rem 0 0.55rem;
  color: #8f98ae;
  font-size: 0.78rem;
}
.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.35rem;
}
.rate,
.vendors {
  color: #c9d0df;
  font-size: 0.78rem;
}
.change {
  font-weight: 700;
  font-size: 0.78rem;
}
.change.up {
  color: #22c55e;
}
.change.down {
  color: #f87171;
}
.feed-footer {
  margin-top: 0.85rem;
  display: flex;
  justify-content: flex-end;
}

/* ── Right rail ── */
.right-rail {
  border-radius: 12px;
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  animation: rise-in 0.75s ease-out;
}
.insight-box {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.03);
}
.insight-box h3 {
  margin: 0;
  font-size: 0.95rem;
}
.insight-box p {
  margin: 0.5rem 0 0;
  font-size: 0.8rem;
  color: #a8afc2;
  line-height: 1.55;
}
.insight-box :deep(.n-text) {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  line-height: 1.55;
}

/* ── Footer ── */
.page-footer {
  position: relative;
  z-index: 2;
  margin-top: 0rem;
  text-align: center;
  color: #8790a7;
  font-size: 0.78rem;
}

/* ── Keyframes ── */
@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Responsive ── */
@media (max-width: 1180px) {
  .content-layout {
    grid-template-columns: 1fr;
  }
  .left-rail,
  .right-rail {
    order: 2;
  }
  .center-feed {
    order: 1;
  }
  .left-rail {
    display: grid;
    grid-template-columns: 130px 1fr;
    align-items: start;
  }
}

@media (max-width: 900px) {
  .search-strip {
    grid-template-columns: 1fr;
  }
  .account-btn {
    justify-self: start;
  }
  .category-list {
    overflow-x: visible;
    flex-wrap: wrap;
  }
  .game-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .top-nav {
    grid-template-columns: auto 1fr;
  }
  .sign-btn {
    grid-column: 1 / -1;
    justify-self: end;
  }
}

@media (max-width: 620px) {
  .home-page {
    padding: 0.9rem 0.75rem 1.6rem;
  }
  .game-grid {
    grid-template-columns: 1fr;
  }
  .feed-header h1 {
    font-size: 1.35rem;
  }
}
</style>
