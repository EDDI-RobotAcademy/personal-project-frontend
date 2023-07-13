<template lang="">
    <div>
        <br>
        <v-form @submit.prevent="onSubmit" ref="form">
            <table>
                <tr>
                    <td class="icon">
                        <svg-icon type="mdi" :path="path1"/>
                    </td>
                    <td>
                        <v-text-field v-model="email" label="이메일 입력"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <svg-icon type="mdi" :path="path2"/>
                    </td>
                    <td>
                        <v-text-field v-model="password" label="비밀번호 입력" type="password"/>
                    </td>
                </tr>   
            </table>
            <div>    
                <v-btn outlined color="black" type ="submit">로그인</v-btn>
                <br><br>
                <v-btn outlined color="green" to="/">돌아가기</v-btn>
            </div>
        </v-form>
        
    </div>
</template>
<script>

import { mapActions } from 'vuex';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiIdentifier, mdiLockOutline } from '@mdi/js';

export default {
    name: "LoginForm",
    components: {
        SvgIcon
    },
    data() {
        return {
            email: '',
            password: '',
            path1: mdiIdentifier,
            path2: mdiLockOutline,
        }
    },
    methods: {
        ...mapActions('accountModule', ['accountLogin']),
        onSubmit() {
            if (this.$refs.form.validate()) {
                const { email, password } = this
                this.$emit('submit', { email, password });
            } else {
                alert('에러 발생')
            }

        }
    },

}
</script>
<style scoped>
.icon {
    padding-right: 20px;
}
</style>