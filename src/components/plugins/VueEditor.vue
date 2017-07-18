<template>
    <div class="editor-container">
        <div id="editor">
        </div>
    </div>
</template>

<script>
  import Quill from 'quill'

  export default{
    data(){
      return {
        editor: {},
        showSource: false,
      }
    },
    props: {
      content: {},
      bus: {
        default: false,
      },
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
                  ['source']                                         // remove formatting button
                ],
                handlers: {
                  "source": function () {
                    var code = document.querySelector('.code-editor>textarea')
                    code.classList.toggle('hidden')
                    if (code.classList.contains('hidden')) {
                      vm.editor.pasteHTML(code.value)
                    } else {
                      code.value = vm.editor.root.innerHTML
                    }
                  }
                }
              }
            },
            theme: 'snow',
            placeholder: 'Hello world...',
          }
        }
      }
    },
    methods: {},
    computed: {},
    mounted()
    {
      this.editor = new Quill('#editor', this.options)

//      if (this.content && this.content !== '') {
//        if (this.output != 'delta') {
//          this.editor.pasteHTML(this.content)
//        } else {
//          this.editor.setContents(this.content)
//        }
//      }

      this.editor.on('text-change', (delta, source) => {
        this.$emit('text-change', this.editor, delta, source)
        this.$emit('input', this.output != 'delta' ? this.editor.root.innerHTML : this.editor.getContents())
      })

      var txtArea = document.createElement('textarea');
      txtArea.className = 'code-editor hidden'
      txtArea.setAttribute('v-model', 'content')
//
      let codeEditor = this.editor.addContainer('code-editor')
      codeEditor.appendChild(txtArea)

    },
//    beforeDestroy() {
//      if (this.bus) {
//        this.bus.$off('focus-editor')
//        this.bus.$off('set-content')
//        this.bus.$off('set-html')
//      }
//    },
  }

</script>

<style>
    .editor-container > div.ql-container {
        min-height: 300px;
    }

    .ql-source:after {
        content: "[<>]";
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

    .hidden {
        display: none;
    }
</style>

