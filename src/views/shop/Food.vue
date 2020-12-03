<template>
	<transition class="move">
		<div class="food" v-if="isShow">
			<div class="foodpanel-close" @click="$emit('btnclick')">
				<img src="https://fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/"/>
			</div>
			<div class="foodpanel-foodbody">
				<div class="foodpanel-foodimg">
					<img  :src="food.image_path"/>
				</div>
				<div class="foodpanel-foodinfo">
					<h4><span>{{food.name}}</span></h4>
					<div class="foodpanel-fooodsales">
						<span>月售{{food.month_sales}}%</span>
						<span>好评率{{food.satisfy_rate}}%</span>
					</div>
					<div class="foodpanel-foodprice">
						<span>￥{{food.activity.fixed_price}}</span>
						<cart-controll :food="food" class="cart-btn"></cart-controll>
					</div>
					<p>{{food.description}}</p>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import cartControll from '../../components/shops/cartControll.vue'
	export default {
		name:'Food',
		props:{
			food:Object,
			isShow:Boolean
		},
		components: {
			cartControll
		}
	}
</script>

<style scoped="scoped">
	.food {
		position: fixed;
		top: 0px;
		background-color: #FFFFFF;
		z-index: 9999;
		height: calc(100vh - 45px);
	}
	.foodpanel-close {
		position: absolute;
		right: 10px;
		top: 10px;
	}
	.foodpanel-close img{
		background-color:rgba(61,61,62, 0.5);
		height: 26px;
		width: 26px;
		border-radius: 50%;
	}
	.foodpanel-foodimg img {
		width: 100%;
	}
	.foodpanel-foodinfo {
		padding-left: 10px;
	}
	.foodpanel-foodinfo h4 span {
		font-size: 15px;
		font-weight: 600;
	}
	.foodpanel-fooodsales {
		margin-top: 10px;
	}
	.foodpanel-foodprice {
		color: red;
		margin-top: 10px;
		font-size: 14px;
		position: relative;
	}
	.cart-btn {
		position: absolute;
		right: 5px;
		top: -10px;
	}
	.foodpanel-foodbody p {
		margin-top: 15px;
		
	}
	.move-enter-active,
	.move-leave-active {
		transition: all 0.25s ease-in;
		transform: translate(0 , -500px);
	}
	.move-enter,
	.move-leave-to {
		transform: translate(0 , 500px);
	}
</style>
