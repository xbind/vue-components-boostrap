<template>
    <v-layout row>
        <v-flex>
            <v-card class="grid">
                <v-toolbar class="white elevation-0">
                    <v-btn icon light>
                        <v-icon class="grey--text text--darken-2">arrow_back</v-icon>
                    </v-btn>
                    <v-toolbar-title class="grey--text text--darken-4">
                        File Manager
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon light>
                        <v-icon class="grey--text text--darken-2">search</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-subheader>
                    <v-breadcrumbs icons divider="chevron_right">
                        <v-breadcrumbs-item v-for="item in breakcrums" :key="item.text" :disabled="item.disabled">
                            {{ item.text }}
                        </v-breadcrumbs-item>
                    </v-breadcrumbs>
                </v-subheader>

                <v-container fluid grid-list-lg>
                    <v-layout row wrap>
                        <v-flex xs12 class="text-xs-center">
                            <form :id="'file-manager-upload-form-' + id" enctype="multipart/form-data">
                                <v-card flat class="file-manager-upload-form-container">
                                    <v-card-text>
                                        <v-icon>cloud_download</v-icon>
                                        <h5><b>Chọn</b> hoặc kéo thả tập tin vào đây!</h5>
                                    </v-card-text>
                                </v-card>
                                <input type="file" :id="'file-manager-upload-form-input-' + id" hidden multiple/>
                            </form>
                        </v-flex>

                    </v-layout>

                    <v-layout row wrap class="file-manager-thumbnails mt-4">
                        <v-flex xs6 sm3 md2 class="file-manager-thumbnail" v-for="(item, key) in files" :key="key">
                            <v-card>
                                <v-card-media :src="item.path" height="120px">
                                    <v-layout column class="media">
                                        <v-card-title>
                                            <v-spacer></v-spacer>
                                            <v-btn icon @click.native="removeFile(item)">
                                                <v-icon>delete</v-icon>
                                            </v-btn>
                                        </v-card-title>
                                        <v-spacer></v-spacer>
                                        <v-card-title class="white--text mt-4">
                                            <v-icon v-if="item.type == 'dir'">folder</v-icon>
                                            <v-icon v-if="item.type == 'file'">assignment</v-icon>
                                        </v-card-title>
                                    </v-layout>
                                </v-card-media>


                                <v-card-actions class="white">
                                    <span class="grey--text">{{ item.basename }}</span><br>
                                    <v-spacer></v-spacer>
                                    <v-progress-circular v-if="item.status == 1" :size="24" :width="1" :rotate="360" :value="item.value"
                                                         class="teal--text">
                                        {{ item.value }}
                                    </v-progress-circular>
                                    <v-checkbox v-else-if="item.type != 'dir'"
                                                v-model="filesChecked"
                                                color="blue"
                                                :value="item.id"
                                                class="file-selected"
                                                hide-details></v-checkbox>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-footer class="mt-5">
                    <!--<v-btn @click.native="increaseValue">Tăng giá trị</v-btn>-->
                </v-footer>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  const STATUS_INITIAL = 0, STATUS_UPLOADING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3

  export default {
    props: {
      url: {
        type: String,
        required: false,
        default: '/upload'
      },
      name: {
        type: String,
        required: false,
        default: 'images[]'
      },
      max_batch: {
        type: Number,
        required: false,
        default: 0
      },
      max_files: {
        type: Number,
        required: false,
        default: 10
      },
      max_filesize: {
        type: Number,
        required: false,
        default: 4000
      },
      button_html: {
        type: String,
        required: false,
        default: 'Upload Images'
      },
      button_class: {
        type: String,
        required: false,
        default: 'btn btn-primary'
      },
    },
    data: function () {
      return {
        breakcrums: [
          {text: 'Home', disable: false},
          {text: 'Home', disable: false},
          {text: 'Home', disable: false},
          {text: 'Home', disable: false},
        ],

        id: this._uid,
        form: null,
        input: null,
        index: 0,
        total: 0,
        files: [],
        files_preview: [],
        filesChecked:[1,2],
        batch: {},
        onDragover: false,
        onUploading: false
      }
    },
    watch: {
      files: function (val, oldVal) {

      }
    },
    mounted: function () {
      let vm = this
      this.form = document.getElementById('file-manager-upload-form-' + this.id)
      this.input = document.getElementById('file-manager-upload-form-input-' + this.id);

      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(event => this.form.addEventListener(event, (e) => {
        e.preventDefault()
        e.stopPropagation()
      }));

      ['dragover', 'dragenter'].forEach(event => this.form.addEventListener(event, this.dragEnter));
      ['dragleave', 'dragend', 'drop'].forEach(event => this.form.addEventListener(event, this.dragLeave));
      ['drop'].forEach(event => this.form.addEventListener(event, this.fileDrop));
      ['change'].forEach(event => this.input.addEventListener(event, this.fileDrop))
      this.form.addEventListener('click', (e) => {
        this.input.click()
      })

      axios.get('http://beta.json-generator.com/api/json/get/Ny0X2gjH7')
        .then((response) => {
          vm.files = response.data
        })
    },
    methods: {
      dragEnter: function (e) {
        e.preventDefault()
        this.onDragover = true
      },
      dragLeave: function (e) {
        e.preventDefault()
        this.onDragover = false
      },
      fileDrop: function (e) {
        e.preventDefault()
        console.log('Nhận được file')
        let newFiles = e.target.files || e.dataTransfer.files

        for (let i = 0; i < newFiles.length; i++) {
          this.fileRead(newFiles[i])
        }
      },
      fileRead: function (file) {
        let reader = new FileReader()

        reader.addEventListener('load', (e) => {
          let index = this.files.push({
            basename: file.name,
            path: reader.result,
            status: STATUS_UPLOADING,
            value: 0
          })

          this.upload(index - 1)
        })
        reader.readAsDataURL(file)
      },
      upload: function (index) {
        let vm = this
        var data = new FormData()
        data.append('file', this.files[index].path)

        axios.post('http://httpbin.org/post', data, {
          onUploadProgress: function (progressEvent) {
            vm.files[index].value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          }
        })
          .then(function (res) {
            vm.files[index].status = STATUS_SUCCESS
            vm.files[index].id = new Date().getTime()
          })
          .catch(function (err) {
            console.log(err.message)
          })

      },
      increaseValue: function () {
        this.files[0].value += 10
      },
      removeFile: function (file) {
        console.log('Xóa file:' + file.id)
        this.files = this.files.filter(function (item) {
          return file.id != item.id
        })
      },
//      selectedFile: function (event) {
//        let element = event.target
//        console.log(element)
//        if (element.tagName.toLowerCase() === 'i') {
//          element = event.target.parentElement
//        }
//
//        element.classList.toggle('selected')
//      }
    }
  }

</script>
<style lang="css">
    .file-manager-upload-form-container {
        border: 2px dashed #ccc;
        padding: 10px;
        min-height: 100px;
        cursor: pointer;
    }

    .file-manager-thumbnail {
        cursor: pointer;
    }

    .file-selected{
        margin: -5px 0;
    }

    /*.file-manager-thumbnail {*/
    /*overflow: hidden;*/
    /*}*/

    /*.file-manager-thumbnail-empty {*/
    /*text-align: center;*/
    /*padding: 50px 20px;*/
    /*color: #aaa;*/
    /*}*/

    /*.file-manager-thumbnail img {*/
    /*max-width: 100%;*/
    /*height: auto;*/
    /*!*position: absolute;*!*/

    /*!*-webkit-transform: translate(-50%, -50%);*!*/
    /*!*-ms-transform: translate(-50%, -50%);*!*/
    /*!*transform: translate(-50%, -50%);*!*/
    /*}*/

    /*.file-manager-thumbnail span.close {*/
    /*position: absolute;*/
    /*padding: 0 5px;*/
    /*background: #eee;*/
    /*border: 1px solid #ddd;*/
    /*z-index: 1;*/

    /*}*/
</style>