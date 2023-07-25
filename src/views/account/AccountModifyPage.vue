<template lang="">
    <div>
        <br>
        <h2 style="text-align: center">Account Modify Page</h2>
        <account-modify-form align="center" v-if="account" :account="account" :accountId="accountId" @submit="onSubmit"/>
        <p v-else> 잠시만 기다려 주세요 </p>
    </div>
</template>
<script>

import AccountModifyForm from '@/components/account/AccountModifyForm.vue';
import { mapActions, mapState } from 'vuex';

const accountModule = 'accountModule'

export default {
    name: 'AccountModifyPage',
    components: { AccountModifyForm },
    props: {
        accountId: {
            type: [String, Number],
            required: true,
        }
    },
    computed: {
        ...mapState(accountModule, ['account'])
    },
    methods: {
        ...mapActions(
            accountModule, ['accountInfo', 'accountInfoModify']
        ),
        async onSubmit(payload) {
            const { email, password, accountName, accountBirth, accountPhone, accountAddress } = payload
            const accountId = this.accountId;
            await this.accountInfoModify({ accountId, email, password, accountName, accountName, accountBirth, accountPhone, accountAddress })
            await this.$router.push({ name: 'Mypage', params: { accountId: this.accountId } })
        }
    },
    created() {
        this.accountInfo(this.accountId)
    }
}

</script>
<style lang="">
    
</style>