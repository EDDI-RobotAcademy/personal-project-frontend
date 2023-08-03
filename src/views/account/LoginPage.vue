<template>
  <div class="login-container">
    <LoginForm @submit="onSubmit" />
  </div>
</template>

<script>
import LoginForm from '@/components/account/LoginForm.vue';
import { mapState, mapActions } from 'vuex'; // mapState와 mapActions를 명시적으로 가져옵니다.

const accountModule = 'accountModule';

export default {
  components: {
    LoginForm,
  },
  computed: {
    ...mapState(accountModule, ['saveIdStatus']),
    ...mapState(accountModule, ['isAuthenticated']),
  },
  methods: {
    ...mapActions(accountModule, ['requestLoginAccountToSpring']), // mapActions도 사용하므로 함께 import 합니다.
    async onSubmit(payload) {
      const { userEmail, password } = payload;
      await this.requestLoginAccountToSpring({ userEmail, password });
    },
  },
};

</script>

<style lang="scss" scoped>
.login-container {
  min-width: 900px;
	margin: 100px 0;
}
</style>