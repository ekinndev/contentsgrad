<template>
    <div class="box">
        <a-row type="flex" justify="space-between">
            <a-col flex="200px">
                <h3>{{ title }}</h3>
            </a-col>
            <a-row type="flex">
                <a-col v-if="showLanguageSelect">
                    <a-select @change="selectLanguageHandler">
                        <a-select-option v-for="lan in selectLanData" :key="lan.value" :value="lan.value">
                            {{ lan.label }}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col v-if="buttonText">
                    <a-button :icon="icon" @click="handler">{{ buttonText }}</a-button>
                </a-col>
            </a-row>
        </a-row>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        title: {
            type: String,
            default: 'ContentsGrad',
        },
        icon: {
            type: String,
            default: '',
        },
        buttonText: {
            type: String,
            default: '',
        },
        showLanguageSelect: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        handler() {
            this.$emit('handler');
        },
        selectLanguageHandler(selectedLanguage) {
            this.$emit('selectLanguageHandler', selectedLanguage);
        },
    },
    computed: {
        ...mapState('content', ['languages']),

        selectLanData() {
            return this.languages.map(language => ({
                value: language._id,
                label: language.name,
            }));
        },
    },
};
</script>

<style scoped lang="scss">
.box {
    margin-top: 3rem;
    background: #fff;
    padding: 3rem;
}
.content {
    margin-top: 1rem;
}
</style>
