import cmsApi from '@/lib/cms-api.js';
import { message } from 'ant-design-vue';

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
                } else {
                    message.error('Error while logging in: ' + e.response.data?.message);
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
            try {
                await cmsApi.delete('/user/logout');
                commit('setUser', null);
                commit('content/setContentTypes', null, { root: true });

                message.success("You've been logged out successfully");
            } catch (e) {
                message.error('Error while logging out: ' + e.response.data?.message);
            }
        },
        async getProfile({ commit }) {
            try {
                const user = await cmsApi.get('/user/profile');
                commit('setUser', user.data);
            } catch (e) {
                message.error('Error while getting profile: ' + e.response.data?.message);
            }
        },
    },
    getters: {},
};

export default accountModule;
