<template>
	<div class="pay">
		<Header :isLeft="false" title="在线支付"></Header>
		<div class="main">
			<div class="tip">
				<p class="countdown">支付剩余时间</p>
				<p class="countdown-text">{{countDown}}</p>
			</div>
			<section class="home">
				<ul class="list info-list">
					<li>
						<span class="order-name">{{oderInfo.name}}</span>
						<span class="text-price">￥{{123}}</span>
					</li>
				</ul>
				<div class="title">在线支付</div>
				<ul class="list payment-list">
					<li class="payment-list-item">
						<div class="icon">
							<img style="width: 25px; height: 25px;" src="../assets/img/微信.png" />
							<span>微信</span>
						</div>
						<i class="fa fa-check-circle selected"></i>
					</li>
				</ul>
			</section>
			
		</div>
		<button @click="pay" :disabled="timerOut" class="btn-submit">确认支付</button>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	export default {
		name:'Pay',
		data()
		{
			return {
				countDown:'00:15:00',
				timer:null,
				timerOut:false
			}
		},
		created()
		{
			this.countTimeDown()
		},
		computed:{
			oderInfo()
			{
				return this.$store.getters.order_info.shopInfo
			}
		},
		components:{
			Header
		},
		methods:{
			countTimeDown()
			{
				let minute=14;
				let second=59;
				this.timer = setInterval(()=>{
					second--
					if(minute == '00' && second == '00')
					{
						this.countDown = '支付已超时'
						this.timerOut=true
						clearInterval(this.timer)
					}
					if(second == '00')
					{
						second=59
						minute--
					}
					if(second < 10)
					{
						second = '0' + second
					}
					if(minute < 10)
					{
						minute = '0' + minute
					}
					this.countDown = '00' + ':'+ minute + ':' + second
				},1000)
			},
			pay()
			{
				const data={
					body:'前端学习',
					out_trade_no: new Date().getTime().toString(),
					total_fee:1
				}
				fetch('http://wwww.thenewstep.cn/wxzf/example/jsapi.php' , {
					method:'POST',
					headers:{
						'Content-type':'application/json'
					},
					body:JSON.stringify(data)
				}).then(res=>res.json()).then(data=>{
					this.onBridgeReady(data)
				})
			},
		     onBridgeReady(data) 
			 {
		        WeixinJSBridge.invoke(
		           'getBrandWCPayRequest', data,
		           (res)=>{
		           if(res.err_msg == "get_brand_wcpay_request:ok" ){
		                alert('支付成功')
		           } 
		        }); 
		     }
			}
		}
	
</script>

<style scoped="scoped">
	.main {
		background-color: #FFFFFF;
	}
	.tip {
		height: 100px;
		text-align: center;
		box-sizing: border-box;
		border-bottom: 1px #EEEEEE solid;
		padding: 20px 20px
	    
	}
	.tip .countdown-text {
		font-size: 26px;
	}
	.countdown {
		margin-bottom: 8px;
		font-size: 13px;
	}
    .home ul li {
		height: 55px;
		line-height: 55px;
		padding-left: 20px;
	}
	.text-price {
		position: absolute;
		right: 20px;
	}
	.order-name {
		font-size: 14px;
	}
	.text-price {
		color: red;
		font-size: 14px;
	}
	.title {
		padding-left: 20px;
		height: 45px;
		line-height: 45px;
		background-color: #EEEEEE;
		font-size: 14px;
	}
	.payment-list-item {
		display: flex;
		padding-left: 20px;
	}
	.icon img {
		position: relative;
		top: 6px;
	
	}
	.icon>span {
		margin-left: 20px;
		font-size: 16px;
	}
	.payment-list-item>i {
		flex: 1;
		text-align: right;
		line-height: 55px;
		font-size: 22px;
		padding-right: 15px;
		color:#00CC66;
	}
	.btn-submit {
		height: 45px;
		background-color: #00CC66;
		width: 90%;
		border-radius: 5px;
		text-align: center;
		line-height: 45px;
		color: #FFFFFF;
		font-size: 18px;
		position: relative;
		top: 20px;
		left: 18px;
		border: none;
		outline: none;
	}
	.btn-submit[disabled] {
		background-color:#bbb !important ;
	}
</style>
