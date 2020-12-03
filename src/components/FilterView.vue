<template>
	<div :class="{'open':isSort || isScreen}" @click.self="hideView">
		<div class="filter-view">
			<div class="filter">
				<div class="filter-nav" v-for="(item,index) in filterData" :key="index" :class="{'filter-bold':currentData === index}"
				@click="TabClick(index)"
				>
					<span >{{item.name}}</span>
					<i v-if="item.icon" :class="'fa fa-'+ item.icon"></i>
				</div>
			</div>
		</div>
		<section class="filter-extend" v-if="isSort">
			<ul>
				<li v-for="(item,index) in filterView.sortBy" v-if="isSort" :key="index" @click="selectSort(item ,index)">
					<span :class="{'selectName':currentSort === index}">{{item.name}}</span>
					<i v-show="currentSort === index" class="fa fa-check"></i>
				</li>
			</ul>
		</section>
		<section class="filter-extend" v-if="isScreen">
			<div class="filter-sort">
				<div class="morefilter" v-for="(item,index) in filterView.screenBy" :key="index">
					<p class="title">{{item.title}}</p>
					<ul>
						<li v-for="(screen , i) in item.data" :key="i" :class="{'selected': screen.select}"
						@click="selectScreen(screen , item)"
						>
							<img v-if="screen.icon" :src="screen.icon"> 
							<span>{{screen.name}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="morefilter-btn">
				<span class="morefilter-clear" @click="clearFilter" :class="{'edit':edit}">清空</span>
				<span class="morefilter-ok">确定</span>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name:'FilterView',
		data()
		{
			return {
				currentData:0,
				isSort:false,
				isScreen:false,
				currentSort:0
			}
		},
		props: {
			filterData:{
				tyoe:Object,
				default:{}
			},
			filterView:{
				tyoe:Object,
				default:{}
			}
		},
		computed:{
			edit()
			{
				let edit=false;
				this.filterView.screenBy.forEach(screen=>{
					screen.data.forEach(item=>{
						if(item.select)
						{
							edit = true
						}
					})
				})
				return edit
			}
		},
		
		methods:{
			TabClick(index)
			{
				this.currentData = index
				
				switch(index)
				{
					case 0:
					this.isSort=true;
					this.isScreen=false;
					this.$emit('searchFixed', true)
					break;
                    case 1:
					this.$emit('updata' , {condation:this.filterData[1].condition})
					break;
					case 2:
					this.$emit('updata' , {condation:this.filterData[2].condition})
					break;
					case 3:
					this.isScreen = true;
					this.isSort = false;
					this.$emit('searchFixed', true)
					break;
					default:
					this.hideView()
					break;
				}
			},
			hideView()
			{
				this.isSort=false;
				this.isScreen=false;
				this.$emit('showView', false)
			},
			selectSort(item ,index)
			{
				this.currentSort = index;
				this.filterView.navTab[0].name = this.filterView.sortBy[index].name;
				this.hideView()
				this.$emit('updata' , {condation: item.code})
			},
			selectScreen(item , screen)
			{
				if(screen.id  !== "MPI")
				{
					screen.data.forEach(ele=>{
						ele.select = false;
					})
				}
				item.select = !item.select
			},
			clearFilter()
			{
				this.filterView.screenBy.forEach(screen=>{
					screen.data.forEach(item=>{
						item.select= false
					})
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.filter-view {
		background-color: #fff;
		
	}
	.filter {
		height: 40px;
		display: flex;
		justify-content: center;
		line-height: 40px;
	}
	.filter-nav {
		flex: 1;
		text-align: center;
		font-size: 14px;
	}
	.filter-bold {
		font-weight: 600;
		color: #333;
	}
	.open {
		position: fixed;
		top: 52px;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0, 0.5);
		transition:  all 0.3 ease-in-out;
		z-index: 99;
	}
	.filter-extend {
		background-color: #fff;
		border-top: 1px #AAAAAA solid;
	
	}
	.filter-extend li {
		position: relative;
		padding-left: 10px;
		height: 45px;
		line-height: 45px;
		color: #333;
	}
	.fa-check {
		float: right;
		color: #009EEF;
		margin-right: 8px;
		line-height: 45px;
	}
	.selectName {
		color: #009EEF;
	}
    .filter-sort {
		margin-top: 10px;
		
	}
	.filter-sort img {
		width: 15px;
		height: 15px;
		margin-right: 5px;
		position: relative;
		top: 2px;
	}
	.morefilter .title {
		margin: 10px 0 ;
	}
	.morefilter ul {
	   margin-top: 15px;
	   display: flex;
	   flex-wrap: wrap;
	}
	.morefilter ul li {
		width: 100px;
		height: 40px;
		background-color: #eee;
		margin-left: 10px;
		margin-top: 5px;
		text-align: center;
		line-height: 40px;
	}
	.morefilter-btn {
		width: 100%;
		height: 50px;
		
	}
	.morefilter-clear {
		display: inline-block;
		width: 50%;
		height: 100%;
		line-height: 50px;
		text-align: center;
		color: #AAAAAA;
		
	}
	.morefilter-ok {
		display: inline-block;
		width: 50%;
		height: 100%;
		line-height: 50px;
		text-align: center;
		background-color: #8BDA81;
	}
	.selected {
		color: #3190e8 !important;
		background-color: #edf5ff !important;
	}
	.edit {
		color: #333333;
	}
</style>
