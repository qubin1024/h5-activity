// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import { ToastPlugin, LoadingPlugin, AlertPlugin, AjaxPlugin } from 'vux'

import './assets/scss/index.css'

Vue.use(AjaxPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
  mounted() {
    if(location.search == ""){
      this.$router.push({ path: this.$route.query.hash, query: this.$route.query })
    }else{
      var params = {};	    
      if(location.search == '')	
        return;	
      decodeURIComponent(location.search).split("?")[1].split('&').forEach((e) => {	
        let key = e.split('=')[0]	
        params[key] = e.split('=')[1]	
      })	
      if (!!params.hash) {	
        this.$router.push({path: params.hash, query: params})	
      }
    }
  },
}).$mount('#app-box')

