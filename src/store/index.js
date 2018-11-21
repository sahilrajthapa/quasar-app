import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import mtech from './modules/mtech'
import question from './modules/question'
import answer from './modules/answer'
import profile from './modules/profile'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  plugins: debug ? [
    createLogger()
  ] : [],
  modules: {
    mtech: {
      namespaced: true,
      ...mtech
    },
    question: {
      namespaced: true,
      ...question
    },
    answer: {
      namespaced: true,
      ...answer
    },
    profile: {
      namespaced: true,
      ...profile
    }
  }
})

export default store
