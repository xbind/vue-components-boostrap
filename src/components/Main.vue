<template>
    <div>
        <header-section></header-section>
        <div class="container">
            <component :is="viewComponent"></component>
        </div>
        <footer-section></footer-section>
    </div>
</template>
<script>

  import axios from 'axios'

  export default {
    data(){
      return {
        viewComponent: null,
      }
    },
    components: {

    },
    beforeCreate(){
      axios.get('http://beta.json-generator.com/api/json/get/4yLvVc047').then((response) => {
        this.viewComponent = response.data
      })
    }
  }
</script>