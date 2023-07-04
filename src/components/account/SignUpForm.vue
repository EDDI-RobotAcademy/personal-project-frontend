<template lang="">
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="auto">
          <v-card width="500">
            <v-card-text class="text-center px-12 py-16">
              <v-form @submit.prevent="createAccount">
                <h1>회원가입</h1>
                <v-text-field
                  text
                  v-model="email"
                  label="E-mail"
                  :rules="email_rule"
                  :disabled="false"
                  required
                >
                  <template v-slot:append>
                    <button @click="checkDuplicateEmail">E-mail<br />중복확인</button>
                  </template>
                </v-text-field>
                <v-text-field
                  type="password"
                  v-model="password"
                  label="비밀번호"
                  :disabled="false"
                  required
                />
                <v-text-field
                  type="password"
                  v-model="passwordCheck"
                  label="비밀번호 확인"
                  :disabled="false"
                  required
                />
                <v-btn text outlined rounded color="primary" style="margin: 4px" type="submit">
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
import { mapActions } from "vuex";
const accountModule = "accountModule"; //eslint-disable-line no-unused-vars

export default {
  data() {
    return {
      email: "",
      password: "",
      passwordCheck: "",
      emailPass: false,
      email_rule: [
        (v) => !!v || "이메일을 입력해주세요",
        (v) => {
          const replaceV = v.replace(/(\s*)/g, "");
          const pattern =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
          return pattern.test(replaceV) || "올바른 이메일 형식이 아닙니다";
        },
      ],
    };
  },
  methods: {
    ...mapActions("AccountModule", ["requestSpringToCheckEmailDuplication"]),
    onSubmit() {
      if (this.$refs.form.validate()) {
        const { email } = this;
        this.$emit("submit", { email });
        if (!this.emailPass) {
          alert("이메일 중복 확인을 해주세요!");
        } else {
          alert("올바른 정보를 입력하세요!");
        }
      }
    },
    async checkDuplicateEmail() {
      const emailValid = this.email.match(
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      this.emailPass = false;

      if (emailValid) {
        const { email } = this;
        console.log("before actions - email: " + email);
        this.emailPass = await this.requestSpringToCheckEmailDuplication(email);
        console.log("after actions - email: " + email);
      }
    },
    isFormValid() {
      const isEmailValid = this.emailPass;
      const isEmailRuleValid = this.email_rule[1](this.email) === true;
      return isEmailValid && isEmailRuleValid;
    },
    createAccount() {
      const { email, password } = this;
      this.$emit("submit", { email, password });
    },
  },
};
</script>

<style lang=""></style>
