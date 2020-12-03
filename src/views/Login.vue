<template>
	<div class="login">
		<div class="logo">
			<img src="../assets/img/logo.jpg" alt="ele"/>
		</div>
		<!--手机号 -->
		<input-group class="tel" type="number" placeholder="手机号"
		v-model="phone"
		:btnTitle="btnTitle"
		:error="error.phone"
		:disabled="disabled"
		@btnClick="getVerifCode"
		></input-group>
		 <!--验证码 -->
		<input-group class="code" type="number" placeholder="验证码"
		v-model="verifyCode"
		:error="error.code"
		></input-group>
		   <!--用户协议 -->
		   <div class="login_des">
			   <p> 新用户登录即自动注册,表示已同意  <span><用户服务协议></span></p>
		   </div>
		   <!--登录按钮 -->
		   <div class="login_btn" >
			   <button   @click="headLogin">登录</button>
		   </div>
	</div>
</template>

<script>
	import inputGroup from '../components/imputGroup.vue'
	export default {
		name:'Login',
		data() {
			return {
				phone:'',
				verifyCode:'',
				error:{
					
				},
				btnTitle:'获取验证码',
				disabled:false
			}
		},
		methods:{
			headLogin()
			{
			    this.error={}
				this.$axios.post('api/posts/sms_back' , {
					phone:this.phone,
					code:this.verifyCode
				}).then(res=>{
				
					localStorage.setItem("ele_app" , res.data.user._id)
					this.$router.push('/home')
				}).catch(err=>{
					this.error={
						code:err.response.data.msg
					}
				})
				
			},
			getVerifCode()
			{
			
				//发送请求
				if(this.validatePhone())
				{
					this.$axios.post('/api/posts/sms_send' , {
						 tpl_id: "136729",
						 key: "795be723dd9e88c3ea98e2b6713ab795",
						 phone: this.phone
					}).then(res=>{
					     console.log(res)
						this.validateCode()
					})
					
				}
				
			},
			//验证手机号码
			validatePhone()
			{
				if(!this.phone)
				{
					this.error={
						phone:'手机号码不能为空'
					}
					return false
				}else if(!/^1[345678]\d{9}$/.test(this.phone))
				{
					this.error={
						phone:'请填写正确的手机号码'
					}
					return false
				}else {
					this.error={
						
					}
					return true
				}
			},
			validateCode()
			{
				let time = 60;
				let timer = setInterval(()=>{
					if(time==0)
					{
						clearInterval(timer)
						this.btnTitle="获取验证码";
						this.disabled=false
					}else {
						this.btnTitle= time + ' '+"秒后重试"
						this.disabled=true
						time--
					}
				},1000)
			}
		},
		computed: {
			isClick()
			{
				if(this.phone && this.verifyCode)
				{
					return true
				}else {
					false
				}
			}
		},
		components: {
			inputGroup
		}
	}
</script>

<style>
	.login {
		width: 100%;
		height: 100%;
		padding: 30px;
		box-sizing: border-box;
		background: #FFFFFF;
		text-align: center;
	}
	.logo img {
		width: 180px;
		height: 70px;
	    background-color: #EEEEEE;
	}
	.tel {
		margin-top: 25px;
	}
	.code {
		margin-top: 25px;
	}
	.login_des {
		margin-top: 25px;
		font-size: 14px;
	}
	.login_des>p {
	
	}
	.login_des span {
		color: blue;
	}
	
	.login_btn {
		margin-top: 25px;
	}
	.login_btn button {
		width: 100%;
		height: 35px;
		font-size: 14px;
		background-color: #8bda81;
		color: #EEEEEE;
		outline: none;
		border-color: #8bda81;
	}
	.login_btn button[disabled] {
		background: forestgreen;
	}
</style>
