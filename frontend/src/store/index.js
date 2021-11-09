import Vue from 'vue';
import Vuex from 'vuex';
import accountModule from './account';
import contentModule from './content';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        account: accountModule,
        content: contentModule,
    },
});
