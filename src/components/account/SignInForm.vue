<template lang="">
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="auto">
          <v-card width="500">
            <v-card-text class="text-center px-16 py-16">
              <v-form @submit.prevent="signIn" ref="form">
                <h1>로그인</h1>
                <v-text-field text v-model="email" label="E-mail" required />
                <v-text-field type="password" v-model="password" label="비밀번호" required />
                <v-btn text outlined rounded color="primary" style="margin: 4px" type="submit">
                  로그인
                </v-btn>
                <v-btn
                  text
                  outlined
                  rounded
                  color="primary"
                  style="margin: 4px"
                  :to="{ name: 'SignUpPage' }"
                >
                  회원가입
                </v-btn>
                <v-btn
                  text
                  outlined
                  rounded
                  color="primary"
                  style="margin: 4px"
                  :to="{ name: 'home' }"
                >
                  취소
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signIn() {
      const { email, password } = this;
      this.$emit("submit", { email, password });
    },
  },
};
</script>

<style lang=""></style>
