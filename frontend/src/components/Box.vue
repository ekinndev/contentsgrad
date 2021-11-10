<template>
    <div class="box">
        <a-row type="flex" justify="space-between">
            <a-col flex="200px">
                <h3>{{ title }}</h3>
            </a-col>
            <a-col v-if="buttonText">
                <a-button :icon="icon" @click="handler">{{ buttonText }}</a-button>
            </a-col>
        </a-row>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'ContentsGrad',
        },
        icon: {
            type: String,
            default: '',
        },
        buttonText: {
            type: String,
            default: '',
        },
    },
    methods: {
        handler() {
            this.$emit('handler');
        },
    },
};
</script>

<style scoped lang="scss">
.box {
    margin-top: 3rem;
    background: #fff;
    padding: 3rem;
}
.content {
    margin-top: 1rem;
}
</style>
