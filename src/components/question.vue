<template>
    <div>
        <form @submit.prevent="getVal">
        <p class="question-header">{{question.label}}</p>
        <!-- for text input -->
        <div v-if="question.formType=='text'" >
        <div v-if="question.options.length!=0" class="weui-cell weui-cell_input">
           <label v-for="(item,index) in question.options" :key="index" class="weui-cell__bd">
              <p>{{item.label}}</p>
               <q-input :name="item.label" v-model="val" placeholder="Enter your answer" />
           </label>
        </div>
        <q-input v-else :name="question.label" v-model="val" placeholder="Enter your answer" />
        </div>
        <!-- for radio input -->
        <div v-else-if="question.formType=='radio'">
          <div v-for="(item, index) in question.options" :key="index" >
                <q-radio v-model="val"  :label="item.label" :name="question.label" :val="index" unchecked-icon="visibility_off" checked-icon="visibility"/>
          </div>
        </div>
        <!-- for multiselect input -->
        <div v-else-if="question.formType=='multi-select'">
            <div v-for="(item, index) in question.options" :key="index" >
                <input  type="checkbox" class="" :name="question.label" :value="index" v-model="val"  @change="inputChange"/>
                <label class="">{{item.label}}</label>
            </div>
        </div>
        <button
        type="submit"
        >
          {{(finishIntro||finishCore)?'Submit':'Next'}}
        </button>
    </form>
     <button @click="prevQuestion">Back</button>
    </div>
</template>

<script>
export default {
  data () {
    return {
      textBoxValue: '',
      val: ''
    }
  },
  props: {
    question: Object,
    inputValue: String,
    inputChange: Function,
    prevQuestion: Function
  },

  methods: {
    textBoxChange (e) {
      this.textBoxValue = e.target.value
    },
    getVal () {
      this.$emit('getValue', this.val)
      this.val = ''
    }
  }
}
</script>

<style>
</style>
