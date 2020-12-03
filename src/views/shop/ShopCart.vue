<template>
	<div class="shopcart">
		<div class="caerview-cartmask" v-if="showCartview && !isEmpty ">
			<div class="cartview-body">
				<div class="cartview-header">
					<span>已选商品</span>
					<button @click="btnclick">
						<i class="fa fa-trash-o"></i>
						<span>清空</span>
					</button>
				</div>
				<div class="entityList-cartbodyScroller">
					<ul class="entityList-cartList">
						<li class="entityList-entityrow" v-for="(food,index) in resultList" :key="index">
							<h4><span>{{food.name}}</span></h4>
							<span>￥{{food.activity.fixed_price}}</span>
							<cartControll :food="food"></cartControll>
						</li>
					</ul>
				</div>
			</div>
		</div>
		
		
	  <div class="bottom-nav">
		  <span class="bottomNav-carticon" :class="{'activee':isEmpty}" @click="showCartview =!showCartview">
			  <i class="fa fa-cart-plus"></i>
			  <div class="result" v-if="result">{{result}}</div>
		  </span>
		  <div class="bottomNav-cartInfo">
			  <p class="bottomNav-cartTotal">
				  <span class="shop" v-if="isEmpty">未选中商品</span>
				  <span v-else>￥{{price.toFixed(2)}}</span>
			  </p>
			  <p class="bottomNav-cartdelivery">另需配送费{{shopInfo.rst.float_delivery_fee}}元</p>
		  </div>
		  <button class="submit-btn"  :class="{'active':isEmpty}">
			  <span :class="{'active':isEmpty}" v-if="isEmpty">￥{{shopInfo.rst.float_minimum_order_amount}}元起送</span>
			  <span v-else @click="settlement">去结算</span>
		  </button>
	  </div>
	</div>
</template>

<script>
	import cartControll from '../../components/shops/cartControll.vue'
	export default {
		name:'ShopCart',
		data()
		{
			return {
				price:0,
				result:0,
				resultList:[],
				showCartview:false
			}
		},
		props:{
			shopInfo:Object
		},
		created()
		{
			this.getData()
		},
		components:{
			cartControll
		},
		computed: {
			isEmpty()
			{
				let empty=true;
				this.price=0;
				this.result=0;
				this.resultList=[]
				this.shopInfo.recommend.forEach(recommend=>{
					recommend.items.forEach(item=>{
						if(item.count)
						{
							empty=false;
							this.result += item.count
							this.price += item.activity.fixed_price * item.count
						    this.resultList.push(item)
						}
					})
				})
				this.shopInfo.menu.forEach(menu=>{
					menu.foods.forEach(food=>{
						if(food.count)
						{
							empty=false
							this.result += food.count
							this.price += food.activity.fixed_price * food.count
							this.resultList.push(food)
							
						}
					})
				})
				return empty
			}
		},
		methods:{
			getData()
			{
				console.log(this.shopInfo)
			},
			btnclick()
			{
				
				
			},
			settlement()
			{
				this.$store.dispatch('setOrderInfo' , {
					shopInfo:this.shopInfo.rst,
					selectFoods:this.resultList
				})
			
				this.$router.push('/settlement')
			}
				
		}
	}
</script>

<style scoped="scoped">
	.bottom-nav {
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		align-items: center;
		padding-left:20px ;
		background-color: rgba(61,61,63 , 0.9);
		height: 45px;
		z-index: 1000;
		display: flex;
		z-index: 999999;
	}
	.bottomNav-carticon i {
		position: relative;
		top: -5px;
		font-size: 20px;
		padding: 5px 10px 10px 5px;
		background-color:#009EEF;
		border-radius: 50%;
		color: #FFFFFF;
		border: 4px rgba(61,61,63 , 0.9) solid;
	}
	.bottomNav-cartInfo {
		flex: 1;
		padding-left: 20px;
	}
	.submit-btn {
		width: 100px;
		height: 100%;
		background:#42B983;
		float: right;
		border: none;
		outline: none;
		color: #FFFFFF;
		font-size: 12px;
	}
	.bottomNav-cartTotal {
		color: #FFFFFF;
	}
	.bottomNav-cartdelivery {
		margin-top: 5px;
		color: #AAAAAA;
	}
	.shop {
		color: #AAAAAA;
	}
	.active {
		background-color: rgba(61,61,63 , 0.9)!important;
		font-size: 12px;
	}
	.activee>i {
		color: #EEEEEE;
		background-color: rgba(61,61,63 , 0.9) ;
	}
	.result {
		background-color: red;
		width: 5px;
		height: 5px;
	    padding: 5px 5px;
		border-radius: 50%;
		color: #FFFFFF;
		position: relative;
		top: -45px;
		left: 25px;
	}
	.caerview-cartmask {
		position: fixed;
		bottom: 45px;
	}
	.cartview-body {
		width: 375px;
		max-height: 250px;

	}
	.cartview-header {
		position: relative;
		background-color: #F1F1F1;
		padding: 15px 3px 15px 10px; 
	}
	.cartview-header button {
		border: none;
		outline: none;
		line-height: 100%;
		position: absolute;
		right: 5px;
	}
	.entityList-cartbodyScroller {
		background-color: #FFFFFF;
	   
	}
	.entityList-cartList {
		max-height: 250px;
		overflow: auto;
	}
	.entityList-entityrow {
		display: flex;
		height: 45px;
		line-height: 45px;
		border-bottom: 1px #EEEEEE solid;
		
	}
	.entityList-entityrow>span {
		flex: 1;
		color: red;
		font-size: 13px;
		text-align: center;
		font-weight: 600;
	}
	.entityList-entityrow>h4 {
		font-size: 14px;
		padding-left: 5px;
		font-weight: 600;
		width: 130px;
		
	}
	.entityList-cartList {
		overflow: auto;
	}
	
</style>
