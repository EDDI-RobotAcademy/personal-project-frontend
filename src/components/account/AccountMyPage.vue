<template>
  <div class="account-header">
    <h1 class="account-header__title">마이페이지</h1>
    <ul class="account-header__nav">
      <li class="nav__link">
        <RouterLink to="" class="account_list">관심목록</RouterLink>
      </li>
      <li class="nav__link" >
        <RouterLink to="" class="account_ask">1:1 문의</RouterLink>
      </li>
      <li class="nav__link">
        <RouterLink to="" class="account_mypage">내 정보</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../scss/AccountHeader.scss'
</style>