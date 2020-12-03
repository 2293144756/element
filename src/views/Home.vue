<template>
		<div class="home">
			<div class="header">
				<div class="address_map" @click="$router.push({name:'address',params:{city:city}})">
					<i class="fa fa-map-marker"></i>
					<span>{{this.$store.getters.address}}</span>
					<i class="fa fa-sort-desc"></i>
				</div>
			</div>
			<div class="search_warp" :class="{'fixedView':showFilter}">
				<div class="shop_search" @click="$router.push('/search')">
					<i class="fa fa-search"></i>
					搜索商家，商家名称
				</div>
			</div>
			<div id="container">
				<!-- 轮播-->
				<mt-swipe class="swipe" :auto="4000">
					<mt-swipe-item v-for="(item,index) in swiperImgs" :key="index">
						<img :src="item" />
					</mt-swipe-item>
				</mt-swipe>
				<!--分类-->
				<mt-swipe class="entries" :auto="0" cancelable=false>
					<mt-swipe-item class="entries-item" v-for="(entries , i) in entries" :key="i">
						<div class="foodentry" v-for="(item,index) in entries" :key="index">
							<div class="img_warp">
								<img :src="item.image" />
							</div>
							<span>{{item.name}}</span>
						</div>
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="shopList-title">推荐商家</div>
			<filter-view :filterData="filterData" :filterView="filterView" @searchFixed="showFilterView" @showView="showView"
			 @updata="updata"></filter-view>

			<mt-loadmore class="loadmore" :top-method="loadData" :bottom-method="loadMore" :auto-fill="false" :bottom-all-loaded="allLoaded"
			 ref="loadmore" :bottomPullText="bottomPullText">
				<div class="shopList">
					<indexShop v-for="(item,index) in restaurants" :key="index" :restaurants="item.restaurant"></indexShop>
				</div>
			</mt-loadmore>

		</div>
</template>

<script>
	import {
		Swiper,
		SwiperItem,
		Loadmore
	} from 'mint-ui'
	import FilterView from '../components/FilterView.vue'
	import indexShop from './indexShop.vue'
	export default {
		name: 'Home',
		data() {
			return {
				swiperImgs: [],
				entries: [],
				filterData: {},
				filterView: {},
				showFilter: false,
				restaurants: [],
				page: 1,
				size: 5,
				allLoaded: false,
				bottomPullText: '上拉加载更多',
				data: null
			}
		},
		created() {
			this.getData()
		},
		components: {
			FilterView,
			indexShop,
		
		},
		methods: {
			getData() {
				this.$axios('api/profile/shopping').then(res => {
					this.swiperImgs = res.data.swipeImgs
					this.entries = res.data.entries


				})
				this.$axios("api/profile/filter").then(res => {
					this.filterData = res.data.navTab
					this.filterView = res.data

				})
				this.loadData()
			},
			loadData() {
				this.page = 1;
				this.allLoaded = false
				this.bottomPullText = "上拉加载更多"
				this.$axios.post('api/profile/restaurants/' + this.page + '/' + this.size).then(res => {
					this.$refs.loadmore.onTopLoaded();
					this.restaurants = res.data
				})

			},
			loadMore() {
				if (!this.allLoaded) {
					this.page++;
					this.$axios.post('api/profile/restaurants/' + this.page + '/' + this.size).then(res => {
						this.$refs.loadmore.onBottomLoaded();
						if (res.data.length > 0) {
							res.data.forEach(item => {
								this.restaurants.push(item)
							});
							if (res.data < this.size) {
								this.allLoaded = true;
								this.bottomPullText = "没有更多了哦"
							}
						} else {
							this.allLoaded = true
							this.bottomPullText = "没有更多了哦"
						}
					})
				}

			},
			showFilterView(isShow) {
				this.showFilter = isShow
			},
			showView(isShow) {
				this.showFilter = isShow
			},
			updata(condition) {
				this.data = condition
				this.data = this.data.condation
				console.log(this.data)
			}
		},
		computed: {
			city() {
				return this.$store.getters.location.addressComponent.city ||
					this.$store.getters.location.addressComponent.province
			}
		}
	}
</script>

<style scoped>
	.home {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		overflow: auto;
	}

	.header,
	.search_warp {
		background-color: #009eef;
		padding: 10px 16px;
	}

	.address_map {
		height: 20px;
	}

	.address_map span {
		height: 100%;
		margin-left: 3px;
		display: inline-block;
		width: 270px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #F1F1F1;
		font-size: 15px;
		box-sizing: border-box;
	}

	.header .fa-sort-desc {
		position: relative;
		color: #F1F1F1;
		font-size: 15px;
		top: -10px;
		left: 20px;
	}

	.header .fa-map-marker {
		color: #F1F1F1;
		position: relative;
		top: -7px;
		font-size: 15px;
	}

	.search_warp {
		position: sticky;
		top: 0px;
		z-index: 999;
		box-sizing: border-box;
	}

	.search_warp .shop_search {

		background: #fff;
		padding: 10px 0;
		border-radius: 4px;
		text-align: center;
		color: #aaa;
	}

	.swipe {
		height: 100px;
	}

	.swipe img {
		width: 100%;
		height: 100px;
	}

	.entries {
		background-color: #FFFFFF;
		width: 100%;
		height: 200px;
	}

	.entries-item {}

	.foodentry {
		display: inline-block;
		width: 40px;
		height: 40px;
		margin-left: 30px;
		margin-top: 20px;


	}

	.foodentry span {
		display: block;
		position: relative;
		right: 10px;
		margin-top: 5px;
		width: 58px;
		white-space: nowrap;
		text-align: center;


	}

	.img_warp img {
		width: 100%;
		height: 100%;
	}

	.shopList-title {
		display: flex;
		align-items: flex;
		justify-content: center;
		height: 30px;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		color: #333;
		background-color: #fff;
		font-weight: 600;
	}

	.shopList-title::before,
	.shopList-title::after {
		display: block;
		content: '__';
		width: 16px;
		height: 2px;
		color: #999;
		position: relative;
		top: -10px;
	}

	.shopList-title::before {
		margin-right: 15px;
	}

	.shopList-title::after {
		margin-left: 15px;
	}

	.fixedView {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
	}

	.loadmore {
		height: calc(100% - 95px);
		overflow: auto;
	}
</style>
