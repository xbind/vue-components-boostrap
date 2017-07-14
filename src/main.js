require('bootstrap/dist/css/bootstrap.min.css')

import Vue from 'vue'

import VueDynamic from 'vue-dynamic'
import App from './App'

import router from './router'

Vue.config.productionTip = false

Vue.use(VueDynamic, {name: 'dynamic'})

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
