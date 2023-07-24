<template lang="">
        <div>
            <h2 style="text-align:center">My Page</h2>
            <br>
            <mypage-form align="center" v-if="account" :account="account" :accountId="accountId"/>
            <p v-else> 잠시만 기다려 주세요 </p>
        </div>
    </template>
<script>

import MypageForm from '@/components/account/MypageForm.vue';
import { mapActions, mapState } from 'vuex';

const accountModule = 'accountModule'

export default {
    name: 'Mypage',
    components: { MypageForm },
    props: {
        accountId: {
            type: [String, Number],
            required: true,
        },
    },
    computed: {
        ...mapState(accountModule, ['account'])
    },
    methods: {
        ...mapActions(
            accountModule, ['accountInfo']
        ),
    },
    created() {
        this.accountInfo(this.accountId).then((response) => {
            console.log(response);

        })

    }

}
</script>
<style lang="">
        
    </style>