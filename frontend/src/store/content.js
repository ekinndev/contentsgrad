import cmsApi from '@/lib/cms-api.js';
import { message } from 'ant-design-vue';

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
            try {
                const contentTypes = await cmsApi.get('/content-types');
                commit('setContentTypes', contentTypes.data);
            } catch (e) {
                message.error('Error while getting content types: ' + e.response.data?.message);
            }
        },
        async getContentType(_, data) {
            try {
                const contentTypes = await cmsApi.get(
                    `/content-types/${data.payload}?type=${data.edit ? 'name' : 'id'}`,
                );
                return contentTypes.data;
            } catch (e) {
                message.error('Error while getting content type: ' + e.response.data?.message);
            }
        },
        async getContent(_, data) {
            try {
                const contentTypes = await cmsApi.get(
                    `/contents/${data.contentId}?type=content&contentType=${data.contentTypeName}&variety=uuid`,
                );

                return contentTypes.data;
            } catch (e) {
                message.error('Error while getting content: ' + e.response.data?.message);
            }
        },
        async getLanguages({ commit }) {
            try {
                const languages = await cmsApi.get('/languages');
                commit('setLanguages', languages.data);
            } catch (e) {
                message.error('Error while getting languages: ' + e.response.data?.message);
            }
        },
        async getSpaces({ commit }) {
            try {
                const spaces = await cmsApi.get('/spaces');
                commit('setSpaces', spaces.data);
            } catch (e) {
                message.error('Error while getting spaces: ' + e.response.data?.message);
            }
        },
        async getContentsOfContentTypes({ commit, state }, data) {
            try {
                let languageId = state.currentContentLanguageId;

                if (!languageId) {
                    commit('setCurrentContentLanguageId', state.languages[0]._id);
                    languageId = state.languages[0]._id;
                }

                const contentTypes = await cmsApi.get(`/contents/${data}?type=contentType&languageCode=${languageId}`);
                commit('setContents', contentTypes.data);
            } catch (e) {
                message.error('Error while getting contents of content type: ' + e.response.data?.message);
            }
        },
        async getContentsOfRelation(_, data) {
            try {
                const contentTypes = await cmsApi.get(`/contents/${data}?type=contentType`);

                return contentTypes.data;
            } catch (e) {
                message.error('Error while getting contents of relation: ' + e.response.data?.message);
            }
        },
        async addContent(_, data) {
            try {
                const contentTypes = await cmsApi.post(
                    `/contents/${data.contentTypeId}?type=contentType`,
                    data.reqPayload,
                );
                message.success('Content added successfully!');
                return contentTypes.data;
            } catch (e) {
                message.error('Error while adding content: ' + e.response.data?.message);
            }
        },
        async editContent(_, data) {
            try {
                const editContentResponse = await cmsApi.put(
                    `/contents/${data.contentId}?contentType=${data.contentTypeName}&language=${data.language}`,
                    { data: data.payload },
                );
                message.success('Content edited successfully!');

                return editContentResponse.data;
            } catch (e) {
                message.error('Error while editing content: ' + e.response.data?.message);
            }
        },
        async setAxiosSpace({ dispatch }, data) {
            cmsApi.defaults.headers.common['space'] = data;
            await dispatch('getContentTypes');
        },
        async deleteContent({ dispatch }, data) {
            try {
                await cmsApi.delete(`/contents/${data.id}?contentType=${data.contentTypeName}`);
                message.success('Content deleted successfully!');
            } catch (e) {
                message.error('Error while adding space: ' + e.response.data?.message);
            }

            await dispatch('getContentsOfContentTypes', data.contentTypeId);
        },
        async addSpace({ dispatch }, data) {
            try {
                await cmsApi.post('/spaces', data);
                message.success('Space added successfully!');
            } catch (e) {
                message.error('Error while adding space: ' + e.response.data?.message);
            }
            await dispatch('getSpaces');
        },
        async deleteSpace({ dispatch }, data) {
            try {
                await cmsApi.delete(`/spaces/${data}`);
                message.success('Space deleted successfully!');
            } catch (e) {
                message.error('Error while deleting space: ' + e.response.data?.message);
            }
            await dispatch('getSpaces');
        },
        async addLanguage({ dispatch }, data) {
            try {
                await cmsApi.post('/languages', data);
                message.success('Language added successfully!');
            } catch (e) {
                message.error('Error while adding language: ' + e.response.data?.message);
            }

            await dispatch('getLanguages');
        },
        async addContentType({ dispatch }, data) {
            try {
                await cmsApi.post(`/content-types`, data);
                message.success('Content type added successfully!');
            } catch (e) {
                message.error('Error while adding content type: ' + e.response.data?.message);
            }
            await dispatch('getContentTypes');
        },
        async deleteContentType({ dispatch }, data) {
            try {
                await cmsApi.delete(`/content-types/${data}`);
                message.success('Content type deleted successfully!');
            } catch (e) {
                message.error('Error while deleting content type: ' + e.response.data?.message);
            }
            await dispatch('getContentTypes');
        },
        async deleteLanguage({ dispatch }, data) {
            try {
                await cmsApi.delete(`/languages/${data}`);
                message.success('Language deleted successfully!');
            } catch (e) {
                message.error('Error while deleting language: ' + e.response.data?.message);
            }
            await dispatch('getLanguages');
        },
    },
    getters: {},
};

export default contentModule;
