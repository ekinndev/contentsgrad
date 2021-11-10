<template>
    <div class="spaces">
        <box title="Spaces" @handler="handleButton" icon="plus" buttonText="Add a new space">
            <a-table :columns="columns" :data-source="tableData">
                <span slot="customTitle">Name</span>

                <template v-slot:action="actionProps">
                    <a-space>
                        <a-popconfirm
                            placement="top"
                            ok-text="Yes"
                            cancel-text="No"
                            @confirm="deleteSpaceHandler(actionProps)"
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
        title: 'Action',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

export default {
    components: { Box },
    methods: {
        ...mapActions('content', ['deleteSpace']),

        async deleteSpaceHandler({ id }) {
            await this.deleteSpace(id);
        },

        handleButton() {
            this.$router.push('/settings/spaces/add');
        },
    },
    computed: {
        ...mapState('content', ['spaces']),
        tableData() {
            return this.spaces?.map(item => {
                return {
                    key: item._id,
                    id: item._id,
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
