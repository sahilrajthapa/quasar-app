<template>
    <div padding class="docs-table">
    <div class="pg-container">
       <p class="pg-top-title">GET YOUR </p>
       <p class="pg-title">Latest Reports</p>
       <div class="pg-date-picker">
         <div class="pg-date-picker-item">
             <p class="pg-date-picker-text">From</p>
             <q-datetime
                v-model="date.start"
                clearable
                @change="startDateChange"
             />
         </div>
         <div class="pg-date-picker-item">
             <p class="pg-date-picker-text">To</p>
              <q-datetime
                v-model="date.end"
                clearable
                @change="endDateChange"
             />
         </div>
       </div>
        <div class="pg-line"></div>
       <button class="btn-default" @click="bindSubmit"><span class="iconfont icon-submit" style="margin-right: 7px"></span>Submit</button>
        <q-table
          title="Your's latest record"
          :data="userRecord"
          :columns="columns"
          row-key="name"
        />

    </div>
    </div>
</template>

<script>
import config from '../config/config'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      userRecord: [],
      date: {
        start: '',
        end: ''
      },
      columns: [
        {
          name: 'createdAt',
          required: true,
          label: 'CreatedAt',
          align: 'left',
          field: 'createdAt',
          sortable: true
        },
        { name: 'pressure', label: 'Pressure', field: 'pressure', sortable: true },
        { name: 'sugar', label: 'Sugar ', field: 'sugar', sortable: true }
      ]
    }
  },
  computed: {
    ...mapState('profile', ['token'])
  },
  mounted () {
    let _this = this
    _this.defaultDate()
    _this.$axios
      .get(`${config.api.sugPress}/getRecent?userId=5bbdd437ed32a9165c5af240`)
      .then(res => {
        _this.userRecord = res.data.result
      })
      .catch(err => console.log('get recent err: ', err))
  },
  methods: {
    defaultDate () {
      let newDate = new Date()
      this.date.end = newDate.toISOString().split('T')[0]
      let startDate = newDate.setDate(newDate.getDate() - 7)
      this.date.start = new Date(startDate).toISOString().split('T')[0]
    },
    startDateChange (newValue) {
      let newDate = newValue.split('T')[0]
      this.date.start = newDate
    },
    endDateChange (newValue) {
      let newDate = newValue.split('T')[0]
      this.date.end = newDate
    },
    bindSubmit () {
      let _this = this
      console.log(_this)
      _this.$axios
        .get(`${config.api.sugPress}/${_this.date.start}/${_this.date.end}?userId=5bbdd437ed32a9165c5af240`)
        .then(res => {
          console.log('get from to response: ', res)
          _this.userRecord = res.data.result
        })
        .catch(err => console.log('get recent err: ', err))
    }
  }
}
</script>

<style scoped>
.pg-container {
  padding: 50px 0;
  overflow: hidden;
}

.pg-top-title {
  text-align: center;
  font-weight: 700;
}
.pg-title {
  color: #6190c6;
  margin-bottom: 20px;
  text-align: center;
}
.pg-date-picker {
  margin: 0 20px;
}

.pg-date-picker .pg-date-picker-item:first-child {
  padding-right: 1.5%;
}

.pg-date-picker .pg-date-picker-item:last-child {
  padding-left: 1.5%;
}
.pg-date-picker-item {
  display: inline-block;
  width: 50%;
}
.pg-date-picker-text {
  padding-left: 4px;
  margin-bottom: 0;
  font-weight: 700
}
/* .pg-date-picker-input {
  border: 47%;
  padding: 4px 8px;
  border: 0.5px solid #ccc;
  border-radius: 4px;
} */

.btn-default {
  letter-spacing: 1px;
  padding: 8px 15px;
  background-color: #6190c6;
  color: #fff;
  line-height: 1.5;
  border-radius: 30px;
  border: 1px solid #6190c6;
  font-size: 18px;
  width: 200px;
  text-align: center;
  position: relative;
  top: -20px;
  display: block;
  margin: 0 auto;
  outline: 0
}

.pg-line {
  border-top: 1px solid #ccc;
  margin-top: 40px;
}
.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
</style>
