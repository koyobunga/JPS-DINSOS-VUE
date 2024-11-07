import { defineStore } from 'pinia'

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useAuthStore = defineStore('auth', {
  // a function that returns a fresh state
  state: () => ({
    user : '',
    token: '',
    sesi: ''
  }),
  // optional getters
  getters: {
   
  },
  // optional actions
  actions: {
   
    reset() {
      // `this` is the store instance
      this.counter = 0
    },
  },
})