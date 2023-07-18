<template>
  <div class="login-container">
    <LoginForm @submit="onSubmit" />
  </div>
</template>

<script>
import LoginForm from '@/components/account/LoginForm.vue'
import { mapActions } from 'vuex';

const accountModule = 'accountModule'


export default {
  components: {
    LoginForm,
  },

  methods: {
    ...mapActions(accountModule, ['requestLoginAccountToSpring']),
    async onSubmit(payload) {
      const { userEmail, password } = payload
      await this.requestLoginAccountToSpring({ userEmail, password })
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  min-width: 900px;
	margin: 100px 0;
}
</style>