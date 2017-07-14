<template>
    <div>{{content}}</div>
</template>
<script>
  import axios from 'axios'

  export default{
    name: 'Home',
    data(){
      return {
        content:null
      }
    },

    beforeCreate(){

    }
  }
</script>

<style>
</style>