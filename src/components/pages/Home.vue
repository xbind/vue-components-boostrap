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
			<v-dialog v-model="dialog">
				<v-card v-if="action!='del'">
					<v-card-text>
						<br>
						<v-text-field label="Title" required v-model="datadialog.name"></v-text-field>
						<v-text-field label="URL" required v-model="datadialog.url"></v-text-field>
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
				var_isdialogmenu: true,
				is_submenu_active_save: true,
				list_del: null,
				//itemtemp:null,
				action: "add",
				dialog: false,
				datadialog: {
					id: null,
					name: "New Title",
					url: null,
					parent_id: null,
					children: []
				},
				datatemp: {
					id: null,
					name: "New Title",
					url: null,
					parent_id: null,
					children: []
				},
				list: [{
						id: 1,
						name: "Laptop",
						url: "",
						parent_id: null,
						children: []
					},
					{
						id: 2,
						name: "Smartphone",
						url: "",
						parent_id: null,
						children: [{
								id: 4,
								name: "Iphone",
								url: "",
								parent_id: 2,
								children: []
							},
							{
								id: 5,
								name: "Oppo",
								url: "",
								parent_id: 2,
								children: []
							},
						]
					},
					{
						id: 3,
						name: "Desktop",
						url: "/desktop",
						parent_id: null,
						children: [{
								id: 6,
								name: "Windows",
								url: "http",
								parent_id: 3,
								children: []
							},
							{
								id: 7,
								name: "Mac",
								url: "",
								parent_id: 3,
								children: []
							},
						]
					},
				]
			}
		},
		components: {
			TreeMenu
		},
		methods: {
			add: function () {
				this.is_submenu_active_save = true
				this.dialog = true
				this.action = "add"
				this.datadialog = {
					id: null,
					name: "New Title",
					url: "",
					parent_id: null,
					children: []
				}
			},
			save: function () {
				if (this.action == "edit") {
					//save data submenus
					//this.datatemp.id = this.datadialog.id
					this.datatemp.name = this.datadialog.name
					this.datatemp.url = this.datadialog.url
					//axios edit
					axios.get('').then((response) => {

					}).catch(error => {
						return
					})
				} else if (this.action == "add") {
					//save when add menu
					if (this.is_submenu_active_save)
						this.list.push({
							id: null,
							name: this.datadialog.name,
							url: this.datadialog.url,
							parent_id: null,
							children: []
						})
					else
						this.datatemp.children.push({
							id: this.datadialog.id,
							name: this.datadialog.name,
							url: this.datadialog.url,
							parent_id: this.datatemp.id,
							children: []
						})
					//axios add
					axios.get('').then((response) => {

					}).catch(error => {
						return
					})
				} else if (this.action == "del") {
					var index = this.list_del.indexOf(this.datatemp)
					this.list_del.splice(index, 1)
					//axios del
					axios.get('').then((response) => {

					}).catch(error => {
						return
					})
				}
				this.dialog = false
			},
			setdatadialog: function (data, action, items) {
				this.action = action
				this.is_submenu_active_save = false
				this.dialog = true
				this.datatemp = data
				if (action == "edit")
					this.datadialog = {
						id: data.id,
						name: data.name,
						url: data.url,
						children: []
					}
				else if (action == "add")
					this.datadialog = {
						id: 1,
						name: "New Title",
						url: "",
						children: []
					}
				else if (action == "del") {
					this.list_del = items
					console.log('hi')
					console.log(this.list_del)
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
