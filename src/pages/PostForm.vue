<template>

    <div class="pg-container">
        <div class="pg-text">
          <span class="iconfont icon-post pg-font"></span>
          <p style="font-weight: 700">POST YOUR </p>
          <p class="pg-title">Blood & Sugar level</p>
        </div>
        <div class="pg-form">
          <form @submit="bindSubmit" report-submit="true">
            <q-field
              :error="!isEmptyString(errors.systolicErr)"
              :error-label="errors.systolicErr"
            >
              <q-input v-model.number="systolic" float-label="Systolic Level"  @blur="validateSystolic(systolic)" />
            </q-field>

            <q-field
              :error="!isEmptyString(errors.diastolicErr)"
              :error-label="errors.diastolicErr"
            >
              <q-input v-model.number="diastolic" float-label="Diastolic Level"  @blur="validateDiastolic(diastolic)" />
            </q-field>

            <q-field
              :error="!isEmptyString(errors.sugarLevelErr)"
              :error-label="errors.sugarLevelErr"
            >
              <q-input v-model.number="sugarLevel" float-label="Sugar Level"  @blur="validateSugar(sugarLevel)" />
            </q-field>
              <button formType="submit" :disabled="disableButton" class="btn-default"><span class="iconfont icon-submit" style="margin-right: 7px"></span>Submit</button>
          </form>
        </div>

    </div>

</template>

<script>
import config from '../config/config'
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      isActive: false,
      isFocus: false,
      systolic: '',
      diastolic: '',
      sugarLevel: '',
      errors: {
        systolicErr: '',
        diastolicErr: '',
        sugarLevelErr: ''
      }
    }
  },
  computed: {
    disableButton () {
      if (
        this.systolic === '' ||
        this.diastolic === '' ||
        this.sugarLevel === ''
      ) {
        return true
      } else if (
        this.errors.systolicErr !== '' ||
        this.errors.diastolicErr !== '' ||
        this.errors.sugarLevelErr !== ''
      ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions('user', ['setUser']),
    isEmptyString (str) {
      return str.trim().length === 0
    },
    validateSystolic (value) {
      this.errors.systolicErr = ''
      let condition = value >= 40 && value <= 100
      if (value === '') {
        this.errors.systolicErr = 'Enter a number'
        return
      }
      if (isNaN(parseFloat(value))) {
        this.errors.systolicErr = 'Enter a valid Number'
        return
      }

      if (!condition) {
        this.errors.systolicErr = 'Numbers should be between 40 and 100'
      }
    },
    validateDiastolic (value) {
      this.errors.diastolicErr = ''
      let condition = value >= 40 && value <= 100
      if (value === '') {
        this.errors.diastolicErr = 'Enter a number'
        return
      }
      if (isNaN(parseFloat(value))) {
        this.errors.diastolicErr = 'Enter a valid Number'
        return
      }

      if (!condition) {
        this.errors.diastolicErr = 'Numbers should be between 40 and 100'
      }
    },
    validateSugar (value) {
      this.errors.sugarLevelErr = ''
      let condition = value >= 40 && value <= 100
      if (value === '') {
        this.errors.sugarLevelErr = 'Enter a number'
        return
      }
      if (isNaN(parseFloat(value))) {
        this.errors.sugarLevelErr = 'Enter a valid Number'
        return
      }

      if (!condition) {
        this.errors.sugarLevelErr = 'Numbers should be between 40 and 100'
      }
    },
    bindSubmit (e) {
      e.preventDefault()
      let _this = this,
        { systolic, diastolic, sugarLevel, token } = _this,
        pressure = `${systolic}/${diastolic}`

      let option = {
        userId: '5bbdd437ed32a9165c5af240',
        sugar: sugarLevel,
        pressure
      }

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }

      _this.$axios
        .post(config.api.sugPress, option, { headers: headers })
        .then(res => {
          _this.systolic = ''
          _this.diastolic = ''
          _this.sugarLevel = ''
          _this.$router.replace('/')
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  }
}
</script>

<style scoped>
.pg-container {
  padding: 70px 0;
}
.pg-text {
  width: 225px;
  margin: 0 auto;
  text-align: center;
}
.pg-font {
  font-size: 48px;
}
.pg-title {
  color: #6190c6;
  margin-bottom: 40px;
}

.pg-form {
  width: 280px;
  margin: 0 auto;
}

.form-control {
  display: block;
  border-bottom: 0.5px solid #ccc;
  padding-bottom: 2px;
}

.form-group {
  margin-top: 12px;
}
.form-group p {
  margin-top: 2px;
  color: red;
}

.btn-default {
  letter-spacing: 1px;
  padding: 8px 15px;
  background-color: #6190c6;
  color: #fff;
  line-height: 1.5;
  border-radius: 30px;
  border: 1px solid #6190c6;
  font-size: 18px;
  margin-top: 50px;
  width: 280px;
  text-align: center;
}
.btn-default[disabled] {
  background-color: #76aff0;
  border: 1px solid #76aff0;
  color: #fff;
}
</style>
