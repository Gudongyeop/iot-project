import Vue from 'vue'
import App from './App.vue'
import store  from '@/store/index.js'
import router from './router'
import axios from 'axios'
// import JsonExcel from 'vue-json-excel'
import vuetify from './plugins/vuetify';
import moment from 'moment-timezone'
import vueMoment from 'vue-moment' 



// import io from 'socket.io-client';
// const socket = io('http://localhost:3001');

// Vue.prototype.$socket = socket;

moment.tz.setDefault('Asia/Seoul')
moment.locale('ko')


Vue.config.productionTip = false
// Vue.component('downloadExcel', JsonExcel)
Vue.prototype.$axios = axios
Vue.use(vueMoment, { moment })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

