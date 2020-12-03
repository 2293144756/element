<template>
	<section class="checkout-section cart-ground">
		<h3>{{orderInfo.shopInfo.name}}</h3>
		<ul>
			<li v-for="(item,index) in orderInfo.selectFoods" :key="index">
				<img :src="item.image_path"/>
				<div class="cart-ground-info">
					<span class="name">{{item.name}}</span>
					<span class="count">x{{item.count}}</span>
					<span class="fixed_price">￥{{item.activity.fixed_price}}</span>
				</div>
			</li>
			<li class="cart-ground-total">
				<div>配送费</div>
				<div class="price">￥{{orderInfo.shopInfo.float_delivery_fee}}</div>
			</li>
		</ul>
		<div class="result"><span>小计￥</span>{{result}}</div>
	</section>
</template>

<script>
	export default {
		name:'cartGround',
		data()
		{
			return {
				count:0
			}
		},
		props: {
			orderInfo:Object
		},
		created()
		{
			this.getData()
		},
		computed:{
			result()
			{
				this.count=0
				for(let i=0; i<this.orderInfo.selectFoods.length; i++)
				{
					this.count += this.orderInfo.selectFoods[i].count * this.orderInfo.selectFoods[i].activity.fixed_price + this.orderInfo.shopInfo.float_delivery_fee
				}
		        return this.count
			}
		},
		methods:{
			getData()
			{
			
			}
		}
	}
</script>

<style scoped="scoped">
	.cart-ground {
	    top: 10px;
		background-color: #FFFFFF;
		padding: 15px 15px;
		background-color: #FFFFFF;
		box-sizing: border-box;
		width:97% ;
		margin: auto;
		position: relative;
		}
	.cart-ground ul li img {
		width: 35px;
		height: 35px;
	}
	.cart-ground ul {
		margin-top: 20px;
	}
	.cart-ground ul li {
		display: flex;
		border-bottom: 1px #EEEEEE solid;
		height: 45px;
		line-height: 45px;
		font-size: 14px;
		font-weight: 550;
	
	}

	.cart-ground h3 {
		font-size: 16px;
		font-weight: 600;
	}
	.cart-ground-info {
		flex: 1;
		padding-left: 10px;
		display: flex;
		justify-content: space-between;
	}
	..cart-ground-info .count {
		margin-left: 30px;
	}
	.cart-ground-total .price {
		position: absolute;
		right: 14px;
	}
	.result {
		height: 50px;
		line-height: 50px;
		font-size: 20px;
		font-weight: 600;
		text-align: right;
	}
	.result>span {
		font-size: 14px;
	}
</style>
