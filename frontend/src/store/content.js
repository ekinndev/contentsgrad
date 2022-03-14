import cmsApi from '@/lib/cms-api.js';

const contentModule = {
    namespaced: true,
    state: () => ({
        spaces: undefined,
        languages: undefined,
        contentTypes: undefined,
        contents: undefined,
        content: undefined,
        currentContentLanguageId: undefined,
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
        setCurrentContentLanguageId(state, language) {
            state.currentContentLanguageId = language;
        },
    },
    actions: {
        async getContentTypes({ commit }) {
            const contentTypes = await cmsApi.get('/content-types');
            commit('setContentTypes', contentTypes.data);
        },
        async getContentType(_, data) {
            const contentTypes = await cmsApi.get(`/content-types/${data.payload}?type=${data.edit ? 'name' : 'id'}`);

            return contentTypes.data;
        },
        async getContent(_, data) {
            const contentTypes = await cmsApi.get(
                `/contents/${data.contentId}?type=content&contentType=${data.contentTypeName}&variety=uuid`,
            );

            return contentTypes.data;
        },
        async getLanguages({ commit }) {
            const languages = await cmsApi.get('/languages');
            commit('setLanguages', languages.data);
        },
        async getSpaces({ commit }) {
            const spaces = await cmsApi.get('/spaces');
            commit('setSpaces', spaces.data);
        },
        async getContentsOfContentTypes({ commit, state }, data) {
            const languageId = state.currentContentLanguageId || state.languages[0]._id;

            const contentTypes = await cmsApi.get(`/contents/${data}?type=contentType&languageCode=${languageId}`);
            commit('setContents', contentTypes.data);
        },
        async getContentsOfRelation(_, data) {
            const contentTypes = await cmsApi.get(`/contents/${data}?type=contentType`);

            return contentTypes.data;
        },
        async addContent(_, data) {
            const contentTypes = await cmsApi.post(`/contents/${data.contentTypeId}?type=contentType`, data.reqPayload);

            return contentTypes.data;
        },
        async editContent(_, data) {
            const editContentResponse = await cmsApi.put(
                `/contents/${data.contentId}?contentType=${data.contentTypeName}&language=${data.language}`,
                { data: data.payload },
            );

            return editContentResponse.data;
        },
        async setAxiosSpace({ dispatch }, data) {
            cmsApi.defaults.headers.common['space'] = data;
            await dispatch('getContentTypes');
        },
        async deleteContent({ dispatch }, data) {
            await cmsApi.delete(`/contents/${data.id}?contentType=${data.contentTypeName}`);

            await dispatch('getContentsOfContentTypes', data.contentTypeId);
        },
        async addSpace({ dispatch }, data) {
            await cmsApi.post('/spaces', data);
            await dispatch('getSpaces');
        },
        async deleteSpace({ dispatch }, data) {
            await cmsApi.delete(`/spaces/${data}`);
            await dispatch('getSpaces');
        },
        async addLanguage({ dispatch }, data) {
            await cmsApi.post('/languages', data);
            await dispatch('getLanguages');
        },
        async addContentType({ dispatch }, data) {
            await cmsApi.post(`/content-types`, data);
            await dispatch('getContentTypes');
        },
        async deleteContentType({ dispatch }, data) {
            await cmsApi.delete(`/content-types/${data}`);
            await dispatch('getContentTypes');
        },
        async deleteLanguage({ dispatch }, data) {
            await cmsApi.delete(`/languages/${data}`);
            await dispatch('getLanguages');
        },
    },
    getters: {},
};

export default contentModule;
