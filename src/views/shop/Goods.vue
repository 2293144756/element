<template>
	<div v-if="shopInfo" class="goods">
		<div class="recommend" v-for="(recommend,index) in shopInfo.recommend" :key="index">
			<p class="recommend-name">{{recommend.name}}</p>
			<div class="recommend_wrap">
				<ul>
					<li v-for="(item , index) in recommend.items" :key="index">
						<img :src="item.image_path"/>
						<div class="recommend-food">
							<p class="recommend-food-name">{{item.name}}</p>
							<p class="recommend-food-zm">月售{{item.month_sales}}
							好评率{{item.satisfy_rate}} </p>
						</div>
						<div class="recommend-food-price">
							<p>￥{{item.activity.fixed_price}}</p>
							<cart-controll class="price" :food="item"></cart-controll>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="menuview">
			<div class="menu_warp" ref="menuScroll">
				<ul>
					<li :class="{'current':currentHeight === index}" @click="btnClick(index)" v-for="(item,index) in shopInfo.menu" :key="index">
						<img v-if="item.icon_url" :src="item.icon_url"/>
						<span>{{item.name}}</span>
					</li>
				</ul>
			</div>
			
			<div class="menu-warpper" ref="foodScroll">
				<ul>
					<li class="food-list-hook"  v-for="(item,index) in shopInfo.menu" :key="index">
						<div class="category-title">
							<strong>{{item.name}}</strong>
							<span>{{item.description}}</span>
						</div>
						<div class="food-details" v-for="(food,i) in item.foods" :key="i">
							<!-- 左-->
							<img :src="food.image_path"/>
							<section class="food-details-info">
								<div  @click="foodclick(food)">
									<h4>{{food.name}}</h4>
									<p class="food-details-des">{{food.description}}</p>
									<p class="food-details-sales">月售{{food.month_sales}}份 好评率{{food.satisfy_rate}}</p>
									<div class="food-details-price">
										<span class="price_">￥{{food.activity.fixed_price}}</span>
									</div>
								</div>
						        <cart-controll :food="food" class="btn"></cart-controll>
							</section>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<ShopCart :shopInfo="shopInfo"></ShopCart>
		<food :food="selectedFood" :isShow="isShow" @btnclick="isShow=!isShow"></food>
	</div>
</template>

<script>
	import cartControll from '../../components/shops/cartControll.vue'
	import Bscroll from 'better-scroll'
	import ShopCart from './ShopCart.vue'
	import Food from './Food.vue'
	export default {
		name:'Goods',
		data()
		{
			return {
				shopInfo:null,
				menuScrol:{},
				foodScroll:{},
				scrollY:0,
				listHeight:[],
				selectedFood:null,
				isShow:false
			}
		},
		created()
		{
			this.getData()
		},
		components:{
			cartControll,
			ShopCart,
	        Food
		},
		computed:{
			currentHeight()
			{
				for(let i=0; i<this.listHeight.length; i++)
				{
					let height1 = this.listHeight[i]
					let height2 = this.listHeight[i+1]
					if(this.scrollY > height1 && this.scrollY < height2)
					{
						return i
					}
				}
				return 0
			}
		},
		methods:{
			getData()
			{
				this.$axios('api/profile/batch_shop').then(res=>{
					res.data.recommend.forEach(recomment=>{
						recomment.items.forEach(item=>{
							item.count = 0
						})
					})
					res.data.menu.forEach(menu=>{
					       menu.foods.forEach(item=>{
							   item.count = 0
						   })
					})
					this.shopInfo = res.data
				    this.$nextTick(()=>{
						this.initScroll()
						this.calculateHeight()
					})
				})
			},
			initScroll()
			{
			  this.menuScrol = new Bscroll(this.$refs.menuScroll , {
				    	click:true
				    })
				
			 this.foodScroll = new Bscroll(this.$refs.foodScroll , {
				
					click:true
				})
			this.foodScroll.on('scroll', (postion)=>{
				this.scrollY = Math.abs(Math.round(postion.y))
			})
			},
			btnClick(index)
			{
			    let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook')
				let el = foodlist[index+1]
			    
				this.foodScroll.scrollToElement(el , 250)
			},
			calculateHeight()
			{
				 let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook')
				 let height=0;
				 this.listHeight.push(height)
				 for(let i=0; i< foodlist.length - 1 ; i++)
				 {
					 let item = foodlist[i]
					 height += item.clientHeight
					 
					 this.listHeight.push(height)
				 }
				 
			},
			foodclick(food)
			{
				this.isShow=true
			   this.selectedFood = food
			},
			btnclick()
			{
				this.isShow=false
			}
		}
		
	}
</script>

<style scoped="scoped">
	.goods {
	    width: 100%;
		background-color: #fff;
		border-top: 2px #EEEEEE solid;
		z-index: 999999;
	}
	.recommend {
		padding-bottom: 10px;
	}
	.recommend-name {
		margin: 10px 0 10px 10px;
	}
	.recommend ul {
	  display: flex;
	}
	.recommend ul li {
		flex: 1;
		margin-left: 15px;
	}
	.recommend-food-zm {
		color: #999;
		font-size: 9px;
		margin-top: 3px;
	}
	.recommend_wrap {
		width: 100%;
		overflow-x: auto;
		overflow-y: hidden
	}
	.recommend_wrap ul li img {
		width: 120px;
		height: 120px;
	}
	 .recommend-food-name {
		font-size: 8px;
		width: 120px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.recommend-food-price {
		position: relative;
		color: red;
		font-size: 14px;
		margin-top: 10px;
		padding-bottom: 3px;
	}
	
	.recommend-food-price .price {
		position: absolute;
		top: 0;
		right: 0;
		
	}
	.menuview {
		display: flex;
		width: 100%;
	    height: 667px;
		overflow: auto;
	}
	.menu_warp {
	   background-color: #f8f8f8;
	   height: calc(100% - 45px);
	   overflow-y: hidden;
	}
	.menu_warp ul li {
		width: 70px;
		height: 60px;
		font-size: 10px;
		padding-left: 4px;
		padding-right: 10px;
		background-color: #EEEEEE;
		display: flex;
		align-items: center;
		
	}
	
	.menu_warp ul li img {
		width: 15px;
		height: 15px;
		margin-left: 3px;
		position: relative;
		
	}
	.menu-warpper {
		flex: 1;
		height: calc(100% - 45px);
		overflow-y: auto;
	}
	.menu-warpper img {
		width: 100px;
		height: 100px;
	}
	
	
	.food-details {
		display: flex;
		padding-left: 10px;
		margin-top: 15px;
	}
	.food-details-info {
		position: relative;
	}
	.btn {
		position: absolute;
		bottom: 28px;
		right: 10px;
	}
 	.food-details-info h4 {
		font-weight: bold;
		font-size: 15px;
		width: 140px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.food-details-des {
		width: 175px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 12px;
		margin-top: 3px;
		
	}
	.food-details-sales {
		font-size: 12px;
		margin-top: 3px;
	}
	.food-details-price {
		margin-top: 10px;
		color: red;
		font-size: 16px;
		font-weight: 500;
	}
	.category-title {
		padding-left: 10px;
		padding-top: 10px;
		font-size: 10px;
	    
	}
	.category-title span {
		margin-left: 10px;
		color: #AAAAAA;
	}
	
	.current {
		background-color: #fff !important;
		color: #333 !important;
	}
</style>
