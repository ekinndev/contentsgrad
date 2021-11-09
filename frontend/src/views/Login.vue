<template>
    <div class="login">
        <login-form @login="submit" />
    </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm';
import { mapActions, mapState } from 'vuex';

export default {
    name: 'LoginPage',
    components: {
        LoginForm,
    },
    computed: {
        ...mapState('account', ['user']),
    },
    methods: {
        ...mapActions('account', ['login']),
        async submit(values) {
            await this.login(values);
            this.$router.push('/');
        },
    },
};
</script>
