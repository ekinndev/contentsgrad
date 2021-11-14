import Vue from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './registerServiceWorker';
import router from './router';
import store from './store';
import i18n from './i18n';

Vue.config.productionTip = false;

Vue.use(Antd);

new Vue({
    router: router(store),
    store,
    i18n,
    render: h => h(App),
}).$mount('#app');
