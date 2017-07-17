<template>
 <div class="row">
  <ul class="col-xs-3 nav navbar-nav" v-for="item in items">
    <li>
        <a :href="item.url"><strong>{{item.name}}</strong></a>
        <menulist  :items="item.children"></menulist>
    </li>
  </ul>  
 </div> 
</template>
<script>
    import menulist from './MenuList'
    export default{
        props:{
            items:{
                type:Array,
            default:null
            }
            
        },
        components:{
            menulist
        }
    }
</script>