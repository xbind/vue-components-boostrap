<template>
    <div class="editor-container">
        <div id="editor">
        </div>
        <div id="code-editor" class="code-editor" v-show="showSource">
            <textarea v-model="source"></textarea>
        </div>
        <v-dialog v-model="uploadDialog" persistent width="80%">
            <v-card>
                <v-card-text>
                        <file-manager :accept="acceptfile" @selected="selected"></file-manager>
                </v-card-text>
                </v-card>
        </v-dialog>
          <div id="iconfacebook" tabindex="1" @focus.native.stop="iconDialog = true" @blur="iconDialog = false">
            <IconFacebook :callbackicon="getIcon"></IconFacebook>
          </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import Quill from 'quill'
  import FileManager from './FileManager.vue'
  import IconFacebook from '../../../components/IconFacebook/index.vue'
  import Hr from './components/hr';
  import VButton from './components/v-button';
   Quill.register({
            'formats/hr': Hr
        });
  Quill.register({
            'formats/v-button': VButton
        });
  export default {
    data () {
      return {
        editor: {},
        showSource: false, // Display or none Show Source Code
        source: '', //Source code value
        uploadDialog: false,
        file: null,
        files: null,
        acceptfile:"image/*",
        iconDialog: false
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
                  ['blockquote', 'code-block'],

                  [{'list': 'ordered'}, {'list': 'bullet'}],
                  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                  [{'direction': 'rtl'}],                         // text direction
                  ['link', 'image', 'video'],

                  [{'align': []}],

                  ['clean'],                                         // remove formatting button
                  ['source'],                                         // remove formatting button
                  ['upload'],
                  ['icons'],
                  ['hr'],
                  ['v-button']
                ],
                handlers: {
                  'source': function () {
                    vm.showSource = !vm.showSource
                  },
                  'image': function (image, callback) {

                    // let fileInput = this.container.querySelector('input.ql-image[type=file]')
                    // if (fileInput == null) {
                    //   fileInput = document.createElement('input')
                    //   fileInput.setAttribute('type', 'file')
                    //   fileInput.setAttribute('accept', 'image/*')
                    //   fileInput.classList.add('ql-image')
                    //   fileInput.addEventListener('change', () => {
                    //     if (fileInput.files != null && fileInput.files[0] != null) {
                    //       let range = vm.editor.getSelection(true)
                    //       let index = range.index + range.length
                    //       vm.editor.insertEmbed(index, 'image', fileInput.files[0], vm.upload)
                    //     }
                    //   })
                    //   this.container.appendChild(fileInput)
                    // }
                    // fileInput.click()
                    console.log('Mở Upload Modal')
                    vm.uploadDialog = true
                    var formData = new FormData()
                    formData.append('file', image)
                  },
                  'upload': function (file, callback) {
                    console.log('Mở Upload Modal')
                    vm.uploadDialog = true
                    var formData = new FormData()
                    formData.append('file', file)
                    var cb = callback
                    cb='http://via.placeholder.com/350x150'
                    axios.get('/').then((response) => {
                      // cb('http://via.placeholder.com/350x150')
                    })
                    //vm.uploadDialog = true
                  },
                  'icons': function () {
                   vm.iconDialog=!vm.iconDialog
                  },
                  'hr': function(){
                    vm.qill_HrHandler()
                    },
                  'v-button': function(){
                    vm.qill_VButtonHandler()
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
      qill_HrHandler: function(){
            // get the position of the cursor
             let range = this.editor.getSelection(true)
            let index = range.index + range.length
                this.editor.insertEmbed(index,"hr","")
            
        },
        qill_VButtonHandler: function(){
            // get the position of the cursor
             let range = this.editor.getSelection(true)
            let index = range.index + range.length
                this.editor.insertEmbed(index,"v-button","")
            
        },
      selected: function (items) {
        // `this` in event callbacks are automatically bound
        // to the instance that registered it
        this.uploadDialog=false
        Object.keys(items).forEach(function(element) {
          let range = this.editor.getSelection(true)
            let index = range.index + range.length
            this.editor.insertEmbed(index, 'image', items[element].path)
        }, this);
      },
      upload: function () {
        console.log('upload')
      },
      fileadded: function(val){
        this.files = val
      },
      getIcon:function(val){
        let range = this.editor.getSelection(true)
        let index = range.index + range.length
        this.editor.insertEmbed(index, 'image', val.src)
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
      },
        'iconDialog': function(value){
          let el = document.getElementById('iconfacebook')
          //set location Dialog Icon
          let elbuttonIcon = document.querySelector('.ql-icons')
          let position_el_button_icon = elbuttonIcon.getBoundingClientRect()
          el.style.top = (position_el_button_icon.top+ position_el_button_icon.height) + "px"
          el.style.left = (position_el_button_icon.left-(el.getBoundingClientRect().width/2))+ "px"
          //
          if(value){
            el.style.height = 'auto'
            el.focus()
          }else{
            el.style.height = '0'
          }
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
      //component
     
      //
      //load custom tool
      var upload_el = document.querySelector('.ql-upload')
      var child_upload_el = document.createElement('i')
      child_upload_el.setAttribute('class','material-icons icon')
      child_upload_el.innerText='file_upload'
      upload_el.appendChild(child_upload_el)
      //
      upload_el = document.querySelector('.ql-icons')
      child_upload_el = document.createElement('i')
      child_upload_el.setAttribute('class','material-icons icon')
      child_upload_el.innerText='tag_faces'
      upload_el.appendChild(child_upload_el)
    },
    components:{
      FileManager,
      IconFacebook
    }
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

     .ql-hr:after {
        content: "HR";
    } 
    .ql-v-button:after {
        content: "Button";
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
      #iconfacebook{
        position: fixed;
        height: 0;
        top: 0;
        left: 0;
        overflow: hidden;
        box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
        outline: none;
      }
</style>

