<template>
  <div class="signup-container">
    <TermsForm @submitTerms="passSignupForm" v-if="!isCheckedTerms" />
    <SignupForm @submit="onSubmit" v-else />
  </div>
</template>

<script>
import TermsForm from '@/components/account/TermsForm.vue';
import SignupForm from '@/components/account/SignupForm.vue';
import { mapActions } from 'vuex';

const accountModule = 'accountModule'

export default {
  components: {
    TermsForm,
    SignupForm,
  },
  data() {
    return {
      isCheckedTerms: false,
    };
  },
  methods: {
    passSignupForm() {
      this.isCheckedTerms = true;
    },

    ...mapActions(accountModule, ['requestNormalRegisterAccountToSpring']),
    async onSubmit(payload) {
      const { email, userName, nickname, password, roleType } = payload
      await this.requestNormalRegisterAccountToSpring(
        { email, userName, nickname, password, roleType })
    }
  },
};

</script>

<style lang="scss" scoped>
@import '../scss/signupPage.scss';
</style>