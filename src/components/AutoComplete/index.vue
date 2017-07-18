<template>
<div class="autocomplete has-feedback dropdown" :class="{open:showlist}">
        <input type="text" class="form-control dropdown-toggle" data-toggle="dropdown" id="search"
        :placeholder="placeholder" 
        v-model="keyword"
        @input="input"
        @keyup="keyup"
        @focus="showlist=(items.length > 0 ? true : false)">
        <span class="form-control-feedback" :class="icon"></span>
        <ul class="dropdown-menu">
           <li v-for="item in items">
            <a href="#"
            @click="go(item)" 
            @keyup="keyup"
            @keyup.enter="go(item)">
            <slot :text="item">
                <h4>{{item.value?item.value:item.name}}</h4>
            </slot>
            </a>
        </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'
    export default {
        props: {
            url: {
                type: String,
                required: true
            },
            placeholder: {
                type: String,
                default: 'Search'
            },
            start:{
                type:String,
                default: '3'
            },
            limit:{
                type:String,
                default: '3'
            },
            callbackdata: {
                type: Function,
                default: null
            },
            fielddatashow:{
                type:String,
                default: 'name'
            },
            bgcolorselect: {
                type: String,
                default: '#650065'
            },
            icon: {
                type: String,
                default: 'glyphicon glyphicon-search text-muted'
            },
            iconleft:{
                type: String,
                default: 'false'
            }

        },
        data() {
            return {
                items: [],
                index: -1,
                showlist: false,
                keyword: '',
                itemselected:{}
            }
        },
        mounted: function () {
            this.setOption();

        },
        watch: {            
            keyword: function () {
                
               if (this.keyword.length >= this.start){
                    this.search();
                    if(this.items.length>0){
                        if(!$(".autocomplete.dropdown").hasClass('open'))
                            $(".autocomplete .dropdown-toggle").dropdown("toggle");
                    }
                }else{
                    this.items={};
                }
            },
            items: function (val) {
                this.showlist = this.items.length > 0 ? true : false;
                //
            },
            showlist: function(){
                if(!this.showList)
                    this.index=-1;
            },
            index: function(){
                if(this.index==-1){
                    $('.autocomplete #search').focus();
                    return;
                }
                $('.autocomplete .dropdown-menu>li>a')[this.index].focus();
            }
        },
        methods: {
            keywordchange:function(){
                
            },
            input:function(){
                //this.keywordchange();
            },
            keyup:function(e) {
                let key = e.keyCode;
                // Disable when list isn't showing up
                if (this.showList==false) return;
                switch (key) {
                    case 40: //down
                        if(this.index<this.items.length-1)
                             this.index++;
                       break;
                    case 38: //up
                        if(this.index>-1)
                              this.index--;
                        break;
                    case 13:
                        if(this.callbackdata)
                            {
                                this.callbackdata(this.itemselected);
                            }
                        break;
                    case 27: //esc
                        this.showList = false;
                        break;
                }
            },
            search: function () {
                var vm = this;
                axios.get(this.url+"?keyword="+this.keyword
                    +"&&limit="+this.limit
                ).then(function (response) {
                    vm.items = response.data;
                    // vm.callbackdata(response.data);
                }).catch(function (e) {
                    console.log(e);
                });
            },
            setOption: function () {
                $(':root').css('--bg-color-hover', this.bgcolorselect);
                if(this.iconleft=='true')
                {
                    $(':root').css('--num-padding-left', '45px');
                    $(':root').css('--num-padding-right', '12px');
                    $(':root').css('--align-left', '0px');
                    $(':root').css('--align-right', 'auto');
                }
                
            },
            focusEnter: function () {
                this.index = -1;
                $('.autocomplete #search').focus();
            },
            go: function (data) {
                this.focusEnter();
                this.itemselected = data;
                this.keyword=data[this.fielddatashow];
            }
        }
    }
</script>
<style>
:root {
        --bg-color-hover: #650065;
        --num-padding-left:12px;
        --num-padding-right:45px;
        --align-left:auto;
        --align-rigth:0px;
    }

.autocomplete  .dropdown-menu {
        padding: 0;
        border: none;
        width:100%;
        max-height: 300px;
        overflow-y: auto;
    }

.autocomplete .dropdown-menu>li {
        border-bottom: 1px solid #ddd;
    }

.autocomplete .dropdown-menu>li>a {
        list-style: none;
        padding: 5px 10px;
        cursor: pointer;
        border-top: 1px solid #ddd;

        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

.autocomplete .dropdown-menu>li>a:hover,
.autocomplete .dropdown-menu>li>a:focus {
        background-color: var(--bg-color-hover);
        color: #ffffff;
    }
.autocomplete  #search{
        position: relative;
        background: transparent;
    }
.autocomplete #searchalpha{
        position: absolute;
        background-color: #fff;
        color: #d7d7d7;
        top: 0;
        left: 0;
    }
.autocomplete.has-feedback input {
    padding-left: var(--num-padding-left);
    padding-right: var(--num-padding-right);
}
.autocomplete.has-feedback .form-control-feedback {
    right: var(--align-rigth);
    left: var(--align-left);
}
</style>
    