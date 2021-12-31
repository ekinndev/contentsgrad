<template>
    <div :class="!edit ? 'addContent' : 'editContent'">
        <box :title="!edit ? 'Add content' : 'Edit Content'">
            <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 10 }" @submit="handleSubmit">
                <a-form-item :label="field.fieldName" v-for="field in contentFields" :key="field.fieldName">
                    <a-input
                        v-if="field.fieldType === 'string'"
                        v-decorator="[field.fieldName, edit ? { initialValue: content[0].data[field.fieldName] } : {}]"
                    />
                    <a-textarea
                        v-if="field.fieldType === 'rstring'"
                        placeholder="Controlled autosize"
                        v-decorator="[field.fieldName, edit ? { initialValue: content[0].data[field.fieldName] } : {}]"
                    />
                    <a-input-number
                        v-if="field.fieldType === 'integer' || field.fieldType === 'float'"
                        :step="field.fieldType === 'float' ? 0.1 : 1"
                        v-decorator="[field.fieldName, edit ? { initialValue: content[0].data[field.fieldName] } : {}]"
                    />
                    <a-input-number
                        v-if="field.fieldType === 'number'"
                        :min="0"
                        :step="1"
                        v-decorator="[field.fieldName, edit ? { initialValue: content[0].data[field.fieldName] } : {}]"
                    />
                    <a-switch
                        v-if="field.fieldType === 'boolean'"
                        v-decorator="[field.fieldName, edit ? { initialValue: content[0].data[field.fieldName] } : {}]"
                    />
                    <a-textarea
                        v-if="field.fieldType === 'object'"
                        v-decorator="[field.fieldName, edit ? { initialValue: content[0].data[field.fieldName] } : {}]"
                    />
                    <a-date-picker
                        v-if="field.fieldType === 'date'"
                        v-decorator="[field.fieldName, edit ? { initialValue: content[0].data[field.fieldName] } : {}]"
                    />
                    <a-select
                        v-if="field.fieldType === 'enum'"
                        v-decorator="[field.fieldName, edit ? { initialValue: content[0].data[field.fieldName] } : {}]"
                    >
                        <a-select-option :value="enumVal" v-for="enumVal in field.enumData" :key="enumVal">
                            {{ enumVal }}
                        </a-select-option>
                    </a-select>
                    <a-select
                        v-if="field.fieldType === 'relation' && contentsOfRelation[field.fieldName]"
                        v-decorator="[
                            field.fieldName,
                            edit
                                ? {
                                      initialValue: findInitialVal(
                                          content[0].data[field.fieldName],
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
        </box>
    </div>
</template>

<script>
import Box from '@/components/Box.vue';
import { mapState, mapActions } from 'vuex';

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
        ...mapState('content', ['contents']),
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

                if (!this.edit) {
                    await this.addContent({
                        contentTypeId: this.$route.params.contentTypeId,
                        reqPayload: { data: payload, language: '617dc857edf7d4aa437b6988' },
                    });
                } else {
                    await this.editContent({
                        contentId: this.$route.params.contentId,
                        contentTypeName: this.$route.params.contentTypeName,
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
        };
    },

    async mounted() {
        const idOrName = !this.edit ? this.$route.params.contentTypeId : this.$route.params.contentTypeName;

        const contentTypePayload = { payload: idOrName, edit: this.edit };

        const data = await this.getContentType(contentTypePayload);

        if (this.edit) {
            this.content = await this.getContent({
                contentTypeName: idOrName,
                contentId: this.$route.params.contentId,
            });
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
