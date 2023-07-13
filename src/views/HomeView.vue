<template>
  <v-container>
    <nav>
      <router-link class="complete" to="/account-regist-page">회원 계정 등록</router-link> |
      <router-link to="/account-find-password-page">비밀번호 찾기 page</router-link> |
      <router-link to="/login-page">로그인 page</router-link> |
      <router-link to="/account-notice-page">회원 공지사항 page</router-link> |
      <router-link to="/account-event-page">회원 이벤트 page</router-link> |
      <router-link to="/account-shop-page">상점 page</router-link> |
      <router-link to="/community-page">community page</router-link> |
      <router-link to="/community-regist-page">community regist page</router-link> |
      <router-link to="/community-modify-page">community modify page</router-link> |



      <br><br>
      <hr>
      <br>

      <router-link to="/way-to-come-page">오시는 길 page</router-link> |
      <router-link class="complete" to="/account-list-page">관리자용 계정 목록</router-link> |
      <router-link class="complete" to="/manager-notice-regist-page">관리자용 공지사항 regist page</router-link> |
      <router-link to="/manager-notice-list-page">관리자용 공지사항 list page</router-link> |
      <router-link to="/manager-event-page">관리자용 이벤트 page</router-link> |
      <router-link to="/manager-shop-page">관리자용 샾 page</router-link> |

    </nav>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
}
</script>

<style scoped>
.complete {
  color: red;
}
</style>

