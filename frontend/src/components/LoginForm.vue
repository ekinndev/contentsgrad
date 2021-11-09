<template>
    <a-row type="flex" justify="center">
        <a-col :span="12">
            <box title="Login into ContentsGrad">
                <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" @submit="handleSubmit">
                    <a-form-item label="Email">
                        <a-input
                            v-decorator="[
                                'email',
                                { rules: [{ required: true, message: 'Please input your email!' }] },
                            ]"
                            placeholder="Email"
                        ></a-input>
                    </a-form-item>
                    <a-form-item label="Password">
                        <a-input
                            v-decorator="[
                                'password',
                                {
                                    rules: [
                                        { required: true, message: 'Please enter your password!' },
                                        { min: 6, message: 'Please enter a valid password!' },
                                    ],
                                },
                            ]"
                            type="password"
                            placeholder="123456"
                        ></a-input>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 12, offset: 4 }">
                        <a-button type="primary" htmlType="submit" @click="handleSubmit">Log in</a-button>
                    </a-form-item>
                </a-form>
            </box>
        </a-col>
    </a-row>
</template>

<script>
import Box from '@/components/Box';
export default {
    components: {
        Box,
    },
    data() {
        return {
            form: this.$form.createForm(this, { name: 'login' }),
        };
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();

            this.form.validateFields((err, values) => {
                if (!err) {
                    this.$emit('login', values);
                }
            });
        },
    },
};
</script>
