<template>
    <v-container>
        <vue-editor></vue-editor>
    </v-container>
</template>

<script>
  import VueEditor from '../plugins/VueEditor.vue'

  export default{
    data(){
      return {
        editor: {},

        options: {
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline'],
                ['source']
              ]
            },
          },
          theme: 'snow',
        },
      }
    },
    components: {
      VueEditor
    },
    methods: {
      textChange(a, b){
        console.log()
      }
    }

  }

</script>

<style>
</style>

