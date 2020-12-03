<template>
	<div class="nav-bar">
		<router-link to="/goods" class="pro">
			点餐
		</router-link>
		<router-link to="/seller" class="pro">
			评价
		</router-link>
		<router-link to="/components" class="pro">
			商家
		</router-link>
	</div>
</template>

<script>
	export default {
		name:'NavBar'
	}
</script>

<style scoped="scoped">
	.nav-bar {
		display: flex;
		height: 45px;
		width: 100%;
		background-color: #FFFFFF;
		position: sticky;
		top: 0px;
		z-index:9 ;
	    border-bottom: 1px #EEEEEE solid;
	}
	.pro {
		flex: 1;
		text-decoration: none;
		text-align: center;
		color:black;
		line-height: 45px;
		
	}
	
</style>
