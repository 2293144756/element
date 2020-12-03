import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
  
  
const routes = [
    {
		path:'/index',
		component:()=>import('../views/index.vue'),
		children:[
			{
				path:'/',
				redirect:'home'
			},
			{
				path:'/home',
				name:'home',
				component:()=>import('../views/Home.vue')
			},
			{
				path:'/order',
				name:'order',
				component:()=>import('../views/Order.vue')
			},
			{
				path:'/me',
				name:'me',
				component:()=>import('../views/Me.vue')
			}
			
		]
		
	},
	{
		path:'/address',
		name:'address',
		component:()=>import('../views/Address.vue')
	},
	{
		path:'/city',
		name:'city',
		component:()=>import('../views/City.vue')
	},
	{
		path:'/search',
		name:'search',
		component:()=>import('../views/Search.vue')
	},
	{
		path:'/shop',
		redirect:'/goods',
		component:()=>import('../views/shop/Shop.vue'),
		children:[
		
			{
				path:'/goods',
				name:'goods',
				component: ()=>import('../views/shop/Goods.vue')
			},
			{
				path:'/seller',
				name:'seller',
				component: ()=>import('../views/shop/Seller.vue')
			},
			{
				path:'/components',
				name:'components',
				component: ()=>import('../views/shop/Components.vue')
			}
		]
	},
	{
		path:'/addaddress',
		name:'addaddress',
		component:()=>import('../views/Orders/AddAddress.vue')
	},
	{
		path:'/myaddress',
		name:'myaddress',
		component:()=>import('../views/Orders/MyAddress.vue')
	},
	{
		path:'/settlement',
		name:'settlement',
		component:()=>import('../views/Orders/Settlement.vue')
	},
	{
	    path:'/login',
		name:'login',
		component:()=>import('../views/Login.vue')
	},
	{
		path:'/taste',
		name:'taste',
		component:()=>import('../views/Taste.vue')
	},
    {
		path:'/pay',
		name:'pay',
		component:()=>import('../views/Pay.vue')
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const isLogin = localStorage.ele_app ? true : false;
  if (to.path == '/login') {
    next();
  } else {
    // 是否在登录状态下
    isLogin ? next() : next('/login');
  }
});

export default router
