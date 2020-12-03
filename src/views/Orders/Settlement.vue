<template>
	<div class="setelement">
		<Header :isLeft="true" title="确认订单"></Header>
		<div class="view-body">
			<div>
				<!-- 收货地址-->
				<section class="cart-address">
					<p class="title">订单配送至
					<span v-if="userInfo && userInfo.tag">{{userInfo.tag}}</span>
					</p>
					<p class="address-detail">
						<span class="address" v-if="userInfo">{{userInfo.address}}{{userInfo.bottom}}</span>
					<span v-else>
						<span v-if="haveAddress" @click="$router.push('/myaddress')">选择收货地址</span>
						 <span v-else @click="addAddress">新增收货地址</span>
					</span>
					 <i class="fa fa-angle-right"></i>
					</p>
					<h4 v-if="userInfo" class="address-name">
						<span>{{userInfo.name}}</span>
						<span>(先生)</span>
						<span class="phone">{{userInfo.phone}}</span>
					</h4>
				</section>
			    <delivery  :shopInfo="oderInfo"></delivery>
			    
				<cart-ground :orderInfo="$store.getters.order_info"></cart-ground>
				
				<section class="cart-item">
					<cart-item @click.native="isShow=true" title="餐具份数" :subHead=" '未选择'"></cart-item>
					<cart-item @click.native="$router.push('/taste')" title="订餐备注" :subHead=" '口味 偏好'"></cart-item>
					<cart-item title="发票信息" subHead="不需要开发票"></cart-item>
				</section>
				<tableware :isShow="isShow" @close="isShow=false"></tableware>
			</div>
		</div>
		<footer class="footer-bar">
			<span>￥128</span>
			<button @click="headlebtn">去支付</button>
		</footer>
	</div>
</template>

<script>
	import Tableware from '../../components/Orders/Tableware.vue'
	import cartItem from '../../components/Orders/cartItem.vue'
	import cartGround from '../../components/Orders/cartGround.vue'
	import delivery from '../../components/Orders/delivery.vue'
	import Header from '../../components/Header.vue'
	import {Toast} from 'mint-ui'
	export default {
		name:'Settlement',
		data()
		{
			return {
				haveAddress:false,
				isShow:false
			}
		},
		components:{
	         Header,
			 delivery,
			 cartGround,
			 cartItem,
			 Tableware
		},
		created()
		{
			this.getData()
		},
		computed:{
			userInfo()
			{
				return this.$store.getters.user_info
			},
			oderInfo()
			{
				return this.$store.getters.order_info.shopInfo
			},
			copies()
			{
				return this.$store.getters.codeInfo.code
			},
			selectItem()
			{
				return this.$store.getters.codeInfo.selectItem
			},
			
		},
		methods:{
			addAddress()
			{
				this.$router.push({
					name:'addaddress',
					params:{
						title:'添加地址',
						addressInfo:{
							name:'',
							sex:'',
							phone:'',
							address:'',
							bottom:'',
							tag:''
						}
					}
				})
			},
			getData()
			{
				this.$axios('api/user/user_info/' + localStorage.ele_app).then(res=>{
					if(res.data.myAddress.length > 0)
					{
						this.haveAddress = true
					}else {
						this.haveAddress = false
					}
				})
			},
			headlebtn()
			{
				if(!this.userInfo)
				{
					Toast({
						message:'请选择收货地址',
						position:'bottom',
						duration:2000
					})
				}else {
					this.$router.push('/pay')
				}
				
			}
		}
	}
</script>

<style scoped="scoped">
	.setelement {
		width: 100%;
		height: 100%;
	}
	.view-body {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow: auto;
		background-image: linear-gradient(
		0deg,
		#f5f5f5,
		#f5f5f5 65%,
		hsla(0, 0%, 96%, 0.3) 75%,
		hsla(0,0%, 96% , 0)
		),
		linear-gradient(270deg , #009eef , #009eef);
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		overflow: auto;
	}
	.cart-address {
		padding: 10px 0 0 10px;
	}
	.cart-address .title {
		color: #EEEEEE;
		font-size: 14px;
	}
	
	.address-detail {
		margin-top: 10px;
		font-size: 20px;
		color: #FFFFFF;
		font-weight: 600;
	}
	.address-detail>i {
		margin-left: 5px;
	}
	.address {
		display: inline-block;
		width: 340px;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space:nowrap;
	}
	.address-name {
		margin-top: 7px;
		color: #fff;
		font-size: 14px;
	}
	.title>span {
		border: 1px #f1f1f1 solid;
	}
	.cart-item {
		position: relative;
		top: 20px;
		background-color: #FFFFFF;
		padding: 15px 5px;
		background-color: #FFFFFF;
		box-sizing: border-box;
		width:97% ;
		margin: auto;
	}
	.footer-bar {
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 45px;
		background-color: rgba(91,91,93, 1);
	}
	.footer-bar button {
		float: right;
		height: 45px;
		width: 100px;
		background-color: #00CC66;
		color: #FFFFFF;
		outline: none;
		border: none;
	}
	.footer-bar span {
		font-size: 16px;
		line-height: 45px;
		color: #FFFFFF;
		padding-left: 5px;
	}
</style>
