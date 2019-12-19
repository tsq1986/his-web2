import Vue from 'vue'
import App from './App.vue'
import router from './router'

//--------------element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import {getRequest, postRequest, postKeyValueRequest, putRequest, delRequest} from "./utils/api";
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.postKeyValueRequest = postKeyValueRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.delRequest = delRequest

/**
 * 重写路由的push方法
 */
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    window.document.body.style.background = '#2d3a4b';
    next();
  } else {
    window.document.body.style.background = '';
    next();
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
