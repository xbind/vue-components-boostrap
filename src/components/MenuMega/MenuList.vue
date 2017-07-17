<template>
<ul class="nav navbar">
<li v-for="item in items">
    <a :href="item.url">{{ item.name }}</a>
</li>
</ul>
</template>
<script>
    export default{
        props:{
            items:{
                type:Array,
                default:null
            }
        }
    }
</script>