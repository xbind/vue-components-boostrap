<template>
    <div v-once class="editor-container">
        <div id="editor">
        </div>
        <div id="code-editor" class="code-editor" v-show="showSource">
            <textarea v-model="source"></textarea>
        </div>
        <v-dialog v-model="uploadDialog" persistent>
            <v-card>
                <v-card-title class="headline">Upload Images</v-card-title>
                <v-card-text>
                    <v-text-field label="Email" required></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="green--text darken-1" flat="flat" @click.native="uploadDialog = false">Disagree
                    </v-btn>
                    <v-btn class="green--text darken-1" flat="flat" @click.native="uploadDialog = false">Agree</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  import axios from 'axios'
  import Quill from 'quill'

  export default {
    data () {
      return {
        editor: {},
        showSource: false, // Display or none Show Source Code
        source: '', //Source code value
        uploadDialog: false,
        file: null
      }
    },
    props: {
      value: String,
      options: {
        type: Object,
        default: function () {
          let vm = this
          return {
            modules: {
              toolbar: {
                container: [
                  [{'font': []}],
                  [{'header': [1, 2, 3, 4, 5, 6, false]}],
                  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
//                  ['blockquote', 'code-block'],

                  [{'list': 'ordered'}, {'list': 'bullet'}],
//                  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
//                  [{'direction': 'rtl'}],                         // text direction
                  ['link', 'image', 'video'],

//                  [{'align': []}],

                  ['clean'],                                         // remove formatting button
                  ['source'],                                         // remove formatting button
                  ['upload']
                ],
                handlers: {
                  'source': function () {
                    vm.showSource = !vm.showSource
                  },
                  'image': function (image, callback) {

                    let fileInput = this.container.querySelector('input.ql-image[type=file]')
                    if (fileInput == null) {
                      fileInput = document.createElement('input')
                      fileInput.setAttribute('type', 'file')
                      fileInput.setAttribute('accept', 'image/*')
                      fileInput.classList.add('ql-image')
                      fileInput.addEventListener('change', () => {
                        if (fileInput.files != null && fileInput.files[0] != null) {
                          let range = vm.editor.getSelection(true)
                          let index = range.index + range.length
                          vm.editor.insertEmbed(index, 'image', fileInput.files[0], vm.upload)
                        }
                      })
                      this.container.appendChild(fileInput)
                    }
                    fileInput.click()
                  },
                  'upload': function (file, callback) {
                    console.log('Mở Upload Modal')
                    var formData = new FormData()
                    formData.append('file', file)
                    var cb = callback
                    axios.get('/').then((response) => {
                      cb('http://via.placeholder.com/350x150')
                    })
//                    vm.uploadDialog = true
                  }
                }
              }
            },
            theme: 'snow',
            placeholder: 'Nội dung...',
          }
        }
      }
    },
    methods: {
      upload: function () {
        console.log('upload')
      }
    },
    watch: {
      'showSource': function (value) {
        let vm = this
//        var code = document.querySelector('.code-editor>textarea')
        if (value) {
          vm.source = vm.editor.root.innerHTML // Xem code
        } else {
          vm.editor.pasteHTML(vm.source) // Xem html edit
        }
      },
      'value': function (value) {
        // Thiết lập nội dung mặc định từ V-Model
        if (this.editor.getLength() < 2)
          this.editor.pasteHTML(value)
      }
    },
    mounted () {
      this.editor = new Quill('#editor', this.options)

      var test = document.querySelector('#code-editor')
      this.editor.addContainer(test)

      this.editor.on('text-change', (delta, source) => {
        // Xuất sự kiện khi text-change
        this.$emit('text-change', this.editor, delta, source)
        // Sử dụng khi người dùng truyền vào v-model
        this.$emit('input', this.output != 'delta' ? this.editor.root.innerHTML : this.editor.getContents())
      })
    },
  }

</script>

<style src=""></style>

<style>
    .editor-container > div.ql-container {
        min-height: 300px;
    }

    .ql-source:after {
        content: "[<>]";
    }

    .ql-upload:after {
        content: "UPLOAD";
    }

    .code-editor textarea {
        width: 100%;
        margin: 0px;
        background: rgb(29, 29, 29);
        box-sizing: border-box;
        color: rgb(204, 204, 204);
        font-size: 15px;
        outline: none;
        padding: 20px;
        line-height: 24px;
        font-family: Consolas, Menlo, Monaco, 'Courier New', monospace;
        position: absolute;
        top: 0;
        bottom: 0;
        border: none;
    }

    button {
        margin-bottom: inherit;
    }
</style>

