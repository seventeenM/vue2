// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';

 import axios from 'axios';
// import vueAxios from 'vue-axios';
// Vue.use("vueAxios","axios")

Vue.prototype.$http = axios;


 import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI)
import router from './router'

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
