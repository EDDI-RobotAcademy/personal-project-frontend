<template>
    <div style="font-family: 'Caudex-Regular'; margin-top: 220px;">
        <v-row justify="center">
            <v-col cols="auto">
                <v-card width="400"
                    style="background-color: rgba(255, 255, 255, 0.8); border: 3px solid #000000; border-radius: 25px;">
                    <router-link to="/account-my-page">
                        <button class="back-button" style="margin-left: 15px; margin-top: 15px;">
                            <v-icon>mdi-arrow-left</v-icon>
                        </button>
                    </router-link>
                    <v-card-text class="text-center px-12 py-16">
                        <v-form ref="form">
                            <div style="margin-bottom: 30px; font-size: 38px; color: #000000;">회원 탈퇴
                                <v-divider style="margin-top: 16px; border: 2px solid #000000;"></v-divider>
                            </div>
                            <v-text-field v-model="password" label="비밀번호" type="password" required>
                            </v-text-field>
                            <v-btn @click="confirm" block x-large rounded color="gray lighten-1" class="mt-6"
                                style="border-radius: 5px;">
                                확인
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            password: '',
        }
    },
    methods: {
        async confirm() {
            if (confirm("탈퇴하시겠습니까?")) {
                this.withDraw();
            }
        },
        withDraw() {
            const password = this.password;
            this.$emit("submit", { password });
        },
    }
}
</script>

<style lang="">
    
</style>