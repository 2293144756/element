<template>
	<div class="location">
		<div class="title">当前定位</div>
		<div class="des" @click="$emit('click')">
			<i class="fa fa-location-arrow"></i>
			<span>{{address}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name:'Location',
		props:{
			address:String
		}
	}
</script>

<style scoped>
	.des {
	
		padding: 10px 0 12px 0 ;
	}
	.des span {
		font-size: 16px;
		color: black;
	}
	.des i {
		color: #0000FF;
	}
	.des span {
		font-size: 14px;
		font-weight: 600;
	}
</style>
