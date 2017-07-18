<template>
    <v-container fluid>
        <tree-menu :items="list"></tree-menu>
    </v-container>
</template>
<script>
  import axios from 'axios'
  import TreeMenu from '../plugins/TreeMenu.vue'

  export default{
    name: 'Home',
    data(){
      return {
        list: [
          {id: 1, name: "John",  children: []},
          {
            id: 2,
            name: "Joao",
            children: [
              {id: 4, name: "John",  children: []},
              {id: 5, name: "John",  children: []},
            ]
          },
          {
            id: 3, name: "John",
            children: [
              {id: 6, name: "John",  children: []},
              {id: 7, name: "John",  children: []},
            ]
          },
        ]
      }
    },
    components: {
      TreeMenu
    },
    methods: {
      add: function () {
        console.log("Thêm tag");

        this.list.push({name: 'Cảnh'});
      },
    }

  }
</script>

<style>

</style>