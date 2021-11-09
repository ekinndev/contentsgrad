<template>
    <a-row align="middle" justify="center">
        <a-col :span="24">
            <a-form
                :model="form"
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 19 }"
                layout="vertical"
                class="loginForm"
            >
                <a-form-item label="Email">
                    <a-input v-model="form.email" placeholder="Email"></a-input>
                </a-form-item>
                <a-form-item label="Password">
                    <a-input v-model="form.password" type="password" placeholder="123456"></a-input>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 11 }">
                    <a-button type="primary" @click="handleSubmit">Log in</a-button>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>

<script>
export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
        };
    },
    methods: {
        handleSubmit() {
            this.$emit('login', this.form);
        },
    },
};
</script>

<style scoped lang="scss">
.loginForm {
    width: 800px;
}
</style>
