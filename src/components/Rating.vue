<template>
	<div class="Rating-gray">
		<i  v-for="(item,index) in itemClasses" :key="index" class="fa" :class="item"></i>
		
	</div>
</template>

<script>
	const LENGTH=5;
	const CLS_ON = "fa-star";
	const CLS_HALE = "fa-star-half-empty";
	const CLS_OFF = "fa-star-o";
	
	export default {
		name:'Rating',
		props:{
			rating:Number
		},
		computed: {
		    itemClasses()
			{
				let result=[];
				let score = Math.floor(this.rating *2) / 2;
				let hasDecimal = score % 1 !== 0;
				let integer = Math.floor(score)
				for(let i=0; i<integer; i++)
				{
					result.push(CLS_ON);
				}
				if(hasDecimal)
				{
					result.push(CLS_HALE);
				}
				while(result.length < LENGTH )
				{
					result.push(CLS_OFF)
				}
				return result
			}
		}
	}
</script>

<style  scoped="scoped">
	.Rating-gray i {
		color: #FF8C00;
	}
</style>
