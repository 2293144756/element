<template>
	<div class="searchindex">
		<ul class="search_list">
			<li v-for="(item , index) in goods" :key="index">
				<img v-if="item.image_path" :src="item.image_path" alt=""/>
				<i v-else class="fa fa-search"></i>
				<div class="shopitem">
					<span class="title">{{item.name || item}}</span>
					<span v-if="item.rating" class="rating">评分{{item.rating}}</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name:'searchIndex',
		props:{
			goods:Array
		}
	}
</script>

<style scoped="scoped">
	.searchindex {

		background-color: #FFF;
	
	}
	.searchindex li {
		display: flex;
		height: 60px;
		padding: 0px 15px;
	}
	.shopitem {
		position: relative;
		width: 100%;
		line-height: 60px;
		border-top: 2px #EEEEEE solid;
		padding-left: 20px;
		
	}
	.shopitem .title {
		display: inline-block;
		width: 190px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.search_list i {
		line-height: 60px;
	}
	.shopitem .rating {
		position: absolute;
		right: 0;
		line-height: 45px;
	}
	.search_list img {
		width: 30px;
		height: 30px;
		margin-top: 15px;
		
	}
	
</style>
