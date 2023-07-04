<template lang="">
    <nav>
        <v-app-bar color="#9370DB" app dark>
            <v-btn text @click="goToHome">
                <v-icon>Room Story</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="goToShop">
                <span>지도</span>
            </v-btn>
            <v-btn text @click="goToShop">
                <span>관심목록</span>
            </v-btn>
            <v-btn text @click="goToShop">
                <span>매물 등록</span>
            </v-btn>
            <v-btn v-if="!isLogin" text @click="signIn">
                <span>로그인</span>
                <v-icon right>mdi-login</v-icon>
            </v-btn>
            <v-btn v-if="!isLogin" text @click="signUp">
                <span>회원가입</span>
                <v-icon right>mdi-account-plus-outline</v-icon>
            </v-btn>
            <!-- <v-btn v-if="isLogin" text @click="signOut">
                <span>로그아웃</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn> -->
            <v-btn v-if="isLogin" text @click="myPage">
                <span>마이페이지</span>
                <v-icon right>mdi-cards-heart-outline</v-icon>
            </v-btn>
        </v-app-bar>
    </nav>
</template>

<script>
import router from '@/router'

export default {
  data() {
    return {
      userToken: 0,
      isLogin: false,
    }
  },
  methods: {
    signUp() {
      router.push('/signup')
        .catch(() => { })
    },
    signIn() {
      router.push('/account-login')
        .catch(() => { })
      this.userToken = localStorage.getItem("userToken")
      if (this.userToken != null) {
        this.isLogin = true
      }
    },
    signOut() {
      localStorage.removeItem("userToken")
      this.isLogin = false
    },
    goToShop() {
      router.push('/productListPage')
        .catch(() => { })
    },
    goToHome() {
      router.push('/')
        .catch(() => { })
    },
    myPage() {
      router.push('/myPage')
        .catch(() => { })
    }
  },
  mounted() {
    this.userToken = localStorage.getItem("userToken")
    if (this.userToken != null) {
      this.isLogin = true
    }
  }
}
</script>

<style scoped></style>