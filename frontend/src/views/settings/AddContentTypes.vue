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
                <template v-for="(k, index) in form.getFieldValue('contentTypes')">
                    <a-form-item :key="'fn' + k" :label="index === 0 ? 'Field Type Name' : ''" :required="true">
                        <a-input
                            v-decorator="[
                                `fieldsDatas[${k}].fieldName`,
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
                            placeholder="Field Name"
                            style="width: 60%; margin-right: 8px"
                        />
                        <a-icon
                            v-if="form.getFieldValue('contentTypes').length > 1"
                            class="dynamic-delete-button"
                            type="minus-circle-o"
                            :disabled="form.getFieldValue('contentTypes').length === 1"
                            @click="() => remove(k)"
                        />
                    </a-form-item>
                    <a-form-item :key="'ft' + k" :label="index === 0 ? 'Field Type' : ''" :required="true">
                        <a-select
                            @select="test($event, index)"
                            v-decorator="[
                                `fieldsDatas[${k}].fieldType`,
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
                            placeholder="Field Type"
                            style="width: 60%; margin-right: 8px"
                        >
                            <a-select-option
                                :key="contentType.value"
                                v-for="contentType in contentTypes"
                                :value="contentType.value"
                            >
                                {{ contentType.name }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>

                    <!-- <h1>{{ enumRelationOrObjectList }}</h1> -->
                    <template v-if="enumRelationOrObjectList[`type[${index}]`] === 'enum'">
                        <a-form-item :key="'fte' + k">
                            <a-textarea
                                v-decorator="[
                                    `fieldsDatas[${k}].enumData`,
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
                                placeholder="Enter value per line"
                                :autoSize="false"
                            />
                        </a-form-item>
                    </template>
                    <template v-if="enumRelationOrObjectList[`type[${index}]`] === 'relation'">
                        <a-form-item :key="'ftr' + k">
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
                                placeholder="Field Type"
                                style="width: 60%; margin-right: 8px"
                            >
                                <a-select-option value="relation"> relation </a-select-option>
                                <a-select-option value="string"> string </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item :key="'ftrf' + k">
                            <a-select
                                v-decorator="[
                                    `fieldsDatas[${k}].relationContentTypeId`,
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
                                placeholder="Field Type"
                                style="width: 60%; margin-right: 8px"
                            >
                                <a-select-option value="relation"> relation </a-select-option>
                                <a-select-option value="string"> string </a-select-option>
                            </a-select>
                        </a-form-item>
                    </template>
                </template>

                <a-form-item>
                    <a-button type="dashed" @click="add" icon="plus"> Add field </a-button>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit"> Submit </a-button>
                </a-form-item>
            </a-form>
        </box>
    </div>
</template>

<script>
// import { mapState } from 'vuex';
import Box from '@/components/Box.vue';
import contentTypes from '@/constants/contentTypes.js';

let id = 0;
export default {
    components: { Box },

    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'contentTypeForm' });
        this.form.getFieldDecorator('contentTypes', { initialValue: [], preserve: true });
    },
    data() {
        return {
            enumRelationOrObjectList: {},
            contentTypes: contentTypes,
        };
    },
    methods: {
        remove(k) {
            const { form } = this;
            // can use data-binding to get
            const contentTypes = form.getFieldValue('contentTypes');
            // We need at least one passenger
            if (contentTypes.length === 1) {
                return;
            }

            // can use data-binding to set
            form.setFieldsValue({
                contentTypes: contentTypes.filter(key => key !== k),
            });
        },
        test(val, i) {
            this.enumRelationOrObjectList[`type[${i}]`] = val;
        },

        add() {
            const { form } = this;
            const contentTypes = form.getFieldValue('contentTypes');
            const nextcontentTypes = contentTypes.concat(id++);

            form.setFieldsValue({
                contentTypes: nextcontentTypes,
            });
        },

        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    values.fieldsDatas = values.fieldsDatas.map(x =>
                        x.fieldType === 'enum' ? { ...x, enumData: x.enumData.split('\n') } : x,
                    );

                    console.log(values);
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
