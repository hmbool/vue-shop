import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入字体图标
import './assets/fonts/iconfont.css'

// 导入全局css
import './assets/css/global.css'


// 导入axios 挂载
import axios from 'axios'
// 导入消息提示 挂载
import { Message } from 'element-ui'


// 接口根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

Vue.prototype.$http = axios
Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
