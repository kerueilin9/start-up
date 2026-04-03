import { defineStore } from 'pinia'

interface HomepageState {
  keyword: string
  activeCategory: string
}

export const useHomepageStore = defineStore('homepage', {
  state: (): HomepageState => ({
    keyword: '',
    activeCategory: 'all game',
  }),
  actions: {
    setCategory(category: string) {
      this.activeCategory = category
    },
    setKeyword(keyword: string) {
      this.keyword = keyword
    },
  },
})
