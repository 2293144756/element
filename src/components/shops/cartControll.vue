<template>
	<div class="cartcontrol">
		<span class="cartbutton button-minus"  @click="btnclicke" v-if="food.count > 0"> <i class="fa fa-minus"></i></span>
		<span class="cartcount" v-if="food.count > 0">{{food.count}}</span>
		<span class="cartbutton" @click="btnclick" ><i class="fa fa-plus-circle"></i></span>
	</div>
</template>

<script>
	export default {
		name:'cartControll',
		props:{
			food:Object
		},
		methods:{
			btnclick()
			{
				this.food.count++
			
			},
			btnclicke()
			{
				this.food.count--
			}
		}
	}
</script>

<style scoped="scoped">
	.cartcount {
		padding: 0 10px;
		color: #000000;
	}
	.cartbutton {
		color: #009EEF;
		font-size: 16px;
	}
	.button-minus {
	
	}
</style>
