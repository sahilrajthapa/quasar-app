<template>
  <!-- <q-page-container>
  <q-page> -->
    <div>
     <q-carousel
        color='white'
        arrows
        autoplay
        infinite
        quick-nav
        height='300px'
      >
   <q-carousel-slide v-for='(item, index) in banner' :key='index'  :img-src='item.webformatURL' />
  </q-carousel>
    <div class='btn-wrap'>
      <router-link to='/record-list' class='btn-default'>View Report</router-link>
      <router-link to='/post-form' class='btn-default'>Check Blood</router-link>
      <router-link to='/login' class='btn-default'>Login</router-link>
      <router-link to='/questions' class='btn-default'>Questions</router-link>
      <q-btn
        round
        color="primary"
        @click="scanQR"
        class="fixed"
        icon="camera"
        size="lg"
        style="right: 18px; bottom: 18px"
      />
    </div>
    </div>
  <!-- </q-page>
  </q-page-container> -->
</template>

<style scoped>
.btn-wrap {
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn-default {
  letter-spacing: 1px;
  padding: 8px 16px;
  background-color: #6190c6;
  color: #fff;
  line-height: 1.5;
  border-radius: 30px;
  border: 1px solid #6190c6;
  font-size: 18px;
  margin-bottom: 20px;
  width: 175px;
  text-align: center;
  text-decoration: none;
  outline: none;
}
</style>

<script>
import { mapActions, mapState } from 'vuex'
import config from '../config/config'

export default {
  name: 'PageIndex',
  data () {
    return {
      banner: []
    }
  },
  computed: {
    ...mapState('mtech', ['mtechToken'])
  },
  methods: {
    ...mapActions('mtech', ['setMtech']),
    scanQR () {
      let _this = this
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          let mtechInfo = JSON.parse(result.text)
          _this.setMtech(mtechInfo.userId)
          let mtechData = {
            patientRef: mtechInfo.userId,
            deviceInfo: {
              model: window.device.model,
              platform: window.device.platform,
              manufacturer: window.device.manufacturer,
              version: window.device.version,
              uuid: window.device.uuid,
              ip: '192.168.1.1'
            }
          }
          let headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-access-token': _this.mtechToken
          }
          _this.$axios
            .post(`${config.api.qrlog}`, mtechData, { headers: headers })
            .then(res => {
              _this.$router.push('/users')
            })
            .catch(err => {
              console.log('err', err)
            })
        },
        function (error) {
          alert('Scanning failed: ' + error)
        }
      )
    }
  },
  mounted () {
    let _this = this
    _this.$axios
      .get(
        `https://pixabay.com/api/?key=${
          config.key
        }&q=doctor&image_type=photo&per_page=7`
      )
      .then(res => {
        _this.banner = res.data.hits
      })
      .catch(err => console.log(err))
  }
}
</script>
