<template lang="">
</template>

<script>
import { mapActions } from 'vuex';
import router from '@/router';

const accountModule = 'accountModule'

export default {
    methods: {
        ...mapActions(accountModule, ['getAccessTokenFromSpringRedirection']),
        async setRedirectData () {
            const code = this.$route.query.code
            await this.getAccessTokenFromSpringRedirection({ code })
            router.push('/')
        }
    },
    created () {
        this.setRedirectData()
    }
}
</script>

<style lang="">
    
</style>