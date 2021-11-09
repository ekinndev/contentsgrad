import cmsApi from '@/lib/cms-api.js';

const accountModule = {
    namespaced: true,
    state: () => ({
        user: undefined,
    }),
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
    },
    actions: {
        async login({ commit, dispatch }, data) {
            const user = await cmsApi.post('/user/session', data);
            await dispatch('content/getSpaces', null, { root: true });
            await dispatch('content/getLanguages', null, { root: true });
            await dispatch('content/getContentTypes', null, { root: true });
            commit('setUser', user.data);
        },
        async logout({ commit }) {
            await cmsApi.delete('/user/logout');
            commit('setUser', null);
            commit('content/setContentTypes', null, { root: true });
        },
    },
    getters: {},
};

export default accountModule;
