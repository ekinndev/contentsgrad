import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './locales/en.json';
import tr from './locales/tr.json';

Vue.use(VueI18n);

const messages = {
    en,
    tr,
};

const i18n = new VueI18n({
    locale: 'en',
    messages,
});

export default i18n;
