<template>
	<div class="address">
		<Header :title="title"></Header>
		<div class="viewbody" v-if="!showSearch">
			<div class="content">
				<form-block v-model="addressInfo.name" label="联系人" placeholder="姓名" :tags="sex" ></form-block>
				<form-block v-model="addressInfo.phone" label="电话" placeholder="手机号码"></form-block>
				<form-block v-model="addressInfo.address" @click.native="showSearch=true" label="地址" placeholder="小区/写字楼/学校等" icon="angle-right"></form-block>
				<form-block v-model="addressInfo.bottom" label="门牌号" placeholder="十号楼五单元404" icon="edit" textarea="textarea"></form-block>
				<div class="formblock" >
					<div class="label-warp">标签</div>
					<tab-tag :tags="tags" :selectTag="addressInfo.tag" @btnclick="btnclick"></tab-tag>
				</div>
			</div>
		</div>
		<div class="form-bottom-warp">
			<button @click="headleSave" class="form-bottom">确定</button>
		</div>
		<address-search  :showSearch="showSearch" @close="showSearch=false" :addressInfo="addressInfo" ></address-search>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	import Header from '../../components/Header.vue'
    import FormBlock from '../../components/Orders/FormBlock.vue'
	import TabTag from '../../components/Orders/TabTag.vue'
	import AddressSearch from '../../components/Orders/AddressSearch.vue'
	export default {
		
		name:'AddAddress',
		data()
		{
			return {
				tags:['家','学校','公司'],
				sex:['先生','女士'],
				title:'',
				addressInfo:{
					
				},
				showSearch:false
			}
		},
		created()
		{
			this.getData()
		},
		components:{
			Header,
			FormBlock,
			TabTag,
			AddressSearch
		},
		methods:{
			btnclick(item)
			{
				this.addressInfo.tag = item
			},
			headleSave()
			{
			      if(!this.addressInfo.name)
				  {
					  this.showMsg('请输入联系人')
					  return;
				  }
				  if(!this.addressInfo.phone)
				  {
					  this.showMsg('请输入手机号码')
					  return;
				  }
				  if(!this.addressInfo.bottom)
				  {
					  this.showMsg('请输入地址信息')
					  return
				  }
				  if(this.title == '添加地址')
				  {
					    this.addAddress()
				  }else {
					 this.editAddress()
				  }
				
			},
			showMsg(msg)
			{
				Toast({
					message:msg,
					position:"bottom",
					duration:2000
				})
			},
			addAddress()
			{
				this.$axios.post('api/user/add_address/' + localStorage.ele_app , this.addressInfo).then(res=>{
					
				})
			},
			getData()
			{
			   this.title = this.$route.params.title
			   this.addressInfo = this.$route.params.addressInfo
			},
			editAddress()
			{
				this.$axios.post('api/user/edit_address/'+ localStorage.ele_app + '/' +this.addressInfo._id , this.addressInfo).then(res=>{
					this.$router.push('/myaddress')
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.address {
		width: 100vw;
		height: 100vh;
		z-index: 9999;
	}
	.content {
		background-color: #fff;
		padding-left: 10px;
	}
	.formblock {
		background-color: #fff;
		display: flex;
		height: 45px;
		line-height: 45px;
	}
	.label-warp {
		font-size: 15px;
		font-weight: 600;
	}
	.form-bottom-warp {
		margin-top: 40px;
	}
	.form-bottom {
		width: 100%;
		height: 45px;
		background-color: #8BDA81;
		outline: none;
		border: 1px #EEEEEE solid;
	}
</style>
