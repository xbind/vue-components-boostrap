import Vue from 'vue'
import Router from 'vue-router'

// IMPORT FRONT VIEW
import Main from '@/components/Main'
import HomePage from '@/components/pages/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'Home',
          alias: '',
          component: HomePage,
          name: 'Home',
          meta: {description: 'Trang chủ'}
        }
      ]
    }
  ]
})
