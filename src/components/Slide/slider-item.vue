<template>
<div class="item" :class="{active : isactive}">
<slot :text="src">
    <img :src="src" alt="">
    </slot>
</div>
</template>
<script>
    export default{
        props: [
        'src',
        'isactive'
    ]
    }
</script>