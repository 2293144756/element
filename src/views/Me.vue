<template>
	<div class="me">
	   <div class="headInfo">
		   <div class="head-img">
			 <img src="https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png"/>
		   </div>
		   <div class="head-profile">
			   <p class="user-id" v-if="userInfo">{{userInfo._id}}</p>
			   <p v-else @click="headLogin" class="user-id">登录/注册</p>
			   <p class="user-phone">
				   <i class="fa fa-mobile"></i>
				   <span class="user_phone" v-if="userInfo">{{phone(userInfo.phone)}}</span>
				   <span v-else >登陆后享受更多特权</span>
			   </p>
		   </div>
		   <i class="fa fa-angle-right"></i>
	   </div>
	   <div class="user_info">
		   <div class="address-cell">
			   <i class="fa fa-map-marker"></i>
			   <div class="address_index" @click="myAddress">
				   <span>我的地址</span>
				   <i class="fa fa-angle-right"></i>
			   </div>
		   </div>
		   <button @click="headLogOut" class="loginOut-btn">退出登录</button>
	   </div>
	</div>
</template>

<script>
	export default {
		name:'Me',
		data()
		{
			return {
				userInfo:null,
				user_id:null
			}
		},
		created()
		{
			this.getData()
		},
		methods:{
			headLogin()
			{
				this.$router.push('/login')
			},
			getData()
			{
				const user_id = localStorage.ele_app;
				this.user_id = user_id;
		        this.$axios('api/user/user_info/'+this.user_id).then(res=>{
					this.userInfo = res.data
				})
			},
			headLogOut()
			{
				localStorage.removeItem('ele_app')
				this.$router.push('/login')
			},
			phone(phone)
			{
				return phone.replace(/(\d{3})\d{4}(\d{4})/ , '$1****$2')
			},
			myAddress()
			{
				if(this.userInfo.myAddress.length > 0)
				{
					this.$router.push('./myaddress')
				}else {
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
				}
			}
	   }	
	}
</script>

<style scoped="scoped">
    .me {
		width: 100%;
		height: 100%;
		overflow: auto;
		box-sizing: border-box;
	}
	.headInfo {
		display: flex;
		background: #009EEF;
		padding: 30px 10px;
	}
	.head-img {
		height: 60px;
		height: 60px;
		overflow: hidden;
		border-radius: 50%;
		background-size: 60px;
	}
	.head-img img {
		width: 60px;
	}
	.head-profile {
		flex: 1;
		height: 60px;
		padding-left: 20px;
		padding-top: 5px;
	}
	.user-id {
		width: 177px;
		overflow: hidden;
		font-size: 22px;
		font-weight: 600;
		color: #fff;
	}
	.user-phone {
		font-size: 14px;
		color: #fff;
	}
	.user-phone i {
		margin-top: 10px;
		font-size: 16px;
	}
	.user-phone span {
		margin-left: 3px;
	}
	.headInfo>i {
		position: relative;
		top: 20px;
	    font-size: 22px;
		color: #fff;
	}
	
	
	.address-cell {
		background-color: #fff;
		height: 35px;
		margin-top: 10px;
		padding: 10px 10px 0 20px;
		font-size: 15px;
		display: flex;
	
	}
	.address-cell>i {
		color: #009EEF;
		font-size: 18px
	}
	.address_index {
		flex: 1;
		padding-left: 15px;
		font-weight: 600;
	}
	.address_index>i {
		float: right;
		font-size: 18px;
	}
	.user_info button {
		margin-top: 20px;
		width: 100%;
		height: 50px;
		background-color: #fff;
		border: 2px #EEEEEE solid;
		color: red;
		font-weight: 600;
		font-size: 16px;
	}
</style>
