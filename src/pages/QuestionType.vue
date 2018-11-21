<template>
  <div class="pg-container">
    <div v-if="questions.length > 0">
        <div class="weui-panel" v-for="(question, index) in questions" :key="index">
        <q-btn color="primary" class="full-width"  to="/single-question" @click="selectQuestion(question)">
          {{question.type}}
        </q-btn>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {

  },
  computed: {
    ...mapState('question', {
      questions: state => state.questions
    })
  },

  data () {
    return {
      logs: []
    }
  },

  methods: {
    ...mapActions('question', [
      'getAllQuestions',
      'selectQuestion'
    ]),
    formSubmit (e) {

    },
    inputChange (e) {

    },
    sliderChange (e) {

    },
    async getQuestions () {
      await this.getAllQuestions()
    }
  },
  mounted () {
    this.getQuestions()
  }
}

</script>

<style scoped>
.pg-container {
  padding: 70px 10px;
}
</style>
