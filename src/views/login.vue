<template>
	<div class="login-box">
		<el-form label-width="80px" class="login-form" label-position="top">
			<h2>用户登录</h2>
			<el-form-item label="账号">
				<el-input></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input></el-input>
			</el-form-item>
		 <el-button type="primary" class="login-box-btn">登录</el-button>
		</el-form>
		
	</div>
</template>
<script>
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
