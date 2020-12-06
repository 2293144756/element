<template>
	<div class="address">
		<Header title="我的地址"></Header>
		
		<!-- 显示收货地址 -->
		<div class="address-view">
			<div class="address_card" v-for="(item , index) in shopInfo">
				<div class="address-cart-select">
				 <i class="fa fa-check-circle"  v-if="selectIndex === index"></i>
				</div>
				<div class="address_body" @click="btnclick(item ,  index)">
					<div class="address_title">
						<span class="user_name">{{item.name}}</span>
						<span class="user_sex" v-if="item.sex">{{item.sex}}</span>
						<span class="user_phone">{{item.phone}}</span>
					</div>
					<div class="address_card_address">
						<span class="tag" v-if="item.tag">{{item.tag}}</span>
						<span class="address_text">{{item.address}}{{item.bottom}}</span>
						
					</div>
					<div class="address_card_edit">
						<i @click="headleEdit(item)" class="fa fa-edit"></i>
						<i @click="headleDelete(item ,index)" style="margin-left: 10px;" class="fa fa-close "></i>
					</div>
				</div>
			</div>
		</div>
		<div class="addressview-bottom" @click="address()">
			<i class="fa fa-plus-circle" ></i>
			<span>新增收货地址</span>
		</div>
	</div>
</template>

<script>
	import Header from '../../components/Header.vue'
	export default {
		name:'AddAddress',
		data()
		{
			return {
				shopInfo:{},
				selectIndex:0
			}
		},
		created()
		{
			this.getData()
		},
		methods:{
			getData()
			{
				this.$axios('api/user/user_info/' + localStorage.ele_app).then(res=>{
				         this.shopInfo=res.data.myAddress
						 console.log(this.shopInfo)
				})
				
			},
			address()
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
			headleEdit(item)
			{
				this.$router.push({
					name:'addaddress',
					params:{
						title:'编辑信息',
						addressInfo:item
					}
				})
			},
			headleDelete(item ,index)
			{
				let self = this
				this.$axios.delete('api/user/address/' + localStorage.ele_app + '/' + item._id ).then(res=>{
					this.shopInfo.splice(index , 1)
				})
			},
			btnclick(item , index)
			{
				this.selectIndex = index;
				this.$store.dispatch('setuserinfo' , item);
				this.$router.push('/settlement')
			
			}
		},
		components:{
			Header
		}
	}
</script>

<style scoped="scoped">
	.address {
		width: 100vw;
		height: 100vh;
	}
	.addressview-bottom {
		position: fixed;
		bottom: 0;
		height: 45px;
		width: 100%;
		background-color: #fff;
		z-index: 9999;
		text-align: center;
		line-height: 45px;
		font-size: 16px;
		color: #009EEF;
	}
	.addressview-bottom>i {
		margin-right: 10px;
	}
	.address-view {
		background-color: #fff;
		overflow-y:  auto;
	}
	.address_body {
		position: relative;
		box-sizing: border-box;
		padding-left: 25px;
		padding-top: 15px;
		padding-bottom: 40px;
		border-bottom: 1px #AAAAAA solid;
	}
	.address_body .user_name {
		font-size: 16px;
		font-weight: 600;
		
	}
	.address_body .user_phone {
		margin-left: 5px;
		font-size: 15px;
	}
	.address_card_address {
		margin-top: 6px;
	}
	.tag {
		position: relative;
		top: 8px;
		border: 2px chocolate solid;
		color: chocolate;
	}
	.address_text {
		display: inline-table;
		font-size: 14px;
		width: 265px;
		margin-left:5px;
	}
	.address_card_edit {
		position: absolute;
		right: 20px;
		top: 40px;
		font-size: 16px;
		color: #AAAAAA;
	}
	.address-cart-select {
	   position: relative;
	   top: 50px;
	}
    .fa-check-circle {
	   color: #8BDA81;
	   font-size: 20px;
   }
	
	
</style>
