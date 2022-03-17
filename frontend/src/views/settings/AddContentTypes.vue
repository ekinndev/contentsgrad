<template>
    <div class="contentTypes">
        <box title="Add a content type">
            <a-form :form="form" @submit="handleSubmit">
                <a-form-item label="Content Type Name">
                    <a-input
                        v-decorator="[
                            `contentTypeName`,
                            {
                                validateTrigger: ['change', 'blur'],
                                rules: [
                                    {
                                        required: true,
                                        whitespace: false,
                                        message: 'Please input content type name',
                                    },
                                ],
                            },
                        ]"
                        placeholder="News"
                        style="width: 60%; margin-right: 8px"
                    />
                </a-form-item>
                <template v-for="(k, index) in form.getFieldValue('contentTypesForm')">
                    <a-form-item :key="'fn' + k" :label="index === 0 ? 'Field Type Name' : ''" :required="true">
                        <a-input
                            :data-cy="`fieldName${index}`"
                            v-decorator="[
                                `fieldsDatas[${k}].fieldName`,
                                {
                                    validateTrigger: ['change', 'blur'],
                                    rules: [
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: 'Please input field\'s name or delete this field.',
                                        },
                                    ],
                                },
                            ]"
                            placeholder="Field Name"
                            style="width: 60%; margin-right: 8px"
                        />
                        <a-icon
                            v-if="form.getFieldValue('contentTypesForm').length > 1"
                            class="dynamic-delete-button"
                            type="minus-circle-o"
                            :disabled="form.getFieldValue('contentTypesForm').length === 1"
                            @click="() => removeField(k)"
                        />
                    </a-form-item>
                    <a-form-item :key="'ft' + k" :label="index === 0 ? 'Field Type' : ''" :required="true">
                        <a-select
                            @select="setEnumOrRelationData($event, index)"
                            :data-cy="`fieldType${index}`"
                            v-decorator="[
                                `fieldsDatas[${k}].fieldType`,
                                {
                                    validateTrigger: ['change', 'blur'],
                                    rules: [
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: 'Please select field type or delete this field.',
                                        },
                                    ],
                                },
                            ]"
                            placeholder="Field Type"
                            style="width: 60%; margin-right: 8px"
                        >
                            <a-select-option
                                :key="contentType.value"
                                v-for="contentType in contentTypesLocalState"
                                :value="contentType.value"
                            >
                                {{ contentType.name }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>

                    <!-- <h1>{{ enumOrRelationList }}</h1> -->
                    <template v-if="enumOrRelationList[`type[${index}]`] === 'enum'">
                        <a-form-item :key="'fte' + k">
                            <a-textarea
                                :data-cy="`enum${index}`"
                                v-decorator="[
                                    `fieldsDatas[${k}].enumData`,
                                    {
                                        validateTrigger: ['change', 'blur'],
                                        rules: [
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: 'Please input at least one enum or delete this field.',
                                            },
                                        ],
                                    },
                                ]"
                                placeholder="Enter value per line"
                                :autoSize="false"
                            />
                        </a-form-item>
                    </template>
                    <template v-if="enumOrRelationList[`type[${index}]`] === 'relation'">
                        <a-form-item :key="'ftr' + k">
                            <a-select
                                v-decorator="[
                                    `fieldsDatas[${k}].relationContentTypeId`,
                                    {
                                        validateTrigger: ['change', 'blur'],
                                        rules: [
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: 'Please select a relation or delete this field.',
                                            },
                                        ],
                                    },
                                ]"
                                placeholder="Select a content type"
                                style="width: 60%; margin-right: 8px"
                                @select="fetchFields"
                            >
                                <a-select-option
                                    :value="contentType._id"
                                    :key="contentType._id"
                                    v-for="contentType in contentTypes"
                                >
                                    {{ contentType.name }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item :key="'ftrf' + k">
                            <a-select
                                v-decorator="[
                                    `fieldsDatas[${k}].relationFieldName`,
                                    {
                                        validateTrigger: ['change', 'blur'],
                                        rules: [
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: 'Please input passenger\'s name or delete this field.',
                                            },
                                        ],
                                    },
                                ]"
                                placeholder="Select content type's field"
                                style="width: 60%; margin-right: 8px"
                            >
                                <a-select-option v-for="field in selectedContentTypeFields" :key="field.fieldName">
                                    {{ field.fieldName }}</a-select-option
                                >
                            </a-select>
                        </a-form-item>
                    </template>
                </template>
                <a-form-item label="Spaces">
                    <a-select
                        mode="multiple"
                        v-decorator="[
                            `spaces`,
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Pleas select at least one space',
                                    },
                                ],
                            },
                        ]"
                        placeholder="Select Space"
                        style="width: 60%; margin-right: 8px"
                    >
                        <a-select-option v-for="space in spaces" :key="space._id">
                            {{ space.name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item>
                    <a-button type="dashed" @click="addField" icon="plus"> Add field </a-button>
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
import contentTypesConstant from '@/constants/contentTypes.js';
import { mapState, mapActions } from 'vuex';

let id = 0;
export default {
    components: { Box },

    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'contentTypeForm' });
        this.form.getFieldDecorator('contentTypesForm', { initialValue: [], preserve: true });
    },
    data() {
        return {
            enumOrRelationList: {},
            contentTypesLocalState: contentTypesConstant,
            selectedContentTypeFields: null,
        };
    },
    computed: {
        ...mapState('content', ['spaces', 'contentTypes']),
    },
    methods: {
        ...mapActions('content', ['addContentType']),
        removeField(k) {
            const { form } = this;
            const contentTypesValues = form.getFieldValue('contentTypesForm');
            if (contentTypesValues.length === 1) {
                return;
            }

            form.setFieldsValue({
                contentTypesForm: contentTypesValues.filter(key => key !== k),
            });
        },
        setEnumOrRelationData(val, i) {
            this.enumOrRelationList[`type[${i}]`] = val;
        },

        fetchFields(val) {
            this.selectedContentTypeFields = this.contentTypes.find(ct => ct._id === val)?.fieldsDatas ?? [];
        },

        addField() {
            const { form } = this;
            const contentTypesValues = form.getFieldValue('contentTypesForm');
            const nextcontentTypes = contentTypesValues.concat(id++);

            form.setFieldsValue({
                contentTypesForm: nextcontentTypes,
            });
        },

        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields(async (err, values) => {
                if (!err) {
                    values.fieldsDatas = values.fieldsDatas.map(x =>
                        x.fieldType === 'enum' ? { ...x, enumData: x.enumData.split('\n') } : x,
                    );

                    const spaces = values.spaces.map(spaceId => ({
                        _id: spaceId,
                    }));

                    const { contentTypeName, fieldsDatas } = values;

                    const payload = {
                        name: contentTypeName,
                        spaces,
                        fieldsDatas,
                    };

                    await this.addContentType(payload);
                }
            });
        },
    },
};
</script>
<style>
.dynamic-delete-button {
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all 0.3s;
}
.dynamic-delete-button:hover {
    color: #777;
}
.dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
}
</style>
