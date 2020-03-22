import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import { routes } from './routes';  

import axios from 'axios';
import VueAxios from 'vue-axios';
import VueTheMask from 'vue-the-mask'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueTheMask)

const router = new VueRouter({
  routes,
  mode: 'history'
});
 
new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
