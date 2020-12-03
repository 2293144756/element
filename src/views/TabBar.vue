<template>
	<div class="tab-bar">
		<router-link v-for="(item,index) in data" class="tab-item" :to="item.path" :key="index" active-class="is-select" >
			<div class="tab-item-icon">
				<i :class="'fa fa-' + item.icon"></i>
			</div>
			<div class="tab-item-lable">
				{{item.title}}
			</div>
		</router-link>
	</div>
</template>

<script>
	export default {
		name:'TabBar',
		props:{
			data:{
				type:Array,
				default: []
			}
		}
	}
</script>

<style scoped>
	.tab-bar {
		z-index: 99;
		position: fixed;
		width: 100%;
		height: 45px;
		box-sizing: border-box;
		bottom: 0;
		background-image: linear-gradient(
		   180deg,
		   #d9d9d9,
		   #d9d9d9 50%,
		   transparent:0
		);
		background-size: 100% 1px;
		background-repeat: no-repeat;
		background-position: 0 0 ;
		background-color: #fafafa;
		display: flex;
		text-align: center;
	
	}
	.tab-item {
		display: block;
		pad: 3px 0;
		flex: 1;
	}
	.tab-item-icon {
		width: 20%;
		height: 20px;
		margin: 0 auto 5px;
		padding: 3px 0;
	}
	.tab-item-icon i {
		font-size: 17px;
	}
	.tab-item-lable {
		color: inherit;
		font-size: 10px;
		line-height: 1;
	}
	a {
		text-decoration: none;
		color: #999;
	}
	.is-select {
		color: #009eef;
	}
	
</style>
