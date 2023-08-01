<template lang="">
    <div align="center">
        <!-- <v-btn outlined color="cyan"  @click="readyToAccountList">회원 목록 보기</v-btn>
            <div v-if="isPressedButton"> -->
                <br>
        <v-container>
            <v-data-table :headers="accountHeaders" :items="accounts">
                <template #item.email="{ item }">
                    <a :href="'mailto:' + item.email">{{ item.email }}</a>
                </template>

                <template #item.accountDelete="{ item }">
                    
                    <v-btn outlined color="red" @click="onDelete(account.email)">삭제</v-btn>
                    
                </template>
            </v-data-table>
        </v-container>
        <v-btn outlined color="black" to="/">홈으로</v-btn>
    </div>
</template>
<script>

import { mapActions, mapState } from 'vuex'
const accountModule = 'accountModule'

export default {
    data() {
        return {
            accountHeaders: [
                { text: 'ID', value: 'accountId' },
                { text: 'E-MAIL', value: 'email' },
                { text: 'PASSWORD', value: 'password', sortable: false },
                { text: '이름', value: 'accountName' },
                { text: '생년월일', value: 'accountBirth' },
                { text: 'PHONE', value: 'accountPhone', sortable: false },
                { text: 'ADDRESS', value: 'accountAddress' },
                { text: "userType", value: 'userType' },
                { text: 'DELETE', value: 'accountDelete' }
            ]
            // isPressedButton: false,
        }
    },
    props: {
        accounts: {
            type: Array
        }
    },
    computed: {
        ...mapState(accountModule, ['account'])
    },

    methods: {
        ...mapActions(accountModule, ['requestDelete']),
        // readyToAccountList() {
        //     this.isPressedButton = true
        //     alert("계정 목록을 보여드릴게요.")
        // },
        async onDelete(email) {

            await this.requestDelete(email)
        }
    },
}
</script>
<style scoped>
table {
    border-collapse: separate;
    border-spacing: 0 10px;
}

td {
    padding: 0 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid lightgray;
}
</style>