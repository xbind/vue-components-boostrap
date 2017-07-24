<template>
    <v-app standalone>
        <v-navigation-drawer persistent dark :mini-variant.sync="mini" v-model="drawer" overflow>
            <v-list class="pa-0">
                <v-list-tile avatar tag="div">
                    <v-list-tile-avatar>
                        <img src="https://vuejs.org//images/logo.png"/>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>Vue.js Components</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon @click.native.stop="mini = !mini">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-tile v-for="(item,index) in items" :key="index" :href="item.url" router>
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed class="indigo darken-4" dark>
            <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Toolbar</v-toolbar-title>
        </v-toolbar>
        <main>
            <router-view></router-view>
        </main>
    </v-app>
</template>

<!--<div>-->
<!--<header-section></header-section>-->
<!--<div class="container">-->
<!--<component :is="viewComponent"></component>-->
<!--</div>-->
<!--<footer-section></footer-section>-->
<!--</div>-->

<script>

  import axios from 'axios'

  export default {
    data () {
      return {
        drawer: true,
        items: [
          {
            title: 'Menu Drag and Drop',
            url:'#/',
            icon: 'dashboard'
          },
          {
            title: 'Editor',
            url:'#/post-create',
            icon: 'format_color_text'
          },
          {
            title: 'AutoComplete',
            url:'#/auto-complete',
            icon:'pageview'
          },
          {
            title: 'FileManager',
            url:'#/files',
            icon: 'folder'
          }
        ],
        mini: true,
        right: null
      }
    },
    components: {},
    beforeCreate(){
      axios.get('http://beta.json-generator.com/api/json/get/4yLvVc047').then((response) => {
        this.viewComponent = response.data
//        this.viewComponent = {
//          template: `<div> kdsflkgsldjfglk <header-section></header-section></div>`,
//          components: {
////            HeaderSection: require('@/components/Header.vue')
//          }
//        }
      })
      axios.get('http://beta.json-generator.com/api/json/get/Nkx5dINH7').then((response) => {
        this.datamenu = response.data
      })
    },
    methods: {
      addSlider: function () {
        axios.get('http://beta.json-generator.com/api/json/get/41NIiuVHQ').then((response) => {
          this.viewComponent = response.data
        })
      }
    }
  }
</script>
<style>
.navigation-drawer:not(.navigation-drawer--is-booted) {
    z-index: 3;
}
</style>