require('vuetify/dist/vuetify.min.css')

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

import App from './App'

import router from './router'

Vue.config.productionTip = false

Vue.component('HeaderSection', require('./components/Header.vue'))
Vue.component('FooterSection', require('./components/Footer.vue'))
Vue.component('ErrorComp', require('./components/errors/404.vue'))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
