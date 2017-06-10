// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'
import VeeValidate from 'vee-validate'

Vue.config.productionTip = false;


Vue.use(VueResource);
Vue.use(VueCookie);
Vue.use(VeeValidate);
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
