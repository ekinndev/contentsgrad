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
        async login({ commit, dispatch, rootState }, data) {
            try {
                const user = await cmsApi.post('/user/session', data);
                commit('setUser', user.data);
            } catch (e) {
                if (e.response.status == 400) {
                    await dispatch('getProfile');
                }
            } finally {
                await dispatch('content/getSpaces', null, { root: true });
                await dispatch('content/getLanguages', null, { root: true });

                const spaceName = rootState.content.spaces[0]._id;

                cmsApi.defaults.headers.common['space'] = spaceName; // Set first state of the space

                await dispatch('content/getContentTypes', null, { root: true });
            }
        },
        async logout({ commit }) {
            await cmsApi.delete('/user/logout');
            commit('setUser', null);
            commit('content/setContentTypes', null, { root: true });
        },
        async getProfile({ commit }) {
            const user = await cmsApi.get('/user/profile');
            commit('setUser', user.data);
        },
    },
    getters: {},
};

export default accountModule;
