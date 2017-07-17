<template>
          <ul class=" nav navbar-nav">
            <!-- Classic list -->
            <li v-for="item in items" class="dropdown" :class="{'mega-menu-fw':megamenufw}" >
              <a :href="item.url" data-toggle="dropdown" class="dropdown-toggle" aria-expanded="false">{{item.name}}</a>
              <ul class="dropdown-menu" v-if="item.children.length>0">
                <li>
                  <div class="mega-menu-content">
                    <div class="row">
                     <div class="col-lg-9 col-md-8 col-sm-12 col-xs-12">
                       <menuitems :items="item.children"></menuitems>
                     </div>
                     <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                      <div><slider><slideritem isactive=true src="http://lorempixel.com/400/200/sports/1"></slideritem><slideritem src="http://lorempixel.com/400/200/sports/2"></slideritem> </slider></div> 
                      </div>
                       
                     </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        
    </template>
<script>
import menuitems from './MenuItem'
import slider from '../Slide/slider'
import slideritem from '../Slide/slider-item'
export default{
   props:{
     megamenufw:{
       type:Boolean,
       default:true
     },
     items:{
       type:Array,
       default:null
     }
   },
   components:{
       menuitems,
       slider,
       slideritem
     }
}

      $(function() {
        window.prettyPrint && prettyPrint()
        $(document).on('click', '.mega-menu .dropdown-menu', function(e) {
          e.stopPropagation()
        })
         
      })
    
</script>
<style>
.mega-menu .nav,
.mega-menu .collapse,
.mega-menu .dropup,
.mega-menu .dropdown {
  position: static;
}
.mega-menu .container {
  position: relative;
}
.mega-menu .dropdown-menu {
  left: auto;
}
.mega-menu .mega-menu-content {
  padding: 20px 30px;
}
.mega-menu .dropdown.mega-menu-fw .dropdown-menu {
  left: 0;
  right: 0;
}
a{
  cursor: pointer;
}

</style>