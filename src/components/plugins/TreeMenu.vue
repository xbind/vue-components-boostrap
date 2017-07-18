<template>
    <draggable :element="'ul'" :list="items" class="tree" :options="options">
        <li v-for="(item,index) in items" :key="item.id">
            {{ item.id}} - {{item.name}}

                <treemenu v-if="item.children.length>0" :items="item.children"></treemenu>

        </li>

        <!--<ul v-if="item.children.length>0"  :class="{parent : item.children.length >0}">-->
            <!--<treemenu v-if="item.children.length>0" :items="item.children"></treemenu>-->
        <!--</ul>-->
        <!--<li v-else>{{ item.id}} - {{item.name}} <i class="material-icons icon remove-item" @remove="removeItem">question_answer</i></li>-->
    </draggable>
</template>
<script>
  import draggable from 'vuedraggable'
  export default{
    name: 'treemenu',
    data(){
      return {
        options: {
          group: "name",  // or { name: "...", pull: [true, false, clone], put: [true, false, array] }
          sort: true,  // sorting inside list
          delay: 0, // time in milliseconds to define when the sorting should start
//          disabled: false, // Disables the sortable if set to true.
//          store: null,  // @see Store
          animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
//          handle: ".my-handle",  // Drag handle selector within list items
//          filter: ".remove-item",  // Selectors that do not lead to dragging (String or Function)
//          preventOnFilter: true, // Call `event.preventDefault()` when triggered `filter`
//          draggable: ".item",  // Specifies which items inside the element should be draggable
          ghostClass: "sortable-ghost",  // Class name for the drop placeholder
          chosenClass: "sortable-chosen",  // Class name for the chosen item
          dragClass: "sortable-drag",  // Class name for the dragging item
          dataIdAttr: 'data-id',
        }
      }
    },
    components: {
      draggable
    },
    props: [
      'items',
      'isParent'
    ],
    methods: {
      onFilter: function (evt) {
        console.log('asdf')
        var el = editableList.closest(evt.item); // get dragged item
        el && el.parentNode.removeChild(el);
      },
      removeItem: function (/**Event*/evt) {
        console.log('asdfsadf')
      },
    }
  }
</script>

<style>
    /*.dragArea {*/
        /*border: 1px solid #f1f1f1;*/
        /*padding: 20px;*/
    /*}*/

    .tree li {
        cursor: pointer;
    }
    .tree li:hover {
        border: 1px solid #eee;
    }
    /*.parent .dragArea{*/
        /*border: none;*/
    /*}*/

    .dragArea .icon {
        float: right;
    }

    .sortable-ghost {
        background: red;
    }

    .sortable-chosen {
        background: green;
    }

    .dragClass {
        background: gray;
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
        margin:0 0 0 1em; /* indentation */
        padding:0;
        list-style:none;
        color:#369;
        position:relative;
    }

    .tree ul {margin-left:.5em} /* (indentation/2) */

    .tree:before,
    .tree ul:before {
        content:"";
        display:block;
        width:0;
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        border-left:1px solid;
    }

    .tree li {
        margin:0;
        padding:0 1.5em; /* indentation + .5em */
        line-height:2em; /* default list item's `line-height` */
        font-weight:bold;
        position:relative;
    }

    .tree li:before {
        content:"";
        display:block;
        width:10px; /* same with indentation */
        height:0;
        border-top:1px solid;
        margin-top:-1px; /* border top width */
        position:absolute;
        top:1em; /* (line-height/2) */
        left:0;
    }

    .tree li:last-child:before {
        background:white; /* same with body background */
        height:auto;
        top:1em; /* (line-height/2) */
        bottom:0;
    }
</style>