<template>
    <div :class="!editMode ? 'addContent' : 'editContent'">
        <box :title="!editMode ? 'Add content' : 'Edit Content'">
            <a-tabs @change="setLanguage" :default-active-key="currentContentLanguageId">
                <a-tab-pane :key="language._id" :tab="language.code" v-for="(language, i) in languages">
                    <a-form
                        :form="form"
                        :label-col="{ span: 3 }"
                        :wrapper-col="{ span: 10 }"
                        @submit="handleSubmit"
                        v-if="contentLanguageId == language._id"
                    >
                        <a-form-item :label="field.fieldName" v-for="field in contentFields" :key="field.fieldName">
                            <a-input
                                v-if="field.fieldType === 'string'"
                                v-decorator="[
                                    field.fieldName,
                                    editMode ? { initialValue: getFormItemValue(i, field.fieldName) } : {},
                                ]"
                            />
                            <a-textarea
                                v-if="field.fieldType === 'rstring'"
                                placeholder="Controlled autosize"
                                v-decorator="[
                                    field.fieldName,
                                    editMode ? { initialValue: getFormItemValue(i, field.fieldName) } : {},
                                ]"
                            />
                            <a-input-number
                                v-if="field.fieldType === 'integer' || field.fieldType === 'float'"
                                :step="field.fieldType === 'float' ? 0.1 : 1"
                                v-decorator="[
                                    field.fieldName,
                                    editMode ? { initialValue: getFormItemValue(i, field.fieldName) } : {},
                                ]"
                            />
                            <a-input-number
                                v-if="field.fieldType === 'number'"
                                :min="0"
                                :step="1"
                                v-decorator="[
                                    field.fieldName,
                                    editMode ? { initialValue: getFormItemValue(i, field.fieldName) } : {},
                                ]"
                            />
                            <a-switch
                                v-if="field.fieldType === 'boolean'"
                                v-decorator="[
                                    field.fieldName,
                                    editMode ? { initialValue: getFormItemValue(i, field.fieldName) } : {},
                                ]"
                            />
                            <a-textarea
                                v-if="field.fieldType === 'object'"
                                v-decorator="[
                                    field.fieldName,
                                    editMode ? { initialValue: getFormItemValue(i, field.fieldName) } : {},
                                ]"
                            />
                            <a-date-picker
                                v-if="field.fieldType === 'date'"
                                v-decorator="[
                                    field.fieldName,
                                    editMode ? { initialValue: getFormItemValue(i, field.fieldName) } : {},
                                ]"
                            />
                            <a-select
                                v-if="field.fieldType === 'enum'"
                                v-decorator="[
                                    field.fieldName,
                                    editMode ? { initialValue: getFormItemValue(i, field.fieldName) } : {},
                                ]"
                            >
                                <a-select-option :value="enumVal" v-for="enumVal in field.enumData" :key="enumVal">
                                    {{ enumVal }}
                                </a-select-option>
                            </a-select>
                            <a-select
                                v-if="field.fieldType === 'relation' && contentsOfRelation[field.fieldName]"
                                v-decorator="[
                                    field.fieldName,
                                    editMode
                                        ? {
                                              initialValue: findInitialVal(
                                                  getFormItemValue(i, field.fieldName),
                                                  field.fieldName,
                                                  field.relationFieldName,
                                              ),
                                          }
                                        : {},
                                ]"
                            >
                                <a-select-option
                                    :value="relationName._id"
                                    v-for="(relationName, i) in contentsOfRelation[field.fieldName]"
                                    :key="i"
                                >
                                    {{ relationName[field.relationFieldName] }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>

                        <a-form-item>
                            <a-button type="primary" html-type="submit"> Submit </a-button>
                        </a-form-item>
                    </a-form>
                </a-tab-pane>
            </a-tabs>
        </box>
    </div>
</template>

<script>
import Box from '@/components/Box.vue';
import { mapState, mapActions } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

export default {
    components: {
        Box,
    },
    props: {
        edit: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('content', ['contents', 'languages', 'currentContentLanguageId']),
    },
    methods: {
        ...mapActions('content', [
            'getContentType',
            'getContentsOfRelation',
            'addContent',
            'getContent',
            'editContent',
        ]),
        findInitialVal(value, relationFieldName, relationKeyName) {
            return this.contentsOfRelation[relationFieldName].find(relation => relation[relationKeyName] === value)._id;
        },
        getFormItemValue(index, fieldName) {
            return this.content?.[index]?.data?.[fieldName];
        },
        setLanguage(languageId) {
            this.contentLanguageId = languageId;

            if (!this.content.some(content => content.language._id === this.contentLanguageId)) {
                this.editMode = false;
            } else {
                this.editMode = true;
            }
        },
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields(async (err, values) => {
                if (err) return;

                const payload = { ...values };

                const jsonFields = (this.contentFields ?? []).filter(field => field.fieldType === 'object');
                const dateFields = (this.contentFields ?? []).filter(field => field.fieldType === 'date');

                jsonFields.forEach(field => {
                    payload[field.fieldName] = JSON.parse(values[field.fieldName]);
                });

                dateFields.forEach(field => {
                    payload[field.fieldName] = values[field.fieldName].toISOString();
                });

                if (!this.editMode) {
                    let contentTypeId = this.$route.params.contentTypeId;
                    if (!contentTypeId) contentTypeId = this.content[0].contentType._id;

                    await this.addContent({
                        contentTypeId: contentTypeId,
                        reqPayload: {
                            data: payload,
                            language: this.contentLanguageId,
                            contentId: this.uniqueContentId,
                        },
                    });
                } else {
                    await this.editContent({
                        contentId: this.$route.params.contentId,
                        contentTypeName: this.$route.params.contentTypeName,
                        language: this.contentLanguageId,
                        payload,
                    });
                }
            });
        },
    },

    data() {
        return {
            contentFields: undefined,
            contentsOfRelation: {},
            form: this.$form.createForm(this, { name: 'addContent' }),
            content: {},
            contentLanguageId: undefined,
            uniqueContentId: null,
            editMode: this.edit,
        };
    },

    async mounted() {
        this.contentLanguageId = this.currentContentLanguageId;
        if (!this.editMode) this.uniqueContentId = uuidv4();

        const idOrName = !this.editMode ? this.$route.params.contentTypeId : this.$route.params.contentTypeName;

        const contentTypePayload = { payload: idOrName, edit: this.editMode };

        const data = await this.getContentType(contentTypePayload);

        if (this.editMode) {
            this.content = await this.getContent({
                contentTypeName: idOrName,
                contentId: this.$route.params.contentId,
            });

            this.uniqueContentId = this.content[0].contentId;
        }

        this.contentFields = data?.fieldsDatas ?? {};

        const relationalFields = (data?.fieldsDatas ?? []).filter(field => field.fieldType === 'relation');

        if (relationalFields.length > 0) {
            for (const field of relationalFields) {
                const data = await this.getContentsOfRelation(field.relationContentTypeId?._id);
                this.contentsOfRelation[field.fieldName] = data.map(content => ({ ...content.data, _id: content._id }));
                this.contentsOfRelation = { ...this.contentsOfRelation };
            }
        }
    },
};
</script>

<style></style>
