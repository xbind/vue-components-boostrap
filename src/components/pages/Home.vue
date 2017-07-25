<template>
	<v-container fluid>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<v-card>
					<v-toolbar class="teal white--text" dark>
						<v-toolbar-side-icon></v-toolbar-side-icon>
						<v-toolbar-title>Menu Home</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-btn icon @click.native.stop="add" v-tooltip:top="{ html: 'Thêm thẻ' }">
							<v-icon>add</v-icon>
						</v-btn>
					</v-toolbar>
					<div class="layout-menu">
						<tree-menu :items="list" :callbackitemactive="setdatadialog"></tree-menu>
					</div>
				</v-card>
			</v-flex>
		</v-layout>
		<v-layout row justify-center>
			<v-dialog v-model="dialog" width="50%">
				<v-card v-if="action!='del'">
					<v-card-text>
						<br>
						<v-text-field label="Title" required v-model="datadialog.name"></v-text-field>
						<v-select
							v-bind:items="list_type_menu"
							v-model="typemenu"
							label="Select"
							single-line
							item-text="name"
							item-value="id"
							return-object
							autocomplete
							></v-select>
						<v-select v-show="isNameUrl"
						v-bind:items="list_url_menu"
						v-model="namelinkmenu"
						label="Name"
						item-value="id"
						item-text="name"
						return-object
						autocomplete
						id="auto-complete-url-menu"
						></v-select>
						<v-text-field
						v-show="!isNameUrl"
						label="URL"
						v-model="urlmenu"
						></v-text-field>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn class="blue--text darken-1" flat @click.native="dialog = false">Đóng</v-btn>
						<v-btn class="blue--text darken-1" flat @click.native="save">{{action=="edit"?'Cập Nhật':'Thêm'}}</v-btn>
					</v-card-actions>
				</v-card>

				<v-card v-else>
					<v-card-text>
						<p class="text-xs-center red--text">
							Bạn muốn xóa!.
						</p>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn class="blue--text darken-1" flat @click.native="dialog = false">Không</v-btn>
						<v-btn class="blue--text darken-1" flat @click.native="save">Có</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-layout>
		<br>
		<code>{{list}}</code>
	</v-container>
</template>
<script>
	import axios from 'axios'
	import TreeMenu from '../plugins/TreeMenu.vue'
	export default {
		name: 'Home',
		data() {
			return {
				typemenu: {},
				list_type_menu: [],
				namelinkmenu: {},
				urlmenu:'',
				list_url_menu: [],
				isNameUrl: true,
				labelUrl: "Name",
				////
				var_isdialogmenu: true,
				is_submenu_active_save: true,
				list_del: null,
				action: "add",
				dialog: false,
				datadialog: {
					id: null,
					name: "New Title",
					menuable_type:null,
    				menuable_id: null,
					url: null,
					index: null,
					parent_id: null,
					description: null,
					children: []
				},
				datatemp: {
					id: null,
					name: "New Title",
					menuable_type:null,
    				menuable_id: null,
					url: null,
					index: null,
					parent_id: null,
					description: null,
					children: []
				},
				list: []
			}
		},
		watch:{
			'typemenu':function(val){
					if(val.name.toLowerCase() == ('Link Other').toLowerCase()){
						this.isNameUrl = false
						this.list_url_menu = []
					}else{
						this.isNameUrl = true
					}
				this.datadialog.menuable_type = val.name
				this.datadialog.menuable_id = val.id
			},
			'namelinkmenu':function(val){
				this.datadialog.menuable_idname = val.id
				this.datadialog.menuable_name = val.name
			},
			'urlmenu':function(val){
				this.datadialog.url= (!this.isNameUrl)?val:''
			}

		},
		mounted:function(){
			//load list menu
			axios.get('http://beta.json-generator.com/api/json/get/Nkx5dINH7').then((res)=>{
				this.list = res.data
			})
			//
			this.findTypeMenu()
			let el_auto_complete_url_menu = document.querySelector('#auto-complete-url-menu input')
			let vm = this
			el_auto_complete_url_menu.addEventListener('input',function(e){
				vm.findnamelinkmenu()
			})

		},
		components: {
			TreeMenu
		},
		methods: {
			findTypeMenu:function(){
				axios.get('http://beta.json-generator.com/api/json/get/413HB2ArQ').then((res)=>{
					this.list_type_menu = res.data
				})
			},
			findnamelinkmenu:function(){
				console.log('find')
				axios.get('http://beta.json-generator.com/api/json/get/E1kSEVkIm').then((res)=>{
					this.list_url_menu = res.data
				})
			},
			reset_Dialog:function(){
				this.typemenu = this.namelinkmenu = {}
			},
			add: function () {
				this.is_submenu_active_save = true
				this.dialog = true
				this.action = "add"
				this.typemenu = {
					 	id:null,
					 	name:''
					 	}
					 this.namelinkmenu = {
					 	id:null,
					 	name:null
					 	}
					this.list_url_menu=[]
				this.datadialog = {
					id: null,
					name: "New Title",
					url: "",
					index: null,
					parent_id: null,
					children: []
				}
			},
			save: function () {
				if (this.action == "edit") {
					//axios edit
					var edited = false
					axios.get('/menu/edit',{data:this.datadialog}).then((response) => {
						//send data edit
						//trả về kq xử lí
						edited = response.data.edited
					}).catch(error => {
						return
					})
					if(edited){
						//save data submenus
					this.datatemp.name = this.datadialog.name
					this.datatemp.menuable_id = this.datadialog.menuable_id
					this.datatemp.menuable_type = this.datadialog.menuable_type
					this.datatemp.url = this.isNameUrl?null:this.datadialog.url
					this.datatemp.menuable_idname = this.isNameUrl?this.datadialog.menuable_idname:null
					this.datatemp.menuable_name =  this.isNameUrl?this.datadialog.menuable_name:null
					this.datatemp.index = this.datadialog.index
					this.datatemp.id = this.datadialog.id
					this.datatemp.parent_id = this.datadialog.id
					}	
				} else if (this.action == "add") {
					//save when add menu
					var data_send = {}
					if (this.is_submenu_active_save)
						{
							data_send = {
							id: null,
							name: this.datadialog.name,
							menuable_id: this.typemenu.id,
							menuable_type: this.typemenu.name,
							menuable_idname: this.namelinkmenu.id,
							menuable_name: this.namelinkmenu.name,
							url: this.urlmenu,
							index: this.datadialog.index,
							parent_id: null,
							children: []}
							//axios add
							var added = false
							axios.get('/menu/add',{data:data_send}).then((response) => {
								//send data add
								//trả về kq xử lí
								data_send.id = response.data.id
								added = response.data.added
							}).catch(error => {
								return
							})
							//add on client
							if(added)
								this.list.push(data_send)
						}	
					else{
						data_send = {
							id: null,
							name: this.datadialog.name,
							menuable_id: this.typemenu.id,
							menuable_type: this.typemenu.name,
							menuable_idname: this.namelinkmenu.id,
							menuable_name: this.namelinkmenu.name,
							url: this.urlmenu,
							index: this.datadialog.index,
							parent_id: this.datatemp.id,
							children: []}
							//axios add
							var added = false
							axios.get('/menu/add',{data:data_send}).then((response) => {
								//send data add
								//trả về kq xử lí
								data_send.id = response.data.id
								added = response.data.added
							}).catch(error => {
								return
							})
							//add on client 
							if(added)
							this.datatemp.children.push(data_send)
					}
				} else if (this.action == "del") {
					//axios del
					var delelted = false
					axios.get('/menu/del',{id:this.datatemp.id}).then((response) => {
						//send data del
						//trả về kq xử lí
						delelted = response.data.delelted
					}).catch(error => {
						return
					})
					if(delelted){
						var index = this.list_del.indexOf(this.datatemp)
						this.list_del.splice(index, 1)
					}
				}
				this.dialog = false
			},
			setdatadialog: function (data, action, items) {
				this.action = action
				this.is_submenu_active_save = false
				this.dialog = true
				this.datatemp = data
				if (action == "edit")
				{	
					 this.typemenu = {
					 	id:data.menuable_id,
					 	name:data.menuable_type
					 	}
					 this.namelinkmenu = {
					 	id:data.menuable_idname,
					 	name:data.menuable_name
					 	}
					this.list_url_menu= [{
						id: this.namelinkmenu.id,
					 	name: this.namelinkmenu.name}]
					this.urlmenu = data.url
					this.datadialog = {
						id: data.id,
						name: data.name,
						menuable_id: this.typemenu.id,
						menuable_type: this.typemenu.name,
						menuable_idname: this.namelinkmenu.id,
						menuable_name: this.namelinkmenu.name,
						index: data.index,
						url: this.urlmenu,
						children: []
					}
				}
				else if (action == "add")
				{
					this.typemenu = {
					 	id:null,
					 	name:''
					 	}
					 this.namelinkmenu = {
					 	id:null,
					 	name:null
					 	}
					this.list_url_menu=[]
					this.urlmenu = null
					this.datadialog = {
						id: 1,
						name: "New Title",
						url: "",
						index: null,
						children: []
					}
				}
				else if (action == "del") {
					this.list_del = items
				}
			}
		}

	}

</script>

<style>
	.layout-menu>ul {
		margin-top: 10px;
		margin-left: 0;
	}
	code {
		width: 95%;
		height: 200px;
		overflow-y: auto;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
	}

</style>
