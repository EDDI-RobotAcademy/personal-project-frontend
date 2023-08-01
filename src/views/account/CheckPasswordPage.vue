<template lang="">
    <div align="center">
        <br>
        <h2 align="center">Check Password Page</h2>
        <br>
            <v-form @submit.prevent="onSubmit" ref="form">
                <table>
                    <tr align="center">
                        <td>
                            <svg-icon type="mdi" :path="path2"/>
                        </td>
                        <td>
                            <v-text-field v-model="password" label="비밀번호 입력" type="password"/>
                        </td>
                        <v-btn outlined color="black" type ="submit">확인</v-btn>
                    </tr>
                    <br>
                        <v-btn outlined color="green" to="/">돌아가기</v-btn>
                </table>
            </v-form>
    </div>
</template>
<script>

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLockOutline } from '@mdi/js';
import { mapActions } from "vuex";

const accountModule = 'accountModule'

export default {
    name: "CheckPasswordPage",
    components: {
        SvgIcon
    },
    data() {
        return {
            password: '',
            path2: mdiLockOutline,
        }
    },
    methods: {
        ...mapActions(
            accountModule, ['CheckPassword']
        ),
        onSubmit() {
            if (this.$refs.form.validate()) {
                const { password } = this
                this.CheckPassword({ password });
            } else {
                alert('비밀번호가 다릅니다.')
            }
        },
    },




}
</script>
<style scoped>
.icon {
    padding-right: 20px;
}
</style>