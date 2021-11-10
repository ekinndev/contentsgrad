import cmsApi from '@/lib/cms-api.js';

const contentModule = {
    namespaced: true,
    state: () => ({
        spaces: undefined,
        languages: undefined,
        contentTypes: undefined,
        contents: undefined,
        content: undefined,
    }),
    mutations: {
        setContentTypes(state, contentTypes) {
            state.contentTypes = contentTypes;
        },
        setLanguages(state, languages) {
            state.languages = languages;
        },
        setSpaces(state, spaces) {
            state.spaces = spaces;
        },
        setContents(state, contents) {
            state.contents = contents;
        },
    },
    actions: {
        async getContentTypes({ commit }) {
            const contentTypes = await cmsApi.get('/content-types');
            commit('setContentTypes', contentTypes.data);
        },
        async getLanguages({ commit }) {
            const languages = await cmsApi.get('/languages');
            commit('setLanguages', languages.data);
        },
        async getSpaces({ commit }) {
            const spaces = await cmsApi.get('/spaces');
            commit('setSpaces', spaces.data);
        },
        async getContentsOfContentTypes({ commit }, data) {
            const contentTypes = await cmsApi.get(`/contents/${data}?type=contentType`);
            commit('setContents', contentTypes.data);
        },
        async addSpace({ dispatch }, data) {
            await cmsApi.post('/spaces', data);
            await dispatch('getSpaces');
        },
        async deleteSpace({ dispatch }, data) {
            await cmsApi.delete(`/spaces/${data}`);
            await dispatch('getSpaces');
        },
    },
    getters: {},
};

export default contentModule;
