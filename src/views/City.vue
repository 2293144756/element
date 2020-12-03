<template>
	<div class="city" >
	  <div class="search_warp">
		  <div class="search">
			  <i class="fa fa-search"></i>
			  <input type="text" v-model="city_val" placeholder="输入城市名" />
		  </div>
		  <button @click="$router.go(-1)">取消</button>
	  </div>
	  <div class="query"  v-if="searchList.length == 0">
		  <div class="location">
		  	 <Location :address="city"></Location>
		  </div>
		  <Alphabet :info="cityInfo" ref="Bscroll" :keys="keys" @selectCity="selectCity" ></Alphabet>
	  </div>
	   <div class="search-list" v-else>
		   <ul>
			   <li v-for="(item,index) in searchList" :key="index">{{item.name}}</li>
		   </ul>
	   </div>
	</div>
</template>

<script>
	import Location from '../components/Location.vue'
	import Alphabet from '../components/Alphabet.vue'
	export default {
		name:'City',
		data()
		{
			return {
				city_val:'',
				cityInfo:null,
				keys:[],
				allCities:[],
				searchList:[]
			}
		},
		created()
		{
			this.getCityInfo()
		},
		watch:{
			city_val()
			{
				this.searchCity()
			}
		},
		methods:{
			getCityInfo()
			{
				this.$axios('api/posts/cities').then(res=>{
					this.cityInfo = res.data
		             console.log(this.cityInfo)
					this.keys = Object.keys(res.data)
					this.keys.pop()
					this.keys.sort()
					
					this.$nextTick(()=>{
					    this.$refs.Bscroll.initScroll()
					})
					this.keys.forEach(key=>{
						this.cityInfo[key].forEach(city=>{
							this.allCities.push(city)
						})
					})
				})
			},
			selectCity(item)
			{
				this.$router.push({name:'address', params:{city:item.name}})
			}
			,
			searchCity()
			{
				if(!this.city_val)
				{
					this.searchList=[]
				}else {
					   this.searchList =  this.allCities.filter(item=>{
						return item.name.indexOf(this.city_val) !== -1
					})
				}
				console.log(this.searchList)
			}
		},
		computed:{
			city()
			{
				return this.$store.getters.location.addressComponent.city || 
				this.$store.getters.location.addressComponent.province
			}
		},
		components:{
			Location,
			Alphabet
		}
	}
</script>

<style scoped="scoped">
	.city {
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	.search_warp {
		padding: 0 10px;
		height: 45px;
		display: flex;
		align-items: center;
		background: #FFFFFF;
	}
	.search {
		flex: 1;
		height: 40px;
		background: #EEEEEE;
		border-radius: 8px;
		line-height: 40px;
	}
	.search input {
		outline: none;
		border: transparent;
		background: #EEEEEE;
		font-size: 14px;
	}
	.search_warp button {
		border: transparent;
		outline: none;
		background-color: #FFFFFF;
		color: #42B983;
		font-size: 14px;
	}
	.location {
		background-color: #FFFFFF;
		box-sizing: border-box;
		height: 65px;
		padding-left: 6px;
		padding-top: 6px;
		
	}
	.search-list {
		width: 375px;
	}
	.search-list ul li {
		width: 375px;
		height: 100vw;
		background-color:#FFFFFF;
		padding-left: 20px;
		height: 45px;
		line-height: 45px;
		border-bottom: 2px #EEEEEE solid;
		box-sizing: border-box;
	}
	.query {
		overflow: auto;
		height: calc(100% - 45px);
	}
</style>
