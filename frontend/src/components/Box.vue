<template>
    <div class="box">
        <h3>{{ title }}</h3>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'ContentsGrad',
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
</style>
