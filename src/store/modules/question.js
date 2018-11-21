import config from '../../config/config'
import axios from 'axios'
const GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS'
const SELECT_QUESTION = 'SELECT_QUESTION'
const state = {
  questions: [

  ],
  selectedQuestion: {

  },
  introQuestions: [

  ],
  coreQuestions: [

  ]
}

const mutations = {
  [GET_ALL_QUESTIONS] (state, questions) {
    console.log('questions', questions)
    state.questions = questions
  },

  [SELECT_QUESTION] (state, question) {
    state.selectedQuestion = question
    state.introQuestions = question.introQuestions
    state.coreQuestions = question.coreQuestions
    console.log('state', state)
  }
}

const getters = {
  hasIntroQuestion: state => {
    if (state.introQuestions.length <= 0) {
      return false
    }
    return true
  },
  getIntroQuestionById: state => (id) => {
    console.log('introQuestions[id]', id)
    console.log('state.introQuestion', state.introQuestions)
    return state.introQuestions[id]
  },
  getCoreQuestionById: state => (id) => {
    console.log('coreQuestions[id]', id)
    console.log('state.coreQuestion', state.coreQuestions)
    return state.coreQuestions[id]
  }
}

const actions = {
  getAllQuestions ({commit}) {
    axios.get(config.api.question)
      .then(res => {
        console.log('inside getAllQuestions Acions:', res.data.questions)
        commit('GET_ALL_QUESTIONS', res.data.questions)
      })
    // wx.request({
    //   method: 'GET',
    //   url: config.api.question,
    //   success: (res) => {
    //     console.log('inside wxrequest', res.data.questions)
    //     commit('GET_ALL_QUESTIONS', res.data.questions)
    //   }
    // })
  },
  selectQuestion ({state, commit}, question) {
    let selectedQuestion = question
    // state.questions.map((index,question)=>{
    //     if(question.type==type){
    //         selectedQuestion=question
    //     }
    // })
    commit('SELECT_QUESTION', question)
  }
}

export default{
  state,
  getters,
  mutations,
  actions
}
