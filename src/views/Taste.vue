<template>
	<div class="taste">
		<Header title="口味选择"></Header>
		<div class="view-body">
			<section>
				<textarea placeholder="填写额外对餐厅或骑手小哥备注的信息" v-model="text" maxlength="100"></textarea>
				<div class="switch">
					<span @click="btnclick(item)" :class="{blue:item.select}" v-for="(item,index) in radioItem" :keys="index">{{item.name}}</span>
					<span  @click="i.select = !i.select" v-for="(i,j) in switchItem" :keys="j" :class="{blue:i.select}">{{i.name}}</span>
				</div>
				
			</section>
			
		</div>
		<div @click="headleclick" class="close">确定</div>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	export default {
		name:'Taste',
		data()
		{
			return {
				text:'',
				radioItem:[
					{select:false , name:'不要辣'},
					{select:false , name:'少点辣'},
					{select:false , name:'多点辣'}
				],
				switchItem:[
					{select:false , name:'不要香菜'},
					{select:false , name:'不要洋葱'},
					{select:false , name:'多点醋'},
					{select:false , name:'多点葱花'}
				],
				indexlist:0
			}
		},
		components:{
			Header
		},
		methods:{
			btnclick(item)
			{
				this.radioItem.forEach(box=>{
					box.select=false
				})
				item.select=true
			},
			headleclick()
			{
				let result=''
				this.radioItem.forEach(element=>{
					if(element.select)
					{
						result += element.name + ","
					}
				})
				this.switchItem.forEach(element=>{
					if(element.select)
					{
						result += element.name + ","
					}
				})
				result += this.text;
			   this.$store.dispatch('selectInfo' , {
				   selectItem:result
			   })
			   this.$router.go(-1)
			}
		}
	}
</script>

<style scoped="scoped">
	.view-body {
		background-color: #FFFFFF;
		padding: 10px 10px;
		box-sizing: border-box;
		margin-top: 8px;
	}
	.view-body section textarea {
		width: 100%;
		height: 100px;
		background-color: #EEEEEE;
	}
	.switch {
		margin-top: 25px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		height: 80px;
		box-sizing: border-box;
	}
	.switch span {
		padding: 7px 7px;
		border: 1px #AAAAAA solid;
	}
	.blue {
		background-color:#008800;
		color: #FFFFFF;
	}
	.close {
		width: 90%;
		height: 45px;
		margin: auto;
		background-color: #00FF00;
		border-radius: 2px;
		text-align: center;
		line-height: 45px;
		margin-top: 20px;
		
	}
</style>
