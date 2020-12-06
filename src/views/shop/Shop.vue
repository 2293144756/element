<template>
	<div class="shop" v-if="shopInfo">
		<nav class="header-nav">
			<div class="nav_bg">
				<img :src="shopInfo.rst.scheme" alt=""/>
			</div>
			<div class="nav_back" >
				<i class="fa fa-chevron-left" @click="$router.push('/home')"></i>
			</div>
			<div class="shop_image">
				<img :src="shopInfo.rst.image_path" alt=""/>
			</div>
		</nav>
		<div class="index-rst">
			<div class="rst-name">
				<span @click="showInfo=true">{{shopInfo.rst.name}}</span>
				<i class=" fa fa-caret-right"></i>
			</div>
			<info-mode @btnclick="showInfo=false" :rst="shopInfo.rst" :showInfo="showInfo"></info-mode>
			
			<div class="rst-order">
				<span>评分{{shopInfo.rst.rating}}</span>
				<span>月售{{shopInfo.rst.recent_order_num}}单</span>
				<span>蜂鸟专送{{shopInfo.rst.order_lead_time}}分钟</span>
			</div>
			<Activity :activities="shopInfo.rst.activities"></Activity>
			<p class="rst-promotion">公告: {{shopInfo.rst.promotion_info}}</p>
		</div>
		
		
		<nav-bar></nav-bar>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	import infoMode from '../../components/shops/infoMode.vue'
	import Activity from '../../components/shops/Activity.vue'
	import NavBar from '../../components/NavBar.vue'
	
	export default {
		name:'Shop',
		data()
		{
			return {
				shopInfo:null,
				showInfo:false,
				isShow:false
			}
		},
		created()
		{
			this.getData()
			
		},
		components:{
			infoMode,
			Activity,
			NavBar
		},
		methods:{
			getData()
			{
				this.$axios('api/profile/batch_shop').then(res=>{
					this.shopInfo = res.data
				
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.shop {
		width: 100vw;
		height: 100vh;
		overflow: auto;
        z-index: 99999999;
	}
	.header-nav {
		position: relative;
		
	}
	.header-nav .nav_back {
		position: absolute;
		top: 3px;
		left: 0.1875rem;
		color: #FFFFFF;
	}
	.nav_bg img {
		width: 100%;
		height: 100%;
	}
	.shop_image {
		position: absolute;
		left: 50%;
		transform: translate(-50% , -70%);
		z-index: 100;
	}
	.shop_image img {
		width: 100px;
		height: 100px;
	
	}
	.index-rst {
	
		position: relative;
		background-color: #Fff;
		padding-top: 50px;
		
	}
	.rst-name {
		text-align: center;
		font-size: 18px;
		font-weight: 600;
	}
	.rst-order {
		text-align: center;
		margin-top: 10px;
		
	}
	.rst-order span {
		margin-left: 12px;
		font-size: 8px;
		color: #AAAAAA;
	}
	.rst-promotion {
		margin-top: 10px;
		position: relative;
		left: 35px;
		font-size: 8;
		color: #AAAAAA;
	}
</style>
