// import something here
import axios from 'axios'

// leave the export, even if you don't use it
export default ({ Vue }) => {
  // something to do
  Vue.prototype.$axios = axios
}
