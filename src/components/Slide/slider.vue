<template>
    <div :id="'slider'+idsliderdata" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner" role="listbox">
            <slot></slot>
        </div> 
        <a class="left carousel-control" :href="'#slider'+idsliderdata" role="button" data-slide="prev">
         <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> 
         <span class="sr-only">Previous</span> </a>        
         <a class="right carousel-control" :href="'#slider'+idsliderdata" role="button" data-slide="next"> 
         <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> 
         <span class="sr-only">Next</span> </a>        
         </div>
</template>
<script>
var idslider=0
    export default{
    data(){
        return{
            idsliderdata:idslider
        }
    },
    mounted:function(){
        idslider++;
        this.idsliderdata=idslider;
    }
    }
</script>