require('bootstrap/dist/css/bootstrap.min.css')
import 'bootstrap/dist/js/bootstrap.js'
import Vue from 'vue'

import VueDynamic from 'vue-dynamic'
import App from './App'

import router from './router'

Vue.config.productionTip = false

Vue.use(VueDynamic, {name: 'dynamic'})

Vue.component('HeaderSection', require('./components/Header.vue'))
Vue.component('FooterSection', require('./components/Footer.vue'))
Vue.component('ErrorComp', require('./components/errors/404.vue'))
Vue.component('MenuBasic', require('./components/MenuBasic/Menu.vue'))
Vue.component('MenuMega', require('./components/MenuMega/Menu.vue'))
Vue.component('Slider', require('./components/Slide/slider.vue'))
Vue.component('SliderItem', require('./components/Slide/slider-item.vue'))
Vue.component('AutoComplete', require('./components/AutoComplete/index.vue'))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
