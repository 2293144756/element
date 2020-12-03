<template>
      <div class="index-container" @click="$router.push('/shop')">
		  <div class="shopInfo">
			  <div class="log_container">
				  <img :src="restaurants.image_path" />
			  </div>
			  
			  <div class="index_main">
				  <div class="shopname">
					  <i v-if="restaurants.is_premium">品牌</i>
					  <span>{{restaurants.name}}</span>
				  </div>
				  <div class="index-rateWarp">
					  <div>
						 <Rating :rating="restaurants.rating"></Rating>
						  <span>{{restaurants.rating}}</span>
						  <span  class="peisong">月售{{restaurants.recent_order_num}}单</span>
					  </div>
					  <div v-if="restaurants.delivery_mode" class="delivery">
						  <span class="icon-hollow">{{restaurants.delivery_mode.text}}</span>
					  </div>
				  </div>
				  <div class="index-moenyLimit">
					  <div>
						  <span>￥{{restaurants.float_minimum_order_amount}}起送</span>
						  <span > | </span>
						  <span>配送费￥{{restaurants.float_delivery_fee}}</span>
					  </div>
					  <div class="index-distanceWarp">
						  <span>{{(restaurants.distance / 1000).toFixed(2)}}km</span>
						  <span> | </span>
						  <span>{{restaurants.order_lead_time}}分钟</span>
					  </div>
				  </div>
			  </div>
		  </div>
	  </div>
</template>

<script>
	import Rating from '../components/Rating.vue'
	export default {
		name:'indexShop',
		props: {
			restaurants:Object
		},
		components:{
			Rating
		}
	}
</script>

<style scoped="scoped">
	.index-container {
		background-color: #fff;
	}
	.shopInfo  {
		display: flex;
		padding: 10px 10px;
		border-top: 1px #AAAAAA solid;
		
	}
	.index_main {
		padding-left: 10px;
		width: 100%;
		
	}
	.log_container img {
		width: 70px;
		height: 70px;
		border: 1px #EEEEEE solid;
	}
	.shopname {
		font-weight: 600;
		font-size: 14px;
	}
	.shopname i {
	
		background-color: darkorange;
	}
	.shopname span {
		margin-left: 7px;
		width: 100%;
	
	
	}
	.index-rateWarp {
		margin-top: 6px;
		font-size: 10px;
	}
	.index-rateWarp .peisong {
		margin-left: 10px;
	}
	
	.delivery {
		float: right;
		position: relative;
		bottom: 25px;
		color: #F1F1F1;
		background-color: dodgerblue;
		padding: 3px 3px;
	}
	.index-moenyLimit {
		position: relative;
		right: 3px;
		margin-top: 7px;
		font-size: 10px;
	}
	
	
	.index-distanceWarp {
		float: right;
		position: relative;
		bottom: 13px;
		font-size: 10px;
	}
	
</style>
