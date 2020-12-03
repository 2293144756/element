<template>
	<div class="address-search" v-if="showSearch">
		<div class="searchview">
			<div class="search-input">
			  <div class="search-input-groud">
				  <i class="fa fa-search"></i>
				  <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="address_search" />
			  </div>
			  <span @click="$emit('close')">取消</span>
			</div>
		</div>
		<div class="search_list">
			<ul>
				<li @click="btnclick(item)" v-for="(item , index) in dataList" :key="index">
					<h2>{{item.name}}</h2>
					<p>{{item.district}}{{item.address}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name:'AddressSearch',
		data()
		{
			return {
				address_search:'',
				dataList:[]
			}
		},
		props:{
			showSearch:Boolean,
			addressInfo:Object
		},
		watch:{
			address_search()
			{
				this.searchPlace()
			}
		},
		computed:{
			city()
			{
				return this.$store.getters.location.addressComponent.city || this.$store.getters.location.addressComponent.province
			}
		},
		methods:{
			searchPlace()
			{
				AMap.plugin('AMap.Autocomplete', ()=>{
				  // 实例化Autocomplete
				  var autoOptions = {
				    //city 限定城市，默认全国
				    city: this.city
				  }
				  var autoComplete= new AMap.Autocomplete(autoOptions);
				  autoComplete.search(this.address_search, (status, result)=> {
				    // 搜索成功时，result即是对应的匹配数据
					 this.dataList = result.tips
				  })
				})
			},
			btnclick(item)
			{
				this.addressInfo.address = item.name + item.district + item.address
				this.$emit('close')
			}
		}
	}
</script>

<style scoped="scoped">
	.address-search {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
	.search-input {
		display: flex;
		padding-left: 15px;
		padding-top: 10px;
	}
	.search-input-groud {
		background-color: #EEEEEE;
	}
	.search-input-groud input {
		border: none;
		outline: none;
		background-color: #EEEEEE;
		height: 30px;
		width: 270px;
		font-size: 14px;
		margin-left: 10px;
	}
	.search-input-groud>i {
		font-size: 14px;
	}
	.search-input span {
		display: inline-block;
		margin-left: 10px;
		height:25px;
		width: 45px;
		background-color: #AAAAAA;
		position: relative;
		top: 2px;
		text-align: center;
		line-height: 25px;
		font-size: 14px;
	}
	.search_list {
		overflow: auto;
	}
	.search_list ul li {
		height: 40px;
		padding-left: 10px;
		padding-top: 10px;
		border-bottom: 1px #EEEEEE solid;
	}
	ul li h2 {
		font-size: 14px;
		font-weight: 600;
	}
	ul li p {
		font-size: 14px;
		color: #AAAAAA;
		margin-top: 2px;
	}
</style>
