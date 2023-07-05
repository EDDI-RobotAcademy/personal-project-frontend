<template lang="">
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="auto">
          <v-card width="500">
            <v-card-text class="text-center px-16 py-16">
              <v-form @submit.prevent="createAccount" ref="form">
                <h1>회원가입</h1>
                <v-text-field
                  text
                  v-model="email"
                  label="E-mail"
                  :rules="email_rule"
                  :disabled="emailPass"
                  required
                >
                  <template v-slot:append>
                    <v-btn
                      style="margin: 4px"
                      @click="checkDuplicateEmail"
                      :disabled="emailPass || !isEmailValid"
                    >
                      E-mail<br />중복확인
                    </v-btn>
                  </template>
                </v-text-field>
                <v-text-field
                  type="password"
                  v-model="password"
                  label="비밀번호"
                  :rules="password_rule"
                  :disabled="false"
                  required
                />
                <v-text-field
                  type="password"
                  v-model="passwordCheck"
                  label="비밀번호 확인"
                  :rules="password_confirm_rule"
                  :disabled="false"
                  required
                />
                <v-btn
                  text
                  outlined
                  rounded
                  color="primary"
                  style="margin: 4px"
                  type="submit"
                  :disabled="!emailPass || !isPasswordVaild"
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
      password_rule: [
        (v) => !!v || "비밀번호를 입력해주세요",
        (v) => {
          const replaceV = v.replace(/(\s*)/g, "");
          const pattern = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
          return pattern.test(replaceV) || "숫자, 영문자, 특수문자를 포함해야합니다";
        },
      ],
      password_confirm_rule: [
        (v) => !!v || "비밀번호를 한번 더 입력해주세요",
        (v) => {
          const originalPassword = this.password;
          return v === originalPassword || "비밀번호가 일치하지 않습니다";
        },
      ],
    };
  },
  methods: {
    ...mapActions("accountModule", ["requestSpringToCheckEmailDuplication"]),
    async checkDuplicateEmail() {
      const emailValid = this.email.match(
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      this.emailPass = false;

      if (emailValid) {
        const { email } = this;
        // console.log("before actions - email: " + this.email);
        this.emailPass = await this.requestSpringToCheckEmailDuplication({ email });
        // console.log("after actions - email: " + this.email);
      }
    },
    createAccount() {
      if (this.$refs.form.validate()) {
        const { email, password } = this;
        this.$emit("submit", { email, password });
      }
    },
  },
  computed: {
    isEmailValid() {
      return this.email_rule[1](this.email) === true;
    },
    isPasswordVaild() {
      if (!this.password_rule[0] || !this.password_confirm_rule[0]) {
        return false;
      }
      return this.password === this.passwordCheck;
    },
  },
};
</script>

<style lang=""></style>
