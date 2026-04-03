<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
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
  return 'danger'
}

const handleCategorySelect = (category: string) => {
  homepageStore.setCategory(category)
}

const accountOptions = [
  { label: '個人資料', key: 'profile' },
  { label: '設定', key: 'settings' },
  { label: '登出', key: 'signout', divided: true },
]

const handleAccountSelect = (command: string) => {
  void command
}
</script>

<template>
  <div class="home-page min-h-screen">
    <div class="background-orb orb-a"></div>
    <div class="background-orb orb-b"></div>

    <header class="top-nav panel">
      <div class="brand">GFX</div>
      <nav class="nav-list" aria-label="主導覽">
        <el-button
          v-for="(item, idx) in navItems"
          :key="`${item}-${idx}`"
          class="nav-item"
          text
          size="default"
        >{{ item }}</el-button>
      </nav>
      <el-button class="sign-btn" size="default">sign in</el-button>
    </header>

    <div class="layout-content">
      <section class="search-strip panel" aria-label="搜尋與分類">
        <div class="search-wrap">
          <el-input
            v-model="keyword"
            class="search-field"
            placeholder="搜尋遊戲 / 伺服器"
            clearable
          >
            <template #prefix>
              <span class="search-icon">⌕</span>
            </template>
          </el-input>
        </div>

        <div class="category-list" role="tablist" aria-label="分類">
          <el-button
            v-for="category in categories"
            :key="category"
            :class="['category-chip', { active: category === activeCategory }]"
            @click="handleCategorySelect(category)"
            size="small"
            text
          >{{ category }}</el-button>
        </div>

        <el-dropdown
          trigger="click"
          @command="handleAccountSelect"
          placement="bottom-end"
        >
          <el-button class="account-btn" aria-label="帳號選單">
            <span class="account-avatar" aria-hidden="true">👤</span>
            <span class="account-label">My Account</span>
            <span class="account-caret" aria-hidden="true">⌄</span>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="opt in accountOptions"
                :key="opt.key"
                :command="opt.key"
                :divided="opt.divided"
              >{{ opt.label }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </section>

      <main class="content-layout">
        <aside class="left-rail">
          <el-tag class="rail-label" size="small" round>game item</el-tag>
          <el-card class="spotlight panel" shadow="never">
            <div class="thumb"></div>
            <h3>{{ topMover.name }}</h3>
            <p>{{ topMover.server }}</p>
            <el-tag class="spotlight-tag" type="success" round size="small">
              今日波動 +{{ topMover.dailyChange }}%
            </el-tag>
          </el-card>
        </aside>

        <el-card class="center-feed panel" shadow="never">
          <div class="feed-header">
            <h1>GameForex 首頁導覽</h1>
            <p class="muted-text">即時比價、風險提示與廠商導流整合</p>
          </div>

          <div class="game-grid">
            <el-card
              v-for="game in filteredGames"
              :key="game.id"
              class="game-card"
              shadow="hover"
            >
              <template #default>
                <div class="card-cover"></div>
                <div class="card-body">
                  <h2>{{ game.name }}</h2>
                  <p class="server">{{ game.server }}</p>

                  <div class="meta-row">
                    <span class="rate">1 TWD : {{ formatRate(game.rate) }}</span>
                    <span :class="['change', game.dailyChange >= 0 ? 'up' : 'down']">
                      {{ game.dailyChange >= 0 ? '+' : '' }}{{ game.dailyChange }}%
                    </span>
                  </div>

                  <div class="meta-row">
                    <el-tag :type="getRiskTagType(game.riskLevel)" size="small" round>
                      {{ game.riskLevel }}風險
                    </el-tag>
                    <el-tag class="vendors" size="small" round>{{ game.vendorCount }} 家供應</el-tag>
                  </div>
                </div>
              </template>
            </el-card>
          </div>

          <div class="feed-footer">
            <el-button class="more-btn" size="small">more game</el-button>
          </div>
        </el-card>

        <aside class="right-rail panel">
          <el-card class="insight-box" shadow="never">
            <h3>市場速報</h3>
            <p class="muted-text">高波動遊戲建議每 2 小時刷新，低波動遊戲每日更新。</p>
          </el-card>
          <el-card class="insight-box" shadow="never">
            <h3>風險提示</h3>
            <p class="muted-text">代儲交易前請先確認遊戲政策，避免高風險伺服器操作。</p>
          </el-card>
        </aside>
      </main>
    </div>

    <footer class="page-footer">
      <span>© 2026 GameForex. Data for navigation and reference only.</span>
    </footer>
  </div>
</template>

<style scoped>
/* ── Layout shell ── */
.home-page {
  position: relative;
  overflow: hidden;
  padding: 0 0 2rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ── Background orbs ── */
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

/* ── Glass panel (shared) ── */
.panel {
  background: rgba(18, 20, 28, 0.84);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
}

/* ── Top nav ── */
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

.nav-list {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  overflow-x: auto;
  scrollbar-width: none;
}
.nav-list::-webkit-scrollbar { display: none; }

/* ── Nav buttons (el-button text mode) ── */
.nav-item.el-button {
  color: #b4aeb3;
  font-size: 0.82rem;
  min-width: 120px;
  border-radius: 0;
  white-space: nowrap;
  height: 38px;
  padding: 0 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid transparent;
}
.nav-item.el-button:hover,
.nav-item.el-button:focus {
  background: rgba(255, 255, 255, 0.12);
  color: #f2f4f8;
  border-color: transparent;
}

/* ── Sign-in / More buttons ── */
.sign-btn.el-button,
.more-btn.el-button {
  border-radius: 0;
  font-size: 0.8rem;
  height: 38px;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.08);
  color: #e8ebf3;
  transition:
    transform 0.15s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}
.sign-btn.el-button:hover,
.more-btn.el-button:hover {
  background: rgba(255, 255, 255, 0.16);
  border-color: rgba(255, 255, 255, 0.2);
  color: #f2f4f8;
  transform: translateY(-1px);
}
.more-btn.el-button {
  height: 32px;
  font-size: 0.78rem;
}

/* ── Layout content wrapper ── */
.layout-content {
  position: relative;
  z-index: 1;
  min-height: 800px;
  padding-bottom: 1rem;
}

/* ── Search strip ── */
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

.search-wrap { width: 100%; }

/* ── Search field (el-input deep overrides) ── */
.search-field {
  width: 100%;
}
.search-field :deep(.el-input__wrapper) {
  border-radius: 0;
  background: rgba(245, 245, 245, 0.92);
  box-shadow: none;
  transition: box-shadow 0.25s ease;
}
.search-field :deep(.el-input__wrapper:hover) {
  box-shadow: none;
}
.search-field :deep(.el-input__wrapper.is-focus) {
  box-shadow:
    0 0 0 2px rgba(45, 212, 191, 0.45),
    0 0 14px rgba(45, 212, 191, 0.18);
}
.search-field :deep(.el-input__inner) {
  color: #1e2432;
}
.search-field :deep(.el-input__prefix-inner) {
  color: #555e72;
}
.search-icon {
  font-size: 1.05rem;
  line-height: 1;
}

/* ── Category list ── */
.category-list {
  display: flex;
  gap: 0.4rem;
  min-width: 0;
  overflow-x: auto;
  flex-wrap: nowrap;
  scrollbar-width: none;
}
.category-list::-webkit-scrollbar { display: none; }

/* ── Category chip ── */
.category-chip.el-button {
  color: #bbb0b3;
  font-size: 0.78rem;
  white-space: nowrap;
  border-radius: 0;
  height: 34px;
  padding: 0 16px;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.05);
  transition:
    transform 0.15s ease,
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}
.category-chip.el-button:hover,
.category-chip.el-button:focus {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.18);
  color: #f0f1f5;
  transform: translateY(-1px);
}
.category-chip.el-button.active {
  font-weight: 700;
  background: rgba(45, 212, 191, 0.18);
  border-color: rgba(45, 212, 191, 0.45);
  color: #a8f5ec;
  box-shadow:
    0 0 0 1px rgba(45, 212, 191, 0.4),
    0 0 10px rgba(45, 212, 191, 0.15);
}
.category-chip.el-button.active:hover {
  background: rgba(45, 212, 191, 0.24);
  border-color: rgba(45, 212, 191, 0.6);
  color: #d4faf6;
}

/* ── Account button ── */
.account-btn.el-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 148px;
  justify-self: end;
  white-space: nowrap;
  height: 38px;
  padding: 0 14px;
  border-radius: 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.07);
  color: #e0e4ef;
  font-size: 0.8rem;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}
.account-btn.el-button:hover {
  background: rgba(255, 255, 255, 0.13);
  border-color: rgba(255, 255, 255, 0.22);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  color: #f0f2f8;
}
.account-btn.el-button:active {
  transform: translateY(0);
  box-shadow: none;
}
.account-avatar {
  font-size: 1rem;
  line-height: 1;
  opacity: 0.85;
}
.account-label { flex: 1; text-align: left; }
.account-caret {
  font-size: 0.9rem;
  opacity: 0.6;
  transition: transform 0.2s ease;
}
.account-btn.el-button:hover .account-caret {
  transform: translateY(2px);
}

/* ── Content layout ── */
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
  animation: rise-in 0.65s ease-out;
}
.spotlight :deep(.el-card__body) {
  padding: 0.7rem;
}
.spotlight h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--text-main);
}
.spotlight p {
  margin: 0.2rem 0 0;
  color: #97a0b6;
  font-size: 0.85rem;
}
.spotlight-tag { margin-top: 0.65rem; }

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

/* ── Center feed ── */
.center-feed {
  border-radius: 12px;
  animation: rise-in 0.7s ease-out;
}
.center-feed :deep(.el-card__body) {
  padding: 1rem;
}
.feed-header h1 {
  margin: 0;
  font-size: 1.65rem;
  letter-spacing: 0.01em;
  color: var(--text-main);
}
.muted-text {
  margin: 0.25rem 0 1rem;
  color: #9ca5b9;
  font-size: 0.9rem;
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
  border-color: rgba(125, 211, 252, 0.45) !important;
}
.game-card :deep(.el-card__body) {
  padding: 0;
}
.card-cover {
  aspect-ratio: 4/3;
  background:
    linear-gradient(180deg, rgba(3, 7, 18, 0.25), rgba(3, 7, 18, 0.9)),
    radial-gradient(circle at 30% 20%, rgba(125, 211, 252, 0.35), transparent 38%),
    radial-gradient(circle at 75% 72%, rgba(45, 212, 191, 0.3), transparent 40%), #0f172a;
}
.card-body {
  padding: 0.65rem 0.75rem 0.75rem;
}
.card-body h2 {
  margin: 0;
  font-size: 0.95rem;
  color: var(--text-main);
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
.rate {
  color: #c9d0df;
  font-size: 0.78rem;
}
.vendors {
  font-size: 0.78rem;
}
.change {
  font-weight: 700;
  font-size: 0.78rem;
}
.change.up { color: #22c55e; }
.change.down { color: #f87171; }

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
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03) !important;
}
.insight-box :deep(.el-card__body) {
  padding: 0.8rem;
}
.insight-box h3 {
  margin: 0;
  font-size: 0.95rem;
  color: var(--text-main);
}
.insight-box .muted-text {
  display: block;
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-size: 0.8rem;
  color: #a8afc2;
  line-height: 1.55;
}

/* ── Footer ── */
.page-footer {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #8790a7;
  font-size: 0.78rem;
  padding: 1rem;
}

/* ── Keyframes ── */
@keyframes rise-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
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
