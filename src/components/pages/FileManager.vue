<template>
    <v-container>
        <file-manager></file-manager>
    </v-container>
</template>

<script>

  import axios from 'axios'
  import FileManager from '../plugins/editors/FileManager.vue'

  export default {
    data () {
      return {
        content: null,
      }
    }
    ,
    components: {
      FileManager
    }
  }

</script>

<style>
</style>

