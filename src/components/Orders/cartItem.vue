<template>
	<div class="cart-item" >
		<div class="cart-item-title">{{title}}</div>
		<div class="cart-item-right" @click="$emit('btnclick')" v-if="subHead">
			<div>
				<span>{{subHead}}</span>
				<i class="fa fa-angle-right"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'cartItem',
		props:{
			title:String,
			subHead:String
		},
		computed:{
		   
		}
	}
	
	 
</script>

<style scoped="scoped">
	.cart-item {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content:space-between;
		padding: 0px 5px;
		border-bottom: 1px #EEEEEE solid;
		
	}
	.cart-item-title {
		font-size: 15px;
		font-weight: 550;
	}
	.cart-item-right {
		color: #AAAAAA;
		font-size: 14px;
	}
</style>
