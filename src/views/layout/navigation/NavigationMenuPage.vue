<template>
  <v-app-bar app color="black" flat>
    <v-container class="py-0 fill-height">
      <v-avatar class="mr-10" color="white" size="50"></v-avatar>

      <v-btn class="white--text" text @click="goHome">
        Home
      </v-btn>

      <v-spacer></v-spacer>

      <v-responsive max-width="260">
        <router-link to="account-login-page">
          <v-btn v-if="!isLogin" color="white" text>로그인
          </v-btn>
        </router-link>
        <router-link to="account-register-page">
          <v-btn v-if="!isLogin" color="white" text>회원가입
          </v-btn>
        </router-link>
        <v-btn v-if="isLogin" color="white" text @click="accountLogout">로그아웃
        </v-btn>
        <router-link to="account-my-page">
          <v-btn v-if="isLogin" color="white" text>마이페이지
          </v-btn>
        </router-link>
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex';
const accountModule = 'accountModule'

export default {
  name: 'App',

  data: () => ({
    isLogin: localStorage.getItem("isLogin"),
    links: [
      'Home',
      '나',
      '다',
      '라',
    ],
  }),
  methods: {
    ...mapActions(accountModule, ["requestLogoutToSpring"]),

    async accountLogout() {
      await this.requestLogoutToSpring()
      localStorage.removeItem('isLogin')
      await this.$router.push({ name: 'home' })
        .catch(
          location.reload()
        )
    },
    goHome() {
      this.$router.push({ name: 'home' })
        .catch(
          location.reload()
        )
    },
  },
};
</script>
