import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import  {Indicator} from 'mint-ui'

Vue.config.productionTip = false

Vue.prototype.$axios = axios


  axios.interceptors.request.use(config=>{
	  Indicator.open()
	  return config
  } , err=>{
	  return Promise.reject(err)
  })
   axios.interceptors.response.use(response=>{
	   Indicator.close()
	   return response
   } , err=>{
	   return Promise.reject(err)
   })

 Vue.use(MintUI)
 
  

  const vm =  new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
