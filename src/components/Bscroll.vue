<template>
	<div ref="warp">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import Bscroll from 'better-scroll'
   export default {
	   name:'Bscroll',
	   data()
	   {
		   return {
			   scroll:null
		   }
	   },
	   created()
	   {
		   
	   },
	   methods:{
		 console.log(this.refs.warp)
	   }
   }
</script>

<style  scoped="scoped">
</style>
