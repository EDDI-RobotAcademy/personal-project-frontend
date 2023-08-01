<template lang="">
    <div>
        <v-container>
            <table>
                <tr>
                    <td style="padding-right: 20px;"><h3>이메일(ID)</h3><td>
                    <td>
                        <v-card style="width:300px; height:65px">
                            <v-card-title>{{ account.email }}</v-card-title>
                        </v-card>
                    </td>
                </tr>
                <tr>
                    <td style="padding-right: 20px;"><h3>비밀번호</h3><td>
                    <td>
                        <v-card style="width:200px; height:65px">
                            <v-card-text>{{ account.password }}</v-card-text>
                        </v-card>
                    </td>
                </tr>
                <tr>
                    <td style="padding-right: 20px;"><h3>이름</h3><td>
                    <td>
                        <v-card style="width:200px; height:65px">
                            <v-card-title>{{ account.accountName }}</v-card-title>
                        </v-card>
                    </td>
                </tr>
                <tr>
                    <td style="padding-right: 20px;"><h3>생년월일</h3><td>
                    <td>
                        <v-card style="width:200px; height:65px">
                            <v-card-title>{{ account.accountBirth }}</v-card-title>
                        </v-card>
                    </td>
                </tr>
                <tr>
                    <td style="padding-right: 20px;"><h3>휴대폰 번호</h3><td>
                    <td>
                        <v-card style="width:200px; height:65px">
                            <v-card-title>{{ account.accountPhone }}</v-card-title>
                        </v-card>
                    </td>
                </tr>
                <tr>
                    <td style="padding-right: 20px;"><h3>주소</h3><td>
                    <td>
                        <v-card style="width:500px; height:65px">
                            <v-card-title>{{ account.accountAddress }}</v-card-title>
                        </v-card>
                    </td>
                </tr>
            </table>
            <br>
                <router-link :to="{ name: 'AccountModifyPage', params: { accountId:accountId }}">
                <v-btn class="accountButton" style="float:right;">수정</v-btn>
                </router-link>
                <v-btn class="accountButton"  @click="goBack">돌아가기</v-btn> 
        </v-container>

    </div>
</template>
<script>
export default {
    name: "MypageForm",
    props: {
        account: {
            type: Object,
            required: true,
        },
        accountId: {
            type: [String, Number],
            required: true,
        },
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
    },

}
</script>
<style scoped>
.td {
    padding-right: 30px;
    margin-right: 50px;
}

.accountButton {
    background-color: black !important;
    color: white;
}
</style>