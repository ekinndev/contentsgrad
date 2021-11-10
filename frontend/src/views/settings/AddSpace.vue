<template>
    <div class="spaces">
        <box title="Add a space">
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="onSubmit">
                <a-form-item label="Space name">
                    <a-input
                        v-decorator="[
                            'name',
                            { rules: [{ required: true, message: 'Please input your space name!' }] },
                        ]"
                    />
                </a-form-item>

                <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                    <a-button type="primary" html-type="submit"> Submit </a-button>
                </a-form-item>
            </a-form>
        </box>
    </div>
</template>

<script>
import Box from '@/components/Box.vue';
import { mapActions } from 'vuex';

export default {
    components: { Box },
    methods: {
        ...mapActions('content', ['addSpace']),
        async onSubmit(e) {
            e.preventDefault();

            this.form.validateFields(async (err, values) => {
                if (err) return;

                await this.addSpace(values);
            });
        },
    },
    data() {
        return {
            formLayout: 'horizontal',
            form: this.$form.createForm(this, { name: 'coordinated' }),
        };
    },
};
</script>

<style lang="scss" scoped></style>
