<template lang="">
  <div>
    <sign-up-form @submit="createAccount"></sign-up-form>
  </div>
</template>

<script>
import SignUpForm from "@/components/account/SignUpForm.vue";
import { mapActions } from "vuex";

const accountModule = "accountModule";

export default {
  components: {
    SignUpForm,
  },
  methods: {
    ...mapActions(accountModule, ["requestCheckCreateAccountToSpring"]),
    async createAccount(payload) {
      const isSuccess = await this.requestCheckCreateAccountToSpring(payload);
      if (isSuccess) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang=""></style>
