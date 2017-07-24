<template>
    <draggable :element="'ul'" :list="items" class="tree"
    :options="options" @add="onAdd" :move="onMove">
        <li class="draggable" v-for="(item,index) in items"  :key="item.id" :data-id="item.id" cosllap=false :class="item.children.length>0?'group-list':''">
            <p class="hover-menu">
                <span class="title-menu list__tile" unselectable="on" onselectstart="return false">
                <span class="group pa-2 handle">
                    <v-icon class="grey--text text--lighten-2">apps</v-icon>
                </span>
                {{item.name}}
                    <span class="settings-menu">
                        <v-btn icon class="indigo--text" @click.native.stop="editItem($event,item)" v-tooltip:top="{ html: 'Sửa' }">
                        <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn icon class="green--text" @click.native.stop="addItem($event,item)" v-tooltip:top="{ html: 'Thêm thẻ con' }">
                        <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn icon class="pink--text" @click.native.stop="removeItem($event,items,item)" v-tooltip:top="{ html: 'Xóa' }">
                        <v-icon>remove</v-icon>
                        </v-btn>
                    </span>
                    <v-btn icon class="arrow_menu black--text" v-if="item.children.length>0"
                         @click.native.stop="cosllapmenu($event)">
                        <v-icon>keyboard_arrow_up</v-icon>
                        </v-btn>
                </span>
            </p>
            <treemenu :items="item.children" :callbackitemactive="setdatadialog"></treemenu>            
        </li>        
    </draggable>
</template>
<script>
  import draggable from 'vuedraggable'
    var eldraging
    var dataitemdrag
  export default{
    name: 'treemenu',
    data(){
      return {
        options: {
        parent_id:null,
          group: "name",  // or { name: "...", pull: [true, false, clone], put: [true, false, array] }
          sort: true,  // sorting inside list
          delay: 0, // time in milliseconds to define when the sorting should start
//          disabled: false, // Disables the sortable if set to true.
//          store: null,  // @see Store
          animation: 0,  // ms, animation speed moving items when sorting, `0` — without animation
          handle: ".handle",  // Drag handle selector within list items
          //filter: ".remove-item",  // Selectors that do not lead to dragging (String or Function)
          //preventOnFilter: true, // Call `event.preventDefault()` when triggered `filter`
          draggable: ".draggable",  // Specifies which items inside the element should be draggable
          ghostClass: "sortable-ghost",  // Class name for the drop placeholder
          chosenClass: "sortable-chosen",  // Class name for the chosen item
          dragClass: "sortable-drag",  // Class name for the dragging item
          dataIdAttr: 'data-id',
          forceFallback: true,  // ignore the HTML5 DnD behaviour and force the fallback to kick in

        fallbackClass: "sortable-fallback",  // Class name for the cloned DOM Element when using forceFallback
        fallbackOnBody: true,  // Appends the cloned DOM Element into the Document's Body
        fallbackTolerance: 0
        }
      }
    },
    components: {
      draggable
    },
    props: {
    items:Array,
    isParent:Boolean,
    callbackitemactive:Function
            
    },
    watch:{
        items:function(newitem){
            for(var i=0;i<newitem.length;i++){
                newitem[i].index = i
            }
        }
    },
    methods: {
       
        onAdd: function(evt){
            this.parent_id = evt.target.parentElement.getAttribute('data-id')
            dataitemdrag.parent_id=this.parent_id
        },
        onMove: function(evt){
             dataitemdrag = evt.draggedContext.element
        },
        cosllapmenu:function(e){
            var el=e.target.parentElement.parentElement.parentElement.parentElement
            var elul=el.getElementsByTagName("ul")[0]
            if(el.getAttribute('cosllap')=='false'){
                el.style.height="49px"
                el.setAttribute('cosllap','true')
                elul.style.display="none"
                e.target.children[0].innerText = "keyboard_arrow_down"
            }else{
                el.style.height="auto"
                el.setAttribute('cosllap','false')
               elul.style.display="block"
               e.target.children[0].innerText = "keyboard_arrow_up"
            }
        },
        parentDialog:function(el){
            if(el.var_isdialogmenu)
                return el
            else
                return this.parentDialog(el.$parent)
        },
        setdatadialog:function(data,action,items){
                this.parentDialog(this).setdatadialog(data,action,items)
      },
      removeItem: function (/**Event*/evt,list,item) {
          this.callbackitemactive(item,"del",list)
      },
      addItem: function (evt,item) {
        this.callbackitemactive(item,"add",null)
      },
      editItem: function (evt,item) {
        this.callbackitemactive(item,"edit",null)
      }
    }
  }
</script>

<style>
    * li{
        list-style:none;
    }
    .handle{
        cursor:move;
    }
    .settings-menu{
        position:absolute;
        top:0;
        right:40px;
        display: none;
    }
    .settings-menu i{
        width: 40px;
    }
    .hover-menu:focus{
    background: #e0e0e0;
    outline: none;
    }
    .title_menu{
        color: rgba(0,0,0,.87);
    }
    .tree{
        background: #fff;
        margin-left: 20px;
        transition:  all .3s cubic-bezier(.25,.8,.25,1);
    }
    .tree li {
        cursor: pointer;
        background:#fff;
    }
    .tree li p {
        position:relative;
        margin:0;
        background:#fff;
        cursor:default; 
    }
    .tree li .hover-menu{
        transition:  .3s cubic-bezier(.25,.8,.25,1);
    }
    .tree li .hover-menu:hover{
        background: rgba(0,0,0,.05);
    }
    .tree li p:hover .settings-menu{
        display:block;
    }
    /* .tree .group-list[cosllap=false]{
        border-bottom:1px solid rgba(0,0,0,.12);
    }
    .tree .group-list[cosllap=false]>p{
        background: rgba(0,0,0,.05);
    } */
    
    .arrow_menu{
        position: absolute;
        top: 5%;
        right: 0;
    }
    .dragArea .icon {
        float: right;
    }
    .sortable-chosen>p{
        margin: 0!important;
    }
    .sortable-chosen p{
        background: #eee;
    }
    .sortable-ghost{
        border: 2px dashed #000!important;
        margin-left:25px!important;
    }
    .sortable-ghost *{
        opacity:0;
    }
    body {
        background:white;
        font:normal normal 13px/1.4 Segoe,"Segoe UI",Calibri,Helmet,FreeSans,Sans-Serif;
        padding:50px;
    }


    /**
     * Framework starts from here ...
     * ------------------------------
     */

    .tree,
    .tree ul {
        padding:0;
        list-style:none;
         color: rgba(0,0,0,.87);
        position:relative;
    }
    .tree li {
        margin:0;
        padding:0; /* indentation + .5em */
        line-height:2em; /* default list item's `line-height` */
        font-weight:bold;
        position:relative;
    }
    .tree:empty{
        height:10px;
    }
</style>