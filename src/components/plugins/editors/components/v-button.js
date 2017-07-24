import Quill from 'quill'
var Embed = Quill.import('blots/block/embed');
class VButton extends Embed {
            static create(value) {
                let node = super.create(value);
                node.setAttribute('style', "display:block;height:50px;width:100px;padding:5px;background-color:red;");
                //node.
                return node;
            }
        }
VButton.blotName = 'v-button';
VButton.className = 'myv-button';
VButton.tagName = 'slider';
export default VButton;