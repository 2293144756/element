<template>
	<div class="index">
		<router-view></router-view>
		
		<tab-bar :data="tabbarData"></tab-bar>
	</div>
</template>

<script>
	import TabBar from './TabBar.vue'
	export default {
		name:'index',
		data()
		{
			return {
				tabbarData:[
					{title:'首页', icon:'home',path:'/home'},
					{title:'订单', icon:'file-text-o', path:'/order'},
					{title:'我的', icon:'user', path:'/me'}
				]
			}
		},
		components:{
			TabBar
		}
	}
</script>

<style scoped>
	.index {
		width: 100%;
		height: 100%;
		height: calc(100% - 45px);
		position: relative;
	}
</style>
