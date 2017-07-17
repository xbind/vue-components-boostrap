<template>
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
</template>
<script>

  import axios from 'axios'

  export default {
    data(){
      return {
        viewComponent: null,
        datamenu:null
      }
    },
    components: {

    },
    beforeCreate(){
      axios.get('http://beta.json-generator.com/api/json/get/4yLvVc047').then((response) => {
        this.viewComponent = response.data
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