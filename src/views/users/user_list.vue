<template>
	<el-card class="card">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/user' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
			<!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
		</el-breadcrumb>
		<el-row class="user_row">
			<el-col :span="24">
				<el-input placeholder="请输入内容" class="saech_input" v-model="inputVule" clearable @keyup.13.native="gainList">
					<el-button slot="append" icon="el-icon-search" @click="seach_user"></el-button>
				</el-input>
				<!-- <el-button type="success" @click="add_urer_open">添加用户</el-button> -->
				<!-- Form -->
				<el-button type="success" @click="dialogFormVisible = true">添加用户</el-button>
				<el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="30%">
					<el-form :model="form" ref="ruleForm" :rules="rules">
						<el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
							<el-input v-model="form.username" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="密码" :label-width="formLabelWidth" prop="password">
							<el-input v-model="form.password" autocomplete="off" type="password"></el-input>
						</el-form-item>
						<el-form-item label="邮件" :label-width="formLabelWidth" prop="email">
							<el-input v-model="form.email" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
							<el-input v-model="form.mobile" autocomplete="off"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="cfm_save">确 定</el-button>
					</div>
				</el-dialog>
			</el-col>
		</el-row>
		<el-table :data="tableData" style="width: 100%" border stripe>
			<el-table-column type="selection" width="100">
			</el-table-column>
			<el-table-column prop="create_time" label="日期" width="180" :formatter="dataFormat2">
			</el-table-column>
			<el-table-column prop="username" label="姓名" width="180">
			</el-table-column>
			<el-table-column prop="mobile" label="电话">
			</el-table-column>
			<el-table-column label="用户状态" align="center" width="" prop="mg_state">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.mg_state" on-color="#00A854" on-text="启动" on-value="1" off-color="#F04134" off-text="禁止"
					 off-value="0" @change="changeSwitch(scope.row.mg_state,scope.row.id)">
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" size="mini" plain @click="handleEdit(scope.row)"></el-button>
					<el-dialog title="编辑用户" :visible.sync="dialogFormEdit" width="30%">
						<el-form :model="e_form" ref="ruleForm" :rules="rules">
							<el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
								<el-input v-model="e_form.username" autocomplete="off" disabled></el-input>
							</el-form-item>
							<el-form-item label="邮件" :label-width="formLabelWidth" prop="email">
								<el-input v-model="e_form.email" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
								<el-input v-model="e_form.mobile" autocomplete="off"></el-input>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormEdit = false">取 消</el-button>
							<el-button type="primary" @click="e_cfm_save(scope.row)">确 定</el-button>
						</div>
					</el-dialog>
					<el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
					<el-button type="danger" icon="el-icon-delete" size="mini" plain @click="handleDelete(scope.row.id)"></el-button>
					<!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
			 :page-sizes="arr_sizes" :page-size="page_size" layout="total, sizes, prev, pager, next, jumper" :total="totalInit">
			</el-pagination>
		</div>
	</el-card>
</template>
<script>
	export default {
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					phone: '上海市普陀区金沙江路 1518 弄'
				}],
				value: false,
				currentPage4: 1, //当前页码
				totalInit: 0, //总条数
				page_size: 2, //每页显示条目个数
				arr_sizes: [2, 3, 4, 5], //每页显示个数选择器的选项设置
				inputVule: '', //搜索框内容
				dialogFormVisible: false, //添加弹窗条件
				dialogFormEdit: false, //编辑弹窗条件
				form: {
					username: '',
					password: '',
					email: '',
					mobile: ''

				},
				e_form: {
					username: '',
					password: '',
					email: '',
					mobile: '',
					e_id:''

				},
				formLabelWidth: '80px',
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 15,
							message: '长度在 3 到 15 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 15,
							message: '密码在 3 到 15 个字符',
							trigger: 'blur'
						}
					],
					email: [{
						required: true,
						message: '请输入邮件地址',
						trigger: 'blur'
					}],
					mobile: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 11,
							message: '您输入的不符合规则,请检查一下',
							trigger: 'blur'
						}
					]
				}

			}
		},
		methods: {
			//编辑
			handleEdit(i) {
				console.log(i.id)
				this.e_form.e_id=i.id
				this.dialogFormEdit = true
				this.e_form.username = i.username
				this.e_form.email = i.email
				this.e_form.mobile = i.mobile
				

			},
			// 编辑确定
			async e_cfm_save(i){
				
				const res = await this.axios.put('users/' +this.e_form.e_id,{
				
					email:	this.e_form.email,
					mobile:	this.e_form.mobile
				})
				var {
					meta: {
						msg,
						status
					}
				} = res.data
					if (status == 200) {
					this.dialogFormEdit = false
					this.e_form.username = ''
					this.e_form.email = ''
					this.e_form.mobile = ''
					this.gainList()
					}
				console.log(res)
			},
			// 添加
			async cfm_save() {
				console.log(this.form)
				const res = await this.axios.post('users', this.form);
				console.log(res)
				var {
					meta: {
						msg,
						status
					}
				} = res.data
				if (status == 201) {
					this.$message.success(msg)
					this.form.username = ''
					this.form.password = ''
					this.form.email = ''
					this.form.mobile = ''
					this.dialogFormVisible = false
					this.gainList()
				} else {
					this.$message.error(msg)
				}

			},
			// 搜索功能
			seach_user() {
				this.gainList()
			},
			// 分页1
			handleSizeChange(val) {
				this.page_size = val
				this.gainList()
			},
			// 分页2
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage4 = val
				this.gainList()
			},
			//删除
			handleDelete(i) {
				this.$confirm('确定要删除嘛？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消'
					})
					.then(() => {
						this.axios
							.delete('users/' + i)
							.then((res) => {
								alert('删除成功')
								this.currentPage4 = 1
								this.gainList()
							})
					})
					.catch((err) => {
						alert('别瞎点')
					})
			},
			//时间格式化
			dataFormat2: function(row, column) {
				var t = new Date(row.create_time); //row 表示一行数据, updateTime 表示要格式化的字段名称
				var year = t.getFullYear(),
					month = t.getMonth() + 1,
					day = t.getDate(),
					hour = t.getHours(),
					min = t.getMinutes(),
					sec = t.getSeconds();
				var newTime = year + '-' +
					(month < 10 ? '0' + month : month) + '-' +
					(day < 10 ? '0' + day : day) + ' ' +
					(hour < 10 ? '0' + hour : hour) + ':' +
					(min < 10 ? '0' + min : min) + ':' +
					(sec < 10 ? '0' + sec : sec);
				return newTime;
			},
			// 更改状态
			async changeSwitch(data, t) {
				console.log(data) //状态
				console.log(t) //id
				const res = await this.axios.put('users/' + t + '/state/' + data);
				console.log(res)

				var {
					meta: {
						msg,
						status
					}
				} = res.data
				if (status == 200) {
					this.$message(msg)
				} else {
					this.$message(msg)
				}
			},
			// 获取用户列表
			async gainList() {
				const res = await this.axios.get(
					`users?pagenum=${this.currentPage4}&pagesize=${this.page_size}&query=${this.inputVule}`);
				console.log(res)
				var {
					data: {
						pagenum,
						total,
						users
					}
				} = res.data
				var {
					meta: {
						msg,
						status
					}
				} = res.data
				if (status == 200) {
					this.tableData = users
					this.totalInit = total
				} else {
					this.$message(msg)
				}


				this.inputVule = ''
			}

		},
		// 钩子函数
		beforeMount() {
			this.gainList()

		},

	}
</script>
<style>
	.card {
		height: 100%;
	}

	.user_row {
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.saech_input {
		width: 300px;
	}
</style>
