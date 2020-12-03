<template>
	<div class="header">
		<div class="header-button is-left" v-if="isLeft">
			<i class="fa fa-chevron-left"></i>
			<button @click="$router.go(-1)">返回</button>
		</div>
		<h1 class="header-title">{{title}}</h1>
	</div>
</template>

<script>
	export default {
		name:'Header',
		props:{
			title:String,
			isLeft:Boolean
		}
	}
</script>

<style scoped>
	.header {
		position: relative;
		width: 100%;
		height: 45px;
		background-color: #009eef;
	
	}
	.header-button {
		position: absolute;
		
		line-height: 45px;
	}
	.header-button>i {
		color: #F1F1F1;
		position: relative;
		left: 4px;
	}
	.header-button button {
		border-color: transparent;
		font-size: 14px;
		background-color:  #009eef;
		color: #F1F1F1;
		outline: none;
	
	}
	.header-title {
		width: 100%;
		line-height: 45px;
		text-align: center;
		color: #FFFFFF;
		font-size: 16px;
	}
</style>
