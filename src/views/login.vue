<template>
	<div class="login-box">
		<el-form label-width="80px" class="login-form" label-position="top">
			<h2>用户登录</h2>
			<el-form-item label="账号">
				<el-input  v-model="fromData.user"></el-input>
			</el-form-item>
			<el-form-item label="密码" >
				<el-input @keyup.enter.native="loginBtn"
				v-model="fromData.password" ></el-input>
			</el-form-item>
		
		 <el-button type="primary" class="login-box-btn" @click="loginBtn">登录</el-button>
		</el-form>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				fromData:{
					user:'',
					password:''
				}
			}
		},
		methods:{
			
			async loginBtn(){
				
			const res = await this.axios.post('login',{
					username:this.fromData.user,
					password:this.fromData.password,
				})	
					var {meta:{msg,status}} =res.data
					if(status==200){
						// 登录成功
						this.$message.success(msg)
						sessionStorage.setItem('token',res.data.data.token)
						this.$router.push('/user')
						}else{
							// 登陆失败
							this.$message.error(msg)
						}
			}
			
		}
	}
</script>
<style>
	.login-form{
		width: 500px;
		background: #fff;
		padding: 30px;
		border-radius: 5px;
	}
	.login-box-btn{
		width: 100%;
	}
	.login-box {
		height: 100%;
		background: #314052;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
