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
    ...mapActions(accountModule, ["requestRegisterAccountToSpring"]),
    async createAccount(payload) {
      const isSuccess = await this.requestRegisterAccountToSpring(payload);
      if (isSuccess) {
        this.$router.push("/sign-in");
      }
    },
  },
};
</script>

<style lang=""></style>
