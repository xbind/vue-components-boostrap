<template>
    <!--<div>-->
    <v-layout row wrap class="file-manager-thumbnails">
        <v-flex xs6 sm3 md2 v-for="(item, index) in files" :key="index" tile>
            <v-card @contextmenu="show($event, index)" @click="selected(index)" @dblclick="openFolder(index)"
                    class="file-manager-thumbnail" :class="{'grey lighten-3' : item.type=='dir'}" hover>
                <v-card-media :src="item.path" height="120px">
                    <v-layout>
                        <v-card-title>
                            <div v-if="item.type == 'dir'" v-badge:folder.overlap.icon.left class="orange--after"></div>
                            <div v-if="item.type == 'file'" v-badge:assignment.overlap.icon.left></div>
                            <div v-if="item.type == 'image'" v-badge:photo.overlap.icon.left></div>

                        </v-card-title>
                    </v-layout>
                </v-card-media>


                <v-card-actions class="white hidden-overflow" wrap>

                    <v-progress-circular v-if="item.status == 1" :size="24" :width="1" :rotate="360"
                                         :value="item.value"
                                         class="teal--text">
                        {{ item.value }}
                    </v-progress-circular>
                    <v-checkbox v-else-if="item.type != 'dir'"
                    v-model="value"
                    color="blue"
                    :value="item"
                    class="file-selected"
                    disabled
                    hide-details>
                    </v-checkbox>

                    <span class="grey--text ml-4">{{ item.basename }}</span>
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-menu offset-y v-model="showMenu" :position-absolutely="true" :position-x="menu.x" :position-y="menu.y">
            <v-list>
                <v-list-tile @click.native="selected(menu.index)">
                    <v-list-tile-title>Chọn</v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-title>Chi tiết</v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-title>Tải về</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click.native="removed(menu.index)">
                    <v-list-tile-title>Xóa</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
    </v-layout>

    <!--</div>-->
</template>

<script>
  export default {
    props: {
      files: {},
      value: {
        type: Array,
        required: false,
        default: function () { return [] }
      },
      multiple: {
        type: Boolean,
        require: false,
        default: false
      },
      filetype: {
        type: String,
        require: false,
        default: 'image'
      }
    },
    data () {
      return {
        showMenu: false,
        menu: {
          x: 0,
          y: 0,
          index: 0
        }
      }
    },
//    watch: {
//      itemsSelected (value) {
//        this.$emit('input', value)
//      }
//    },
    methods: {
      show (e, index) {

        e.preventDefault()
        this.showMenu = true
        this.menu.x = e.clientX
        this.menu.y = e.clientY
        this.menu.index = index
      },
      removed (index) {
        this.files.splice(index, 1)
      },
      selected (index) {
        let item = this.files[index]
        if (item.type == 'dir') return

        let i = this.value.indexOf(item)

        if (i > -1) {
          this.value.splice(i, 1)
        } else {
//          item.selected = !item.selected
          if (!this.multiple) {
            this.value.length = 0
          }
          if (this.filetype == 'all' || this.filetype == item.type)
            this.value.push(item)
        }
      },
      openFolder (index) {
        let item = this.files[index]
        if (item.type == 'dir')
          console.log('Mở thư mục' + index)
      }
    }
  }
</script>

<style>
    .file-manager-thumbnail {
        cursor: pointer;
    }

    .file-selected {
        margin: -5px -30px -5px 0;
    }

    .hidden-overflow {
        overflow: hidden;
    }
</style>