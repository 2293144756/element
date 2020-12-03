import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types={
	SET_LOCATION:'SET_LOCATION',
	SET_ADDRESS:'SET_ADDRESS',
    SET_ORDER_INFO:'ORDER_INFO',
    USER_INFO:'USER_INFO',
	SET_CODE_INFO:'SET_CODE_INFO'
}

export default new Vuex.Store({
  state: {
	  location:{},
	  address:'',
	  user_info:null,
	  order_info:null,
	  codeInfo:null
  },
  getters:{
	  location:state=>state.location,
	  address:state=>state.address,
	  user_info:state=>state.user_info,
	  order_info:state=>state.order_info,
	  codeInfo:state=>state.codeInfo
  },
  mutations: {
	  [types.SET_LOCATION] (state , location)
	  {
		  if(location)
		  {
			  state.location = location
		  }else {
			  state.location = null;
		  }
		 
	  },
	  [types.SET_ADDRESS] (state , address)
	  {
	  			  if(address)
	  			  {
	  				  state.address = address
	  			  }else {
	  				  state.address = ''
	  			  }
	  },
	  [types.USER_INFO] (state , payload)
	  {
		  if(payload)
		  {
		  		state.user_info = payload
		  }else {
		  		 state.user_info = null;
		  }
	  },
	  [types.SET_ORDER_INFO] (state , payload)
	  {
		  if(payload)
		  {
			  state.order_info = payload
		  }else {
			  state.order_info = null
		  }
	  },
	  [types.SET_CODE_INFO] (state , payload)
	  {
		  if(payload)
		  {
			  state.codeInfo = payload
		  }else {
			  state.codeInfo = null;
		  }
	  }
	  
  },
  actions: {
	  setlocation : ({commit} , location)=>{
		  commit(types.SET_LOCATION , location)
	  },
	  setaddress : ({commit} , address)=>{
		  commit(types.SET_ADDRESS , address)
		  
	  },
	  setuserinfo : ({commit} , payload)=>{
	  		  commit(types.USER_INFO , payload) 
	  },
	  setOrderInfo : ({commit} , payload)=>{
		  commit(types.SET_ORDER_INFO ,payload)
	  },
	  setCode : ({commit} , payload)=>{
		  commit(types.SET_CODE_INFO , payload)
	  }
  },
  modules: {
  }
})
