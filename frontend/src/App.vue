<template>
    <div id="app">
        <layout>
            <router-view />
        </layout>
    </div>
</template>

<script>
import Layout from './components/Layout.vue';

export default {
    components: {
        Layout,
    },
};
</script>
