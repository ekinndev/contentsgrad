import cmsApi from '@/lib/cms-api.js';

const contentModule = {
    namespaced: true,
    state: () => ({
        spaces: undefined,
        languages: undefined,
        contentTypes: undefined,
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
    },
    getters: {},
};

export default contentModule;
