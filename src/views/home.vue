<template>
	<el-container>
		<el-header>
			<el-row>
				<el-col :span="4">
					<img src="@/assets/img/head_logo.png" alt="">
				</el-col>
				<el-col :span="18">
					<h2>爱途电商后台管理</h2>
					</div>
				</el-col>
				<el-col :span="2">
					<a href="" @click.prevent="quit">退出</a>
				</el-col>
			</el-row>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu default-active="/user" class="el-menu-vertical-demo" :unique-opened="true" :router="true">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-user"></i>
							<span>用户管理</span>
						</template>
						
						<el-menu-item index="/user">	<i class="el-icon-s-check"></i>用户列表</el-menu-item>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-warning-outline"></i>
							<span>权限管理</span>
						</template>
						<el-menu-item index="/role">	<i class="el-icon-menu"></i>角色管理</el-menu-item>
						<el-menu-item index="/ction">	<i class="el-icon-s-cooperation"></i>权限管理</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
							<i class="el-icon-s-cooperation"></i>
							<span>商品管理</span>
						</template>
						<el-menu-item index="3-1">	<i class="el-icon-share"></i>商品列表</el-menu-item>
						<el-menu-item index="3-2">	<i class="el-icon-star-on"></i>分类参数</el-menu-item>
						<el-menu-item index="3-3">	<i class="el-icon-s-release"></i>商品分类</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title">
							<i class="el-icon-shopping-cart-full"></i>
							<span>订单管理</span>
						</template>
						<el-menu-item index="4-1">订单管理</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title">
							<i class="el-icon-s-data "></i>
							<span>数据统计</span>
						</template>
						<el-menu-item index="5-1">数据统计</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main>Main</el-main>
		</el-container>
	</el-container>
</template>
<script>
	export default{
		beforeMount(){
			var token =sessionStorage.getItem('token')
			if(!token){
				this.$message('您还未登录')
				this.$router.push('/login')
			}
		},
		methods:{
			quit(){
				this.$confirm('您确定退出系统吗？','提示',{
					  confirmButtonText: '确定',
          cancelButtonText: '取消'
				})
				.then((res)=>{
						sessionStorage.removeItem('token')
					this.$router.push('/login')
				})
				.catch((err)=>{
					this.$message('不退你瞎点个啥？')
				})
						
		
			
			}
		}
	}
</script>
<style>
	.el-container {
		height: 100%;
	}
	.el-menu {
		height: 100%;
	}

	.el-row,
	.el-col {
		height: 100%;
	}

	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;

	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;

	}
</style>
