<template>
	<div class="info-mode" v-show="showInfo" >
		<div class="brief-mode">
			<h2>
				<i v-if="rst.is_premium">品牌</i>
				<span>{{rst.name}}</span>
			</h2>
			<ul>
				<li>
					<h3>{{rst.rating}}</h3>
					<P>评分</P>
				</li>
				<li>
					<h3>{{rst.recent_order_num}}</h3>
					<P>月售</P>
				</li>
				<li  v-if="rst.delivery_mode">
					<h3>蜂鸟专送</h3>
					<P>{{ rst.order_lead_time}}分钟</P>
				</li>
				<li>
					<h3>{{rst.float_delivery_fee}}</h3>
					<P>配送费</P>
				</li>
				<li>
					<h3>{{(rst.distance / 1000).toFixed(1)}}km</h3>
					<P>距离</P>
				</li>
			</ul>
			<h3 class="promotion">
				<span>-- 公告 --</span>
				<P class="brief-model-yx">{{rst.promotion_info}}</P>
			</h3>
		</div>
		<div @click="$emit('btnclick')" class="brief-model-close">
			<img src="https://fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/" alt=""/>
		</div>
	</div>
</template>

<script>
	export default {
		name:'infoMode',
		props:{
			rst:Object,
			showInfo:Boolean
		},
		methods:{
	          
		}
	}
</script>

<style scoped="scoped">
	.info-mode {
		z-index: 999;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0, 0.8);
	}
	.brief-mode {
		z-index: 9999;
		width: 80%;
		height: 200px;
		background-color: #fff;
		border-radius: 6px;
		margin: 230px auto;
		text-align: center;
	}
	.brief-mode ul {
		display: flex;
		justify-content: space-around;
	}
	.brief-mode ul li {
		flex: 1;
		text-align: center;
	}
	.brief-model-close {
         position: fixed;
		 bottom: 180px;
		 left: 50%;
		 transform: translate(-50%);
		 
	}
	.brief-model-close img {
		width: 30px;
		height: 30px;
	}
</style>
