<template>
	
	<div class="rst-activity">
		<div class="activity-text">
			<span :style="{background: '#' + activities[0].icon_color}">{{activities[0].icon_name}}</span>
			<span class="price">{{activities[0].description}}</span>
		</div>
		<span class="activity-count" @click="isShow=true">
			<span>{{activities.length}}优惠</span>
			<i class="fa fa-caret-down"></i>
		</span>
		<div class="box" v-show="isShow">
			<div class="act-model">
				<div class="activity-sheet">
					<i @click="isShow=false" class="fa fa-remove"></i>
					<h2>优惠活动</h2>
					<ul>
					  <li v-for="(item,index) in activities" :key="index">
						  <span :style="{background: '#' + item.icon_color}">{{item.icon_name}}</span>
						  <span>{{item.description}}</span>
					  </li>
					</ul>
				</div>
			</div>
	   </div>
	</div>
	
</template>

<script>
	export default {
		name:'Activity',
		data()
		{
			return {
				isShow:false
			}
		},
		props:{
			activities:Array
		}
	}
</script>

<style scoped="scoped">
	.rst-activity {
		margin-top: 20px;
		padding-left: 37px;
		
	}
	.activity-text {
		display: inline-block;
		
	}
	.activity-text span {
	
	}
	.activity-count {
		margin-left: 100px;
	}
	.act-model {
		height: 200px;
		background-color: #fff;
		position: fixed;
		bottom:0;
		left: 0;
		right: 0;
		padding: 10px 10px 0px 20px;
		z-index: 9999;
	}
	.act-model ul li {
		margin-top: 15px;
	}
	.activity-sheet h2 {
		text-align: center;
		font-size: 18px;
		font-weight: 600;
	}
	.activity-sheet i {
		float: right;
	}
	.price {
		margin-left: 10px;
	}

</style>
