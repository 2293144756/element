<template>
	<div class="alphabet" v-if="info" ref="scroll">
		<div class="scroll_warp">
			<!--热门城市 -->
			<div class="hot_warp cityList">
				<div class="title">热门城市</div>
				<ul class="hot_city">
					<li v-for="(item,index) in info.hotCities" @click="$emit('selectCity', item)" :key="index">{{item.name}}</li>
				</ul>
			</div>
			<!--所有城市 -->
			<div class="city_warp ">
				<div class="city-content cityList" v-for="(item,index) in keys" :key="index">
					<div class="title">{{item}}</div>
					<ul>
						<li v-for="(item,index) in info[item]" @click="$emit('selectCity' , item)" :key="index">{{item.name}}</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="area_keys">
			<ul>
				<li @click="selectKey(0)">#</li>
				<li @click="selectKey(index+1)" v-for="(item,index) in keys" :key="index">{{item}}</li>
			</ul>
		</div>
	</div>
	
</template>

<script>
	import Bscroll from 'better-scroll'
	export default {
		name:'Alphabet',
		data()
		{
			return {
				scroll:null
			}
		},
		props:{
			info:Object,
			keys:Array
		},
		methods: {
			initScroll()
			{
				this.scroll = new Bscroll(this.$refs.scroll , {
					click:true
				})
			},
			selectKey(index)
			{
				 const cityList =  this.$refs.scroll.getElementsByClassName('cityList')
				 let el = cityList[index]
				 this.scroll.scrollToElement(el , 250)
			}
		}
	}
</script>

<style scoped="scoped">
    .alphabet {
		width: 100%;
		height: 100%;
		overflow: auto;
		margin-top: 15px;
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding-top: 20px;
		
	}
	.hot_warp .title {
		font-size: 18px;
		color: #AAAAAA;
	}
	.hot_city {
		margin-top: 15px;
		margin-left: 20px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: space-between;
		width: 215px;
		height: 245px;
		
	}
	.hot_city li {
		
		width: 100px;
		height: 50px;
		background: #EEEEEE;
		text-align: center;
		line-height: 50px;
	}
	.city_warp {
		margin-top: 20px;
	}
	.city-content .title {
		font-size: 16px;
		color: #AAAAAA;
		padding-left: 10px;
	}
	.city-content ul li {
		margin-bottom: 5px;
		margin-top: 10px;
		height: 45px;
		line-height: 45px;
		box-sizing: border-box;
		padding-left: 10px;
		border-bottom: 2px #EEEEEE solid;
		
	}
	.area_keys {
	
		position: fixed;
		right: 4px;
		bottom: 60px;
		font-size: 14px;
		color: #AAAAAA;
	}
	.area_keys ul li {
		margin-top: 5px;
		text-align: center;
	}
	
</style>
