<template lang="">
  <nav>
    <v-app-bar color="dark" app dark>
      <v-app-bar-nav-icon @click="navigation_drawer = !navigation_drawer" />
      <v-btn @click="goToHome">
        <v-img class="mx-2" src="@/assets/logo.png" max-height="40" max-width="40" contain> </v-img>
        <v-toolbar-title class="text-uppercase text--darken-4">
          <span>PROJECT</span>
        </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="!isSignIn" text @click="signUp">
        <span>회원가입</span>
        <v-icon right>mdi-account-plus-outline</v-icon>
      </v-btn>
      <v-btn v-if="!isSignIn" text @click="signIn">
        <span>로그인</span>
        <v-icon right>mdi-login</v-icon>
      </v-btn>
      <v-btn v-if="isSignIn" text :to="{ name: 'ProductRegisterPage' }">
        <span>상품 등록</span>
      </v-btn>
      <v-btn v-if="isSignIn" text @click="signOut">
        <span>로그아웃</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="navigation_drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">사이드바</v-list-item-title>
          <v-list-item-subtitle>페이지 기능</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item v-for="(link, index) in links" :key="link.index" router :to="link.route">
          <v-list-item-action>
            <v-icon>
              {{ link.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { IS_SIGNIN } from "@/store/account/mutation-types";
import { mapState, mapMutations } from "vuex";
const accountModule = "accountModule";

export default {
  data() {
    return {
      navigation_drawer: false,
      links: [{ icon: "mdi-home", text: "Home", route: "/" }],
      userToken: 0,
    };
  },
  computed: {
    ...mapState(accountModule, ["isSignIn"]),
  },
  methods: {
    ...mapMutations(accountModule, ["IS_SIGNIN"]),
    signUp() {
      this.$router.push("/sign-up").catch(() => {});
    },
    signIn() {
      this.$router.push("/sign-in").catch(() => {});
    },
    signOut() {
      localStorage.removeItem("userToken");
      this[IS_SIGNIN](false);
      console.log(this[IS_SIGNIN]);
      this.$router.push("/").catch(() => {});
    },
    goToHome() {
      this.$router.push("/").catch(() => {});
    },
  },
  mounted() {
    this.userToken = localStorage.getItem("userToken");
    if (this.userToken == null) {
      this[IS_SIGNIN](false);
    } else {
      this[IS_SIGNIN](true);
    }
  },
};
</script>

<style lang=""></style>
