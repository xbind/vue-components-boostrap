import Vue from 'vue'
import Router from 'vue-router'

// IMPORT FRONT VIEW
import Main from '@/components/Main'

import HomePage from '@/components/pages/Home'
import PostCreate from '@/components/pages/Post-Create'
import AutoComplete from '@/components/AutoComplete/main'
import ErrorPage from '@/components/errors/404'
import FileManager from '@/components/pages/FileManager.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Components',
      component: Main,
      children: [
        {
          path: 'menu-drag-and-drop',
          alias: '',
          component: HomePage,
          name: 'Menu Drag and Drop',
          meta: {description: 'Menu Drag and Drop'}
        },{
          path: 'post-create',
          alias: '',
          component: PostCreate,
          name: 'Post Create',
          meta: {description: 'Đăng bài viết'}
        },{
          path: 'auto-complete',
          alias: '',
          component: AutoComplete,
          name: 'AutoComplete',
          meta: {description: 'AutoComplete'}
        },{
          path: '404',
          alias: '',
          component: ErrorPage,
          name: '',
          meta: {}
        },{
          path: 'files',
          alias: '',
          component: FileManager,
          name: '',
          meta: {}
        }
      ]
    }
  ]
})
