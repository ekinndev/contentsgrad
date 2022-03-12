<template>
    <div class="Contents">
        <box
            title="Contents"
            @handler="handleButton"
            icon="plus"
            buttonText="Add a new content"
            showLanguageSelect
            @selectLanguageHandler="selectHandler"
        >
            <a-table :columns="tableColumns" :data-source="tableData">
                <span slot="customTitle">Name</span>

                <template v-slot:action="actionProps">
                    <a-space>
                        <a-button type="primary" @click="editContent(actionProps)" size="small">Edit</a-button>
                        <a-popconfirm
                            placement="top"
                            ok-text="Yes"
                            cancel-text="No"
                            @confirm="deleteContentHandler(actionProps)"
                        >
                            <template slot="title">
                                <p>Are you sure to delete this content?</p>
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
import { mapState, mapActions, mapMutations } from 'vuex';
import Box from '@/components/Box.vue';

export default {
    components: { Box },
    methods: {
        ...mapActions('content', ['getContentsOfContentTypes', 'deleteContent']),
        ...mapMutations('content', ['setCurrentContentLanguageId']),

        fetchData() {
            const id = this.$route.params.contentTypeId;

            this.getContentsOfContentTypes(id);
        },
        selectHandler(data) {
            this.setCurrentContentLanguageId(data);

            this.fetchData();
        },
        async deleteContentHandler({ id }) {
            const contentTypeName = this.$route.params.contentTypeName;

            await this.deleteContent({ id, contentTypeId: this.$route.params.contentTypeId, contentTypeName });
        },
        async editContent({ contentId }) {
            const contentTypeName = this.$route.params.contentTypeName;

            this.$router.push(`/${contentTypeName}/contents/${contentId}/edit`);
        },

        handleButton() {
            this.$router.push(`/contents/${this.$route.params.contentTypeId}/add`);
        },
    },
    computed: {
        ...mapState('content', ['contents']),
        tableColumns() {
            const columns = (this.contents?.[0]?.contentType?.fieldsDatas ?? []).slice(0, 4).map(item => {
                return {
                    title: item.fieldName,
                    dataIndex: item.fieldName,
                    key: item.fieldName,
                };
            });

            return [
                ...columns,
                {
                    title: 'Action',
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                },
            ];
        },
        tableData() {
            return (this.contents ?? []).map(({ data, _id, contentId }, i) => {
                return {
                    id: _id,
                    key: i,
                    contentId: contentId,
                    ...data,
                };
            });
        },
    },

    created() {
        this.fetchData();
    },

    watch: {
        $route: 'fetchData',
    },
};
</script>

<style lang="scss" scoped></style>
