<template>
    <div class="contentTypes">{{ $route.params.id }}</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions('content', ['getContentsOfContentTypes']),
    },
    async mounted() {
        const id = this.$route.params.id;

        await this.getContentsOfContentTypes(id);
    },
    async beforeRouteUpdate(to, from, next) {
        const id = to.params.id;
        await this.getContentsOfContentTypes(id);
        next();
    },
};
</script>

<style></style>
