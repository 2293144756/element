<template>
	<div class="search">
		<Header title="搜索"></Header>
		<div class="search-header">
			<form class="search_warp">
				<i class="fa fa-search"></i>
				<input type="text" v-model="key_word" placeholder="请输入商家,商品信息" />
				<button  @click.prevent="searchHandle">搜索</button>
			</form>
		</div>
		<div class="shop" v-if="!shopShow">
			<div class="empty-warp" v-if="empty">
				<img src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png" alt=""/>
				<div class="empty_text">
					<h1>附近没有搜索结果</h1>
					<span>换个关键词试试吧</span>
				</div>
			</div>
			<div>
				<search-index @click="$router.push('/shop')" @click.native="shopItemClick" :goods="goods.restaurants"></search-index>
				<search-index  @click.native="shopItemClick" :goods="goods.words"></search-index>
			</div>
		</div>
		<div class="container" v-if="shopShow">
			<filter-view :filterData="filterData" :filterView="filterView" ></filter-view>
		</div>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import searchIndex from '../components/searchIndex.vue'
	import FilterView from '../components/FilterView.vue'
	import {debounce} from '../common/防抖.js'
	export default {
		name:'Search',
		data()
		{
			return {
				key_word:'',
				goods:[],
				word:[],
				empty:false,
				shopShow:false,
				filterData: {},
				filterView: {}
			}
		},
		created()
		{
			this.$axios("api/profile/filter").then(res => {
				this.filterData = res.data.navTab
				this.filterView = res.data
			})
		},
		components:{
			Header,
			searchIndex,
			FilterView
		},
		watch:{
			key_word()
			{
				this.empty = false
				this.getData()
			}
		},
		methods:{
			getData()
			{
				const self = this
				this.$axios('api/profile/typeahead/'+ self.key_word ).then(res=>{
					this.goods = res.data;
				
				}).catch(err=>{
					 Promise.reject(err)
				})
			},
			searchHandle()
			{
				if(!this.key_word) return;
				
				
				if(this.goods && this.goods.restaurants > 0 || this.goods.words.length)
				{
					console.log('有内容')
				}else {
					this.empty = true
				}
			},
			shopItemClick()
			{
				this.shopShow = true
			}
		}
	}
</script>

<style scoped="scoped">
	.search-header {
		background-color: #fff;
		padding: 15px 10px;
	}
	.search_warp {
		
	}
	.search_warp input {
		margin-left: 10px;
		border: none;
		width: 75%;
		height: 30px;
		background-color: #eee;
		outline: none;
		font-size: 14px;
	}
	.search_warp button {
		margin-left: 10px;
		outline: none;
		border: none;
		background-color: #fff;
		font-size: 14px;
	}
	.shop {
		height: 518px;
		overflow: auto;
	}
	.empty-warp {
		width: 70%;
		margin: 0 auto;
	}
	.empty_text {
		float: right;
		position: relative;
		top: 60px;
	}
	.empty_text h1 {
		
	}
	.empty-warp img {
		height: 150px;
		width: 150px;
	}
</style>
