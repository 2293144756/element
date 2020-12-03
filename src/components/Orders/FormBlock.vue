<template>
	<div class="formblock">
		<div class="lable-warp">{{label}}</div>
		<div class="input-groud-warp">
			<div class="input-warp">
				<input 
				v-if="!textarea"
				:type="type"
				:value="value"
				:placeholder="placeholder"
				@input="$emit('input' , $event.target.value)"
				 />
				 
				 <textarea 
				 v-else
				 :type="type"
				 :value="value"
				 :placeholder="placeholder"
				 @input="$emit('input' , $event.target.value)"
				 rows="2"
				 maxlength="100"
				 >
				 </textarea>
				  <i v-if="icon" :class="'fa fa-' + icon"></i>
			</div>
			
		</div>
	</div>
</template>

<script>
	import TabTag from './TabTag.vue'
	export default {
		name:'FormBlock',
		props:{
			type:{
				type:String,
				default:'text'
			},
			label:String,
			value:String,
			placeholder:String,
			icon:String,
			textarea:String,
			tags:Array
		},
		components:{
			TabTag
		}
	}
</script>

<style scoped="scoped">
	.formblock {
		border-bottom: 1px #EEEEEE solid;
		box-sizing: border-box;
	}
	.input-warp>i {
		font-size: 18px;
	}
	.lable-warp {
		font-size: 16px;
		font-weight: 600;
		width:20%;
		line-height: 45px;
	}
	.input-groud-warp {
		width: 100%;
		line-height: 45px;
	}
	.input-groud-warp input {
		outline: none;
		border: none;
		font-size: 14px;
	    font-weight: 500;
		width: 90%;
		
		color: #AAAAAA;
	}
	.input-groud-warp textarea {
		width: 90%;
		height: 100%;
		border: none;
		outline: none;
		font-size: 14px;
		font-weight: 600;
		color: #AAAAAA;
	}
</style>
