require('vuetify/dist/vuetify.min.css')
require('quill/dist/quill.snow.css')
require('./assets/css/style.scss')

import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuetify)

Vue.use(Vuex)

let axiosOptions = Object.assign({}, {
  api: {
    baseUrl: null,
    listUrl: null,
    downloadUrl: null,
    uploadUrl: null,
    options: {}
  },
})
// if (this.options.api.baseUrl) {
//   axiosOptions.baseURL = this.options.api.baseUrl
// }

this.api = axios.create(axiosOptions)

let mm = this
const store = new Vuex.Store({
  state: {
    mm,
    options: {
      basePath: '',
      api: {
        baseUrl: null,
        listUrl: null,
        downloadUrl: null,
        uploadUrl: null,
        options: {}
      },
      input: false,
      onCreated: null,
      onMounted: null,
      onSelect: null,
      showBreadcrumb: true,
      height: null
    },
    selected: null
  },
  mutations: {
    resetSelected (state) {
      state.selected = null
    },
    addSelected (state, file) {
      if (state.options.input.multiple) {
        if (!Array.isArray(state.selected)) {
          state.selected = []
        } else {
          let index = state.selected.findIndex(element => { return element.path === file.path })
          if (index > -1) return
        }
        state.selected.push(file)
      } else {
        state.selected = file
      }
      state.mm.onSelect({selected: state.selected})
    },
    removeSelected (state, file) {
      if (state.options.input.multiple) {
        if (!Array.isArray(state.selected)) return
        let index = state.selected.findIndex(element => { return element.path === file.path })
        if (index > -1)
          state.selected.splice(index, 1)
      } else {
        state.selected = null
      }
      state.mm.onSelect({selected: state.selected})
    }
  },
  getters: {
    isSelected: (state, getters) => (file) => {
      //if (!state.options.input) return false;
      if (state.options.input.multiple) {
        if (!Array.isArray(state.selected)) return
        let index = state.selected.findIndex(element => { return element.path === file.path })
        return index > -1
      } else {
        return (state.selected && state.selected.path === file.path)
      }
    }
  }
})

import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.component('HeaderSection', require('./components/Header.vue'))
Vue.component('FooterSection', require('./components/Footer.vue'))
Vue.component('ErrorComp', require('./components/errors/404.vue'))
// Vue.component('MenuBasic', require('./components/MenuBasic/Menu.vue'))
// Vue.component('MenuMega', require('./components/MenuMega/Menu.vue'))
// Vue.component('Slider', require('./components/Slide/slider.vue'))
// Vue.component('SliderItem', require('./components/Slide/slider-item.vue'))
// Vue.component('AutoComplete', require('./components/AutoComplete/index.vue'))
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})