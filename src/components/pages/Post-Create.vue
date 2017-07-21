<template>
    <v-container>
        <vue-editor v-model="content"></vue-editor>
        <v-btn @click.native="displaycontent">Save</v-btn>
    </v-container>
</template>

<script>
  import VueEditor from '../plugins/editors/VueEditor.vue'
  import axios from 'axios'

  export default{
    data(){
      return {
        content: null,
      }
    }
    ,
    components: {
      VueEditor
    }
    ,
    methods: {},
    mounted: function () {
      let vm = this
      axios.get('http://beta.json-generator.com/api/json/get/Vkjj5DKr7')
        .then((response) => {

          vm.content = response.data.content
//          console.log(vm.content)
        })
    },
    methods: {
      displaycontent: function () {
        console.log(this.content)
      }
    }

  }

</script>

<style>
</style>

