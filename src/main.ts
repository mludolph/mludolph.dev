import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import './assets/scss/app.scss';

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
