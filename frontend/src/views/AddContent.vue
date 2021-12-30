<template>
    <div class="addContent">
        <box title="Add content">
            <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 10 }" @submit="handleSubmit">
                <a-form-item :label="field.fieldName" v-for="field in contentFields" :key="field.fieldName">
                    <a-input v-if="field.fieldType === 'string'" v-decorator="[field.fieldName]" />
                    <a-textarea
                        v-if="field.fieldType === 'rstring'"
                        placeholder="Controlled autosize"
                        v-decorator="[field.fieldName]"
                    />
                    <a-input-number
                        v-if="field.fieldType === 'integer' || field.fieldType === 'float'"
                        :step="field.fieldType === 'float' ? 0.1 : 1"
                        v-decorator="[field.fieldName]"
                    />
                    <a-input-number
                        v-if="field.fieldType === 'number'"
                        :min="0"
                        :step="1"
                        v-decorator="[field.fieldName]"
                    />
                    <a-switch v-if="field.fieldType === 'boolean'" v-decorator="[field.fieldName]" />
                    <a-textarea v-if="field.fieldType === 'object'" v-decorator="[field.fieldName]" />
                    <a-date-picker v-if="field.fieldType === 'date'" v-decorator="[field.fieldName]" />
                    <a-select v-if="field.fieldType === 'enum'" v-decorator="[field.fieldName]">
                        <a-select-option :value="enumVal" v-for="enumVal in field.enumData" :key="enumVal">
                            {{ enumVal }}
                        </a-select-option>
                    </a-select>
                    <a-select
                        v-if="field.fieldType === 'relation' && contentsOfRelation[field.fieldName]"
                        v-decorator="[field.fieldName]"
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
    computed: {
        ...mapState('content', ['contents']),
    },
    methods: {
        ...mapActions('content', ['getContentType', 'getContentsOfRelation', 'addContent']),
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

                await this.addContent({
                    contentTypeId: this.$route.params.contentTypeId,
                    reqPayload: { data: payload, language: '617dc857edf7d4aa437b6988' },
                });
            });
        },
    },

    data() {
        return {
            contentFields: undefined,
            contentsOfRelation: {},
            form: this.$form.createForm(this, { name: 'addContent' }),
        };
    },

    async mounted() {
        const id = this.$route.params.contentTypeId;

        const data = await this.getContentType(id);

        this.contentFields = data?.fieldsDatas ?? null;

        const relationalFields = (data?.fieldsDatas ?? []).filter(field => field.fieldType === 'relation');

        if (relationalFields.length > 0) {
            for (const field of relationalFields) {
                const data = await this.getContentsOfRelation(field.relationContentTypeId);
                this.contentsOfRelation[field.fieldName] = data.map(content => ({ ...content.data, _id: content._id }));
                this.contentsOfRelation = { ...this.contentsOfRelation };
            }
        }
    },
};
</script>

<style></style>
