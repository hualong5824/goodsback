import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)
import login from '@/views/login.vue'
import home from '@/views/home.vue'
export default new Router({
  routes: [
    {
		name:'login',
    path:'/login',
		component:login
    },
		{
		path:'/',
		component:home
		}
  ]
});
