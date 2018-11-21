<template>
  <div class="page">
   <p v-if="currentQuestion === 'intro'">
     {{introCount+1 + " out of "+introQuestions.length}}
   </p>
   <p v-else>
     {{coreCount+1 + " out of "+coreQuestions.length}}
   </p>
   <question :question="question" :inputValue="inputValue" :inputChange="inputChange" :finishIntro="finishIntro" :finishCore="finishCore" @getValue="nextQuestion" :prevQuestion="prevQuestion"/>
  </div>
</template>

<script>
import question from 'components/question'
import {mapGetters, mapActions, mapState} from 'vuex'
import config from '../config/config'

export default {
  components: {
    question
  },
  data () {
    return {
      question: {},
      introCount: 0,
      coreCount: 0,
      finishIntro: false,
      finishCore: false,
      currentQuestion: '',
      inputValue: ''
    }
  },

  computed: {
    ...mapState('question', [
      'selectedQuestion',
      'introQuestions',
      'coreQuestions'
    ]),

    ...mapState('profile', [
      'sid'
    ]),

    ...mapState('answer', [
      'answer'
    ]),

    ...mapGetters('question', [
      'hasIntroQuestion',
      'getIntroQuestionById',
      'getCoreQuestionById'
    ])
  },

  methods: {
    ...mapActions('answer', [
      'setUpAnswer',
      'pushIntro',
      'pushCore'
    ]),

    setAnswer (value) {
      let question = this.question
      let noOptionId
      if (question.formType === 'text') {
        noOptionId = true
      }

      let subanswer = []

      // setting answer logic for text and radio button
      if (question.formType === 'text' || question.formType === 'radio') {
        subanswer = [{
          // if formtype text then only opton id is needed
          'optionId': (noOptionId) ? '' : question.options[this.inputValue]._id,

          // if formtype text then value is set to the form bind value else option label
          'value': (noOptionId) ? this.inputValue : question.options[this.inputValue].label
        }]
      // setting answer logic for multiselect answer
      } else if (question.formType === 'multi-select') {
        this.inputValue.map((key, index) => {
          subanswer.push({
            'optionId': question.options[key]._id,
            'value': (question.options[key].formType === 'checkbox')
              ? question.options[key].label : value[question.options[key].label]
          })
        })
      }

      var answer = {
        questionId: question._id,
        label: question.label,
        answer: subanswer
      }

      // setting value of input to "" to avoid value of previous form to become initia value of current
      this.inputValue = ''

      if (this.currentQuestion === 'intro') {
        this.pushIntro(answer)
      } else if (this.currentQuestion === 'core') {
        this.pushCore(answer)
        console.log(this.finishCore)
        if (this.finishCore) {
          this.confirmFinalSubmit()
        }
      }
    },

    confirmFinalSubmit (cb) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Do you want to submit your answers?',
        ok: 'Agree',
        cancel: 'Disagree'
      }).then(() => {
        this.sendAnswerToApi()
      }).catch(() => {
        this.$q.notify('Disagreed...')
      })
    },

    sendAnswerToApi () {
      let _this = this
      let option = {
        answers: this.answer
      }
      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
      _this.$axios
        .post(config.api.answer, option, { headers: headers })
        .then(res => {
          _this.$q.dialog({
            title: 'Success',
            message: 'Your answer has been submitted successfully.'
          })
            .then(() => _this.$router.replace('/questions'))
        })
        .catch(() => {
          _this.$q.dialog({
            title: 'Error',
            message: 'Your answer has not been submitted.'
          })
        })
    },

    inputChange (e) {
      this.inputValue = e.target.value
    },

    nextQuestion (val) {
      // separating the form value from key value pair of form
      this.inputValue = val
      this.setAnswer(val)
      if (this.currentQuestion === 'intro') {
        // push intro answer
        if (this.finishIntro) {
          return this.setCoreQuestion()
        }
        this.introCount = this.introCount + 1
        this.setIntroQuestion()
      } else {
        if (!this.finishCore) {
          this.coreCount = this.coreCount + 1
          this.setCoreQuestion()
        }
      }
    },
    prevQuestion () {
      if (this.currentQuestion === 'intro' && this.introCount >= 1) {
        this.introCount--
        this.finishIntro = false
        this.setIntroQuestion()
      } else if (this.currentQuestion === 'core' && this.coreCount >= 1) {
        this.coreCount--
        this.finishCore = false
        this.setCoreQuestion()
      }
    },

    setIntroQuestion () {
      if (this.introCount === 0) {
        this.currentQuestion = 'intro'
      }
      this.question = this.getIntroQuestionById(this.introCount)
      if (this.introCount + 1 >= this.introQuestions.length) {
        this.finishIntro = true
      }
    },

    setCoreQuestion () {
      if (this.coreCount === 0) {
        this.currentQuestion = 'core'
      }
      this.question = this.getCoreQuestionById(this.coreCount)
      if (this.coreCount + 1 >= this.coreQuestions.length) {
        this.finishCore = true
      }
    },

    setQuestion () {
      if (this.hasIntroQuestion && !this.finishIntro) {
        this.setIntroQuestion()
      } else {
        this.setCoreQuestion()
      }
    }
  },

  mounted () {
    this.introCount = 0
    this.coreCount = 0
    this.currentQuestion = ''
    // step 1
    this.setQuestion()
    this.setUpAnswer({
      questionSetId: this.selectedQuestion._id,
      type: this.selectedQuestion.type,
      completedBy: this.sid
    })
  },

  destroyed () {
    this.introCount = 0
    this.coreCount = 0
    this.currentQuestion = ''
  }
}
</script>

<style>

</style>
