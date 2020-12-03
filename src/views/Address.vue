<template>
	<div class="address">
		<Header title="选择收货地址" :isLeft="true"></Header>
		<div class="city_search">
			<div class="search">
				<span class="city" @click="$router.push('/city')">
					{{province}}
					<i class="fa fa-angle-down"></i>
				</span>
				<span class="about">
					<i class="fa fa-search"></i>
					<input type="text" v-model="search_val" placeholder="小区/写字楼/学校等" autofocus="autofocus" />
				</span>
				
			</div>
			<Location :address="address"></Location>
		</div>
		<div class="area" >
			<ul class="area_list" v-for="(item , index) in areaList" :key="index">
				<li @click="selectAddress(item)">
					<h1>{{item.name}}</h1>
					<p>{{item.district}} <span v-if="item,address">{{item.address}}</span></p>
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import Location from '../components/Location.vue'
	export default {
		name:'Address',
		data()
		{
			return {
				city:'',
				search_val:'',
				areaList:null
			}
		},
		created()
		{
		   
		},
		components:{
		  Header,
		  Location
		},
		watch:{
			search_val()
			{
				this.searchPlace()
			}
		},
		methods:{
			searchPlace()
			{
				const self = this
				AMap.plugin('AMap.Autocomplete', function(){
				  // 实例化Autocomplete
				  var autoOptions = {
				    //city 限定城市，默认全国
				    city: self.city
				  }
				  var autoComplete= new AMap.Autocomplete(autoOptions);
				  autoComplete.search(self.search_val, function(status, result) {
				    // 搜索成功时，result即是对应的匹配数据
					console.log(result)
					self.areaList = result.tips
				  })
				})
			},
			selectAddress(item)
			{
				this.$store.dispatch('setaddress', item.district + item.address + item.name)
				this.$router.push('/home')
			},
		
		},
		computed:{
			province()
			{
				return this.city = this.$route.params.city
			},
			address()
			{
				return this.$store.getters.location.formattedAddress
			}
		}
	}
</script>

<style scoped>
	.addres {
		width: 100%;
		height: 100%;
	
		box-sizing: border-box;
		padding-top: 45px;
	
	}
	
	.city_search {
		
		padding: 10px 20px;
		background:#FFFFFF
	}
	.search {
		height: 40px;
		border-radius: 10px;
		background-color: #EEEEEE;
		box-sizing: border-box;
		line-height: 40px;
	}
	.search input {
		border: transparent;
		font-size: 14px;
		background: #EEEEEE;
		outline: none;
	}
	.about {
		margin-left: 20px;
	}
	.area {
		margin-top: 16px;
		background: #fff;
      
	}
	.area li {
		border-bottom: 1px solid #eee;
		padding: 8px 16px;
		color: #aaa;
	}
	.area h4 p {
		font-weight: bold;
		color: black;
		margin-bottom: 5px;
	}
	.search .city {
		margin-left: 5px;
	}
	
</style>
