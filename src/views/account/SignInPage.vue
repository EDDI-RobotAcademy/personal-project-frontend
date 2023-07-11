<template lang="">
  <div>
    <sign-in-form @submit="signIn"></sign-in-form>
  </div>
</template>

<script>
import SignInForm from "@/components/account/SignInForm.vue";
import { mapActions } from "vuex";

const accountModule = "accountModule";

export default {
  components: {
    SignInForm,
  },
  methods: {
    ...mapActions(accountModule, ["requestSpringToSignIn"]),
    async signIn(payload) {
      try {
        const email = await this.requestSpringToSignIn(payload);
        if (email) {
          console.log("로그인 성공: " + email);
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang=""></style>
