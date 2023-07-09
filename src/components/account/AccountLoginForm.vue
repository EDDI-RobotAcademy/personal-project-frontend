<template lang="">
  <v-container>
    <v-card class="box" width="460">
      <v-card-text class="text-center px-12 py-16">
          <v-form @submit.prevent="accountLogin" ref="form">
              <div >
                  <v-text-field
                      v-model="email"
                      label="이메일"
                      required>
                  </v-text-field>
                  <v-text-field
                      v-model="password"
                      label="비밀번호"
                      type="password"
                      required>
                  </v-text-field>
              </div>
              <v-btn type="submit" block x-large rounded
                      color="teal lighten-1" class="mt-5"
                      style="color:white"
                      >로그인</v-btn>
          </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>


export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    accountLogin() {
      const { email, password } = this;
      this.$emit("submit", { email, password })
    }
  }
}
</script>
<style scoped>
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>