<template>
	<div class="tableware" v-if="isShow">
		<div class="actions-sheet">
			<i class="fa fa-remove" @click="$emit('close')"></i>
			<h2 class="actions-sheet-header">
				<span class="tag">--</span>
				<span class="title">餐品分数</span>
				<span class="tag">--</span>
			</h2>
			<ul>
				<li v-for="(item,index) in tablewarelist" :key="index" @click="btnclick(index , item)" :class="{blue:listIndex === index}">
					{{item}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name:'Tableware',
		props:{
			isShow:Boolean
		},
		data()
		{
			return {
				tablewarelist:['1','2','3','4','5','6'],
				listIndex:0
			}
		},
		methods:{
			btnclick(index , item)
			{
				this.listIndex = index;
				this.$store.dispatch('setCode' , {
					code: item + "份餐具"
				})
				
				this.$emit('close');
			}
		}
	}
</script>

<style scoped="scoped">
	.tableware {
		width: 100%;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		z-index: 9999;
		box-sizing: border-box;
		padding-bottom: 10px;
	}
	.actions-sheet {
		position: relative;
	}
	.actions-sheet>i {
		position: absolute;
		right: 10px;
		top: 10px;
		font-size: 16px;
		color: #AAAAAA;
		font-weight: 600;
	}
	.actions-sheet-header {
		text-align: center;
		margin-bottom: 10px;
		font-size: 14px;
	}
	.actions-sheet ul li {
		height: 35px;
		text-align: center;
		font-size: 14px;
	}
	.blue {
		color: dodgerblue;
	}
</style>
