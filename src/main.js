import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui';
import router from './router'
import store from './store'
import api from './assets/api/api.js'
import 'element-ui/lib/theme-chalk/index.css';
import common from '@/assets/js/common.js'

Vue.prototype.common = common;//公共方法js
Vue.use(Element, { size: 'small' })
Vue.config.productionTip = false
Vue.prototype.api = api;//请求api
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
