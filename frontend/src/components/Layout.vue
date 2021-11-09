<template>
    <a-layout class="layoutMinHeight">
        <a-layout-sider theme="light" v-model="collapsed" collapsible v-if="getMenuItems.length > 0">
            <a-menu :default-selected-keys="['1']" mode="inline">
                <a-menu-item v-for="menuItem in getMenuItems" :key="menuItem.key">
                    <router-link v-if="menuItem.path" :to="menuItem.path" exact>
                        <a-icon :type="menuItem.icon" /><span>
                            {{ convertToCapitalize(menuItem.title) }}
                        </span>
                    </router-link>
                    <a-button class="paddingZero" type="link " v-else @click="menuItem.func" :icon="menuItem.icon">
                        {{ convertToCapitalize(menuItem.title) }}
                    </a-button>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-content class="layoutContent">
                <a-row type="flex" justify="center" align="middle">
                    <a-col :span="24">
                        <slot />
                    </a-col>
                </a-row>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Layout',

    data() {
        return {
            collapsed: false,
        };
    },
    methods: {
        ...mapActions('account', ['logout']),
        convertToCapitalize(val) {
            return val.slice(0, 1).toUpperCase() + val.slice(1);
        },
    },
    computed: {
        ...mapState('content', ['contentTypes']),
        getMenuItems() {
            if (this.contentTypes?.length > 0) {
                return [
                    {
                        key: '1',
                        icon: 'home',
                        title: 'Home',
                        path: '/',
                    },
                    ...this.contentTypes.map(contentType => ({
                        key: contentType._id,
                        title: contentType.name,
                        icon: 'file-text',
                        path: `/content-types/${contentType._id}`,
                    })),
                    {
                        key: '2',
                        icon: 'logout',
                        title: 'Log out',
                        path: null,
                        func: async () => {
                            await this.logout();
                            this.$router.replace('/login');
                        },
                    },
                    { key: '3', icon: 'setting', title: 'Content Types', path: '/settings/content-types' },
                ];
            }
            return [];
        },
    },
};
</script>
<style lang="scss" scoped>
.layoutContent {
    margin: 0 16px;
}
.layoutMinHeight {
    min-height: 100vh;
}

.paddingZero {
    padding: 0;
}
</style>
