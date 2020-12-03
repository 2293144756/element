<template>
	<div class="Components" v-if="shopinfo">
		<div class="shopinfo">
			<div class="shopinfo_image">
				<img :src="shopinfo.brand_intros[0].image_hash"/>
			</div>
			<div class="shopinfo-title">
				<span>{{shopinfo.title}}</span>
				<p>{{shopinfo.brand_intros[0].brief}}</p>
			</div>
			<div class="banrd">查看品牌故事</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'Components',
		data()
		{
			return {
				shopinfo:null
			}
		},
		created()
		{
			this.getData()
		},
		methods:{
			getData()
			{
				this.$axios('api/profile/seller').then(res=>{
					this.shopinfo = res.data
					console.log(this.shopinfo)
				})
			}
		}
	}
</script>

<style scoped="scoped" >
	.Components {
		background-color: #FFFFFF;
		padding: 10px 10px;
	}
	.shopinfo_image {
		width: 100%;
	}
	.shopinfo_image  img {
		width: 100%;
		height: 200px;
	}
	.shopinfo-title {
		margin-top: 20px;
		
	}
	.shopinfo-title>span {
		font-size: 14px;
		font-weight: 600;
	}
	.shopinfo-title > p {
		font-size: 10px;
		margin-top: 5px;
		height: 24px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.banrd {
		margin-top: 20px;
		width: 100%;
		text-align:center;
	}
</style>
