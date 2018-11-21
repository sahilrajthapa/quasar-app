<template>
    <div class="pg-container">
        <div class="pg-text">
          <span class="iconfont icon-post pg-font"></span>
          <p style="font-weight: 700">Login In</p>
          <p class="pg-title">To your account</p>
        </div>
        <div class="pg-form">
          <form @submit="bindSubmit" report-submit="true">

          <q-field
            :error="!isEmptyString(errors.usernameErr)"
            :error-label="errors.usernameErr"
          >
            <q-input v-model="username" float-label="Username"  @blur="validateUsername(username)" />
          </q-field>

          <q-field
            :error="!isEmptyString(errors.passwordErr)"
            :error-label="errors.passwordErr"
          >
            <q-input v-model="password" float-label="Password" type="password" @blur="validatePassword(password)" />
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
      username: '',
      password: '',
      errors: {
        usernameErr: '',
        passwordErr: ''
      }
    }
  },
  computed: {
    disableButton () {
      if (
        this.username === '' ||
        this.password === ''
      ) {
        return true
      } else if (
        this.errors.usernameErr !== '' ||
        this.errors.passwordErr !== ''
      ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions('user', ['setUser']),
    ...mapActions('mtech', ['setMtechToken']),
    isEmptyString (str) {
      return str.trim().length === 0
    },
    validateUsername (value) {
      this.errors.usernameErr = ''
      if (value === '') {
        this.errors.usernameErr = 'Please enter your name'
      }
    },
    validatePassword (value) {
      this.errors.passwordErr = ''
      if (value === '') {
        this.errors.passwordErr = 'Please enter your password'
      }
    },
    bindSubmit (e) {
      e.preventDefault()
      let _this = this
      let { username, password } = _this

      let option = {
        username,
        password
      }

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }

      _this.$axios
        .post(`${config.api.mtech}/login`, option, { headers: headers })
        .then(res => {
          let { token } = res.data.result
          _this.setMtechToken(token)
          _this.username = ''
          _this.password = ''
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
