<template>
    <div class="contentTypes">
        <box title="Content Types" @handler="handleButton" icon="plus" buttonText="Add a new content type">
            <a-table :columns="columns" :data-source="tableData">
                <span slot="customTitle">Name</span>
                <template v-slot:spaces="spacesProps">
                    <a-tag v-for="space in spacesProps" :key="space">
                        {{ space.toUpperCase() }}
                    </a-tag>
                </template>
                <template v-slot:action="actionProps">
                    <a-space>
                        <a-button type="primary" @click="editContentType(actionProps)" size="small">Edit</a-button>
                        <a-popconfirm
                            placement="top"
                            ok-text="Yes"
                            cancel-text="No"
                            @confirm="deleteContentType(actionProps)"
                        >
                            <template slot="title">
                                <p>Are you sure to delete this content type?</p>
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
import { mapState } from 'vuex';
import Box from '@/components/Box.vue';

const columns = [
    {
        dataIndex: 'name',
        key: 'name',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'name' },
    },

    {
        title: 'Spaces',
        key: 'spaces',
        dataIndex: 'spaces',
        scopedSlots: { customRender: 'spaces' },
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
        deleteContentType({ id }) {
            console.log(id);
        },
        editContentType({ id }) {
            console.log(id);
        },
        handleButton() {
            this.$router.push('/settings/content-types/add');
        },
    },
    computed: {
        ...mapState('content', ['contentTypes']),
        tableData() {
            return this.contentTypes?.map(item => {
                return {
                    key: item._id,
                    id: item._id,
                    name: item.name.slice(0, 1).toUpperCase() + item.name.slice(1),
                    spaces: [...item.spaces.map(space => space.name)],
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
