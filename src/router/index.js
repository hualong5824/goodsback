import Vue from 'vue';
import Router from 'vue-router';

import login from '@/views/login.vue'
import home from '@/views/home.vue'
import user from '@/views/users/user_list.vue'
import role from '@/views/role/role_list.vue'
Vue.use(Router)
export default new Router({
	routes: [{
			name: 'login',
			path: '/login',
			component: login
		},
		{
			name:'home',
			path: '/',
			component: home,
			children:[
				{name:'users',path:'/user',component:user},
				{name:'role',path:'/role',component:role}
			]
		}
	]
});
