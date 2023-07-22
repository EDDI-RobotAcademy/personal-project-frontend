<template>
  <v-app-bar app color="white" flat class="custom-app-bar">
    <v-container class="fill-height" fluid>
      <v-row align="center" no-gutters>
        <v-col>
          <v-avatar class="mr-5" color="black" size="50"></v-avatar>
          <router-link to="/">
            <v-btn class="black--text custom-btn" :style="{ fontSize: '20px' }" text>
              Home
            </v-btn>
          </router-link>
        </v-col>
        <v-col>
          <v-spacer></v-spacer>
        </v-col>
        <v-col></v-col>
        <v-col>
          <v-row align="center" no-gutters>
            <v-col cols="auto">
              <router-link to="/account-login-page">
                <v-btn v-if="!isLogin" :style="{ fontSize: '17px' }" color="black" class="white--text">로그인
                </v-btn>
              </router-link>
              <router-link to="/account-register-page">
                <v-btn v-if="!isLogin" :style="{ fontSize: '20px' }" color="black" class="white--text ml-2">회원가입
                </v-btn>
              </router-link>
              <router-link to="/playlist-register-page">
                <v-btn v-if="isLogin" :style="{ fontSize: '17px' }" color="black" class="white--text mr-2">플레이리스트 등록
                </v-btn>
              </router-link>
              <v-btn v-if="isLogin" :style="{ fontSize: '17px' }" color="black" class="white--text mr-2"
                @click="accountLogout">로그아웃
              </v-btn>
              <router-link to="/account-my-page">
                <v-btn v-if="isLogin" :style="{ fontSize: '20px' }" color="black" class="white--text">마이페이지
                </v-btn>
              </router-link>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
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
  },
};
</script>

<style>
.custom-app-bar {
  height: 130px !important;
  padding-top: 25px !important;
  padding-bottom: 5px !important;
}

.fill-height {
  height: 100%;
}

.v-application {
  height: 100%;
}

.v-window-item,
.v-main__wrap {
  height: calc(100% - 130px) !important;
}

.v-btn .v-btn__content {
  font-size: 15px !important;
}

.custom-btn {
  font-size: 20px !important;
}
</style>