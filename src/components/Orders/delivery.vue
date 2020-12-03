<template>
	<section class="checkout-section" v-if="shopInfo">
		<div class="delivery">
			<div class="delivery-left">
				<span class="delivery-time">送达时间</span>
				<div v-if="shopInfo.delivery_mode.text" class="delivery-extra">
					<span>{{shopInfo.delivery_mode.text}}</span>
				</div>
			</div>
			<div class="delivery-right">
				<span class="delivery-select">尽快送达 ({{deliveryTime(shopInfo.order_lead_time)}}送达)</span>
				<i class="fa fa-angle-right"></i>
			</div>
			<div class="cart-item">
				<div class="cart-item-title">支付方式</div>
				<div class="pay-text">在线支付</div>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name:'delivery',
		props:{
			shopInfo:Object
		},
		methods:{
			deliveryTime(time)
			{
				let date = new Date()
				date.setMinutes(date.getMinutes() + time)
				return date.getHours() + ':' + date.getMinutes()
			}
		}
	}
</script>

<style scoped="scoped">
	.checkout-section {
		margin-top: 50px;
		width: 100%;
	}
	.delivery {
		padding: 15px 15px;
		background-color: #FFFFFF;
		box-sizing: border-box;
		width:97% ;
		margin: auto;
		position: relative;
	}
	.delivery-left {
		border-bottom: 1px #EEEEEE solid;
		padding-bottom: 15px;
	}
	.delivery-left .delivery-time {
		font-size: 16px;
		font-weight: 600;
	}
	.delivery-extra {
		margin-top: 5px;
	}
	.delivery-extra span {
		background-color: #3190E8;
		color: #FFFFFF;
		font-size: 13px;
		padding: 0px 3px;
	}
	.delivery-right {
		position: absolute;
		right: 20px;
		top: 30px;
	}
	.delivery-select {
		color: #009EEF;
		font-size: 15px;
		font-weight: 550;
	}
	.delivery-right>i {
		font-size: 18px;
		margin-left: 3px;
	}
	.cart-item {
		margin-top: 15px;
	}
	.cart-item-title {
		font-size: 15px;
		font-weight: 600;
	}
	.pay-text {
		float: right;
		position: relative;
		top: -15px;
		color: #009EEF;
		font-size: 15px;
		font-weight: 550;
		padding-right: 7px;
	}
</style>
