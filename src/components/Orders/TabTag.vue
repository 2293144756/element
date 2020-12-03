<template>
	<div class="tab-tag">
		<div class="input-gorud">
			<span v-for="(item,index) in tags" :key="index" @click="$emit('btnclick', item)" class="form-item"
			:class="{'checked':selectTag === item}"
			>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name:'TabTag',
		props:{
			tags:Array,
			selectTag:String
		}
	}
</script>

<style scoped="scoped">
	.tab-tag {
		margin-left: 30px;
	}
	.input-gorud span {
		padding: 5px 15px;
		border: 1px solid #AAAAAA;
		margin-left: 10px;
		border-radius: 4px;
	}
	.checked {
		color: #009EEF;
	}
</style>
