<template>
    <div class="languages">
        <box title="Languages" @handler="handleButton" icon="plus" buttonText="Add a new language">
            <a-table :columns="columns" :data-source="tableData">
                <span slot="customTitle">Name</span>
                <span slot="customCode">Code</span>

                <template v-slot:action="actionProps">
                    <a-space>
                        <a-popconfirm
                            placement="top"
                            ok-text="Yes"
                            cancel-text="No"
                            @confirm="deleteLanguageHandler(actionProps)"
                        >
                            <template slot="title">
                                <p>Are you sure to delete this space?</p>
                            </template>
                            <a-button type="danger" size="small">Delete</a-button>
                        </a-popconfirm>
                    </a-space>
                </template>
            </a-table>
        </box>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Box from '@/components/Box.vue';

const columns = [
    {
        dataIndex: 'name',
        key: 'name',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'name' },
    },
    {
        dataIndex: 'code',
        key: 'code',
        slots: { title: 'customCode' },
        scopedSlots: { customRender: 'code' },
    },

    {
        title: 'Action',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

export default {
    components: { Box },
    methods: {
        ...mapActions('content', ['deleteLanguage']),

        async deleteLanguageHandler({ id }) {
            await this.deleteLanguage(id);
        },

        handleButton() {
            this.$router.push('/settings/languages/add');
        },
    },
    computed: {
        ...mapState('content', ['languages']),
        tableData() {
            return this.languages?.map(item => {
                return {
                    key: item._id,
                    id: item._id,
                    code: item.code,
                    name: item.name.slice(0, 1).toUpperCase() + item.name.slice(1),
                };
            });
        },
    },
    data() {
        return {
            columns,
        };
    },
};
</script>

<style lang="scss" scoped></style>
