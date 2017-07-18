<template>
<<<<<<< HEAD
    <v-app id="example-2" standalone>
        <v-navigation-drawer persistent light :mini-variant.sync="mini" v-model="drawer" overflow>
            <v-list class="pa-0">
                <v-list-tile avatar tag="div">
                    <v-list-tile-avatar>
                        <img src="https://randomuser.me/api/portraits/men/85.jpg"/>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>John Leider</v-list-tile-title>
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
                <v-list-tile v-for="(item,index) in items" :key="index">
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
=======
    <div>
        <header-section></header-section>
        <div>
          <div class="navbar navbar-default"><h3>Basic Menu</h3>
           <menu-basic :items="datamenu"></menu-basic>
        </div>
          
        </div>
        <hr>
        <div class="navbar navbar-default mega-menu"><h3>Mega Menu</h3>
          <menu-mega :items="datamenu"></menu-mega>
        </div>
        <div class="container">
          
            <component :is="viewComponent"></component>
           <auto-complete 
            url="http://beta.json-generator.com/api/json/get/VkmamMrr7" 
            placeholder="placeholder" 
            limit="5"
            start="1"
            bgcolorselect="#333333">
            <template scope="item">
                <h4>{{ item.text.name }}</h4>
                <p>{{ item.text.email }}</p>
                <!--default template
                  <h4>{{item.value?item.value:item.name}}</h4>
                -->
              </template>
            </auto-complete>
            <p>Auto complete hoạt động chính xác khi server trả về keywork đk tìm kiếm, truy vấn trên server</p>
            <br>
            <br>
            <br>
        </div>
        <div>
          
          <button type="button" @click="addSlider" class="btn btn-success">Add Slider</button>
          
        </div>
        <footer-section></footer-section>
    </div>
>>>>>>> e5b748bfb0f3ed4a94b59944c2105011fbd6459b
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
<<<<<<< HEAD
        drawer: true,
        items: [
          {title: 'Home', icon: 'dashboard'},
          {title: 'About', icon: 'question_answer'}
        ],
        mini: false,
        right: null
=======
        viewComponent: null,
        datamenu:null
>>>>>>> e5b748bfb0f3ed4a94b59944c2105011fbd6459b
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
    methods:{
      addSlider:function(){
        axios.get('http://beta.json-generator.com/api/json/get/41NIiuVHQ').then((response) => {
        this.viewComponent = response.data
      })
      }
    }
  }
</script>