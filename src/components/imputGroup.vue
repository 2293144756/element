<template>
	<div class="text-group">
		
		<div class="input_group" :class="{'is-invalid':error}">
			<input 
			:type="type"
			 :value="value" 
			 :placeholder="placeholder"
			 :name="name"
			 @input="$emit('input', $event.target.value)"/>
			 <button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')">{{btnTitle}}</button>
			
		</div>
		<div  v-if="error" class="invalder-feedback">{{error}}</div>
	</div>
</template>

<script>
	export default {
		name:'inputGroup',
		props:{
			type:{
				type:String,
				default:'text'
			},
			value:String,
			placeholder:String,
			name:String,
			btnTitle:String,
			disabled:Boolean,
			error:String
			
		}
	}
</script>

<style scoped>
	.input_group {
		position: relative;
	}
	input {
		font-size: 14px;
		outline: none;
		border-color: none;
	}
	.input_group button {
		position: absolute;
		top: 10px;
		right: 7px;
		border: none;
		outline: none;
		font-size: 14px;
		background: #fff;
		color: #AAAAAA;
		
	}
	.input_group button[disabled] {
	
		color: #aaa;
	}
	
	.invalder-feedback {
		color: red;
		padding-top: 5px;
	}
	.input_group input {
		width: 100%;
		height: 35px;
	}
	.is-invalid {
		border: 1px solid red;
	}
</style>
