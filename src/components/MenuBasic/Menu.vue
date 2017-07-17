<template>
    <ul :class="num_parent+=num_parent==0?' nav navbar-nav':''">
        <li v-for="item in items" :class="(item.children.length>0)?((item.parent_id>1)?'dropdown dropdown-submenu':'dropdown'):''">
            <a :href="item.url || '#'" :class="(item.children.length>0)?'dropdown-toggle':''" :data-toggle="(item.children.length>0)?'dropdown':''"
                @click="menucevent($event)">
             {{item.name}}
            </a>
            <vmenuBasic v-if="item.children.length>0" :items="item.children" :class="item.children.length>0?'dropdown-menu':''"></vmenuBasic>
        </li>
    </ul>
</template>
<script>
    var num = 0;
    export default {
        name: 'vmenuBasic',
        props: ['items'],
        data() {
            return {
                num_parent: 0
            }
        },
        mounted: function () {
            this.num_parent = num++;
        },
        methods: {
            menucevent: function (e) {
                if ($(e.target).parent().hasClass('dropdown-submenu') == false && $(e.target).parent().hasClass(
                        'dropdown')) {
                    $(e.target).parent().siblings().removeClass('open');
                    $($(e.target).parent().children()[1]).children().siblings().removeClass('open')
                    //[1].siblings().removeClass('open')
                }
                if (e.target.className == 'dropdown-toggle') {
                    e.preventDefault();
                    e.stopPropagation();
                    $(e.target).parent().siblings().removeClass('open');
                    $(e.target).parent().toggleClass('open');
                }

            }
        }
    }
</script>
<style>
    .dropdown-submenu {
        position: relative;
    }

    .dropdown-submenu>.dropdown-menu {
        top: 0;
        left: 100%;
    }

    .dropdown-submenu>a:after {
        display: block;
        content: " ";
        float: right;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        border-width: 5px 0 5px 5px;
        border-left-color: #cccccc;
        margin-top: 5px;
        margin-right: -10px;
    }

    .dropdown-submenu:hover>a:after {
        border-left-color: #555;
    }

    .dropdown-submenu.pull-left {
        float: none;
    }

    .dropdown-submenu.pull-left>.dropdown-menu {
        left: -100%;
        margin-left: 10px;
        -webkit-border-radius: 6px 0 6px 6px;
        -moz-border-radius: 6px 0 6px 6px;
        border-radius: 6px 0 6px 6px;
    }
</style>