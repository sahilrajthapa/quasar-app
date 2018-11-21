const SET_MTECH = 'SET_MTECH'
const SET_MTECH_TOKEN = 'SET_MTECH_TOKEN'

const state = {
  mtechInfo: {},
  mtechToken: ''
}

const mutations = {
  [SET_MTECH] (state, mtechInfo) {
    state.mtechInfo = mtechInfo
  },
  [SET_MTECH_TOKEN] (state, mtechToken) {
    state.mtechToken = mtechToken
  }
}

const actions = {
  setMtech ({commit}, mtechInfo) {
    commit(SET_MTECH, mtechInfo)
  },
  setMtechToken ({commit}, mtechToken) {
    commit(SET_MTECH_TOKEN, mtechToken)
  }
}

export default{
  state,
  mutations,
  actions
}
