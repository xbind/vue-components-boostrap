<template>
    <v-layout row>
        <v-flex>
            <v-card class="grid">
                <v-toolbar flat gray dense extended>
                    <v-toolbar-title>
                        File Manager
                    </v-toolbar-title>
                    <v-toolbar slot="extension">
                        <v-btn icon>
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn class="blue--text"
                               v-tooltip:top="{ html: 'Tìm kiếm' }"
                               icon>
                            <v-icon>search</v-icon>
                        </v-btn>
                        <v-btn :class="{'blue--text' : options.showUpload}"
                               @click.native="options.showUpload = !options.showUpload"
                               v-tooltip:top="{ html: 'Hiển thị khung upload' }"
                               icon>
                            <v-icon>cloud_download</v-icon>
                        </v-btn>
                        <v-btn :class="{'blue--text' : options.showBreadcrumb}"
                               @click.native="options.showBreadcrumb = !options.showBreadcrumb"
                               v-tooltip:top="{ html: 'Hiển thị thanh địa chỉ' }" icon>
                            <v-icon>label_outline</v-icon>
                        </v-btn>
                        <v-btn class="blue--text"
                               @click.native="fetchData"
                               v-tooltip:top="{ html: 'Làm mới' }" icon>
                            <v-icon>autorenew</v-icon>
                        </v-btn>
                    </v-toolbar>

                    <v-spacer></v-spacer>
                    <v-breadcrumbs v-if="options.showBreadcrumb" icons divider="chevron_right">
                        <v-breadcrumbs-item v-for="item in breakcrums" :key="item.text" :disabled="item.disabled">
                            {{ item.text }}
                        </v-breadcrumbs-item>
                    </v-breadcrumbs>
                </v-toolbar>
                <v-container fluid grid-list-lg>
                    <v-layout v-show="options.showUpload" row wrap class="mb-2">
                        <v-flex xs12 class="text-xs-center">
                            <form :id="'file-manager-upload-form-' + id" enctype="multipart/form-data">
                                <v-card flat class="grey lighten-3 file-manager-upload-form-container">
                                    <v-card-text>
                                        <v-icon>cloud_download</v-icon>
                                        <h5><b>Chọn</b> hoặc kéo thả tập tin vào đây!</h5>
                                    </v-card-text>
                                </v-card>
                                <input type="file" :id="'file-manager-upload-form-input-' + id" hidden multiple/>
                            </form>
                        </v-flex>

                    </v-layout>

                    <file-items :files="files" v-model="filesSelected" multiple></file-items>
                </v-container>
                <v-footer class="py-4">
                    <div class="hidden-sm-and-down">
                        <v-chip v-for="items,index in filesSelected" :key="index" class="primary white--text" small>
                            {{items.basename}}
                        </v-chip>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn small>Cancel</v-btn>
                    <v-btn primary small>OK</v-btn>
                </v-footer>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  import FileItems from './FileItems.vue'

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
      }
    },
    components: {
      FileItems
    },
    data: function () {
      return {
        options: {
          showUpload: true,
          showBreadcrumb: true,
        },
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
        filesSelected: [],
        onDragover: false,
        onUploading: false
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

   vm.fetchData();
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
      fetchData(){
        let vm = this
        axios.get('http://beta.json-generator.com/api/json/get/Ny0X2gjH7')
          .then((response) => {
            vm.files = response.data
          })
      },
      OK(){
        this.$dispatch('selected', this.filesSelected)
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
        padding: 20px;
        cursor: pointer;
    }

    .file-manager-upload-form-container > div {
        border: 2px dashed #aaa;
        padding: 20px 0;
    }

    .file-manager-upload-form-container .icon {
        font-size: 50px;
        margin-bottom: 15px;
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