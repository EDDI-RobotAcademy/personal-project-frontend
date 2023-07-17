<template>
  <div class="account-container">
    <AccountMyPage />
    <InquiryList />
  </div>
</template>

<script>
import AccountMyPage from '@/components/account/AccountMyPage.vue';
import InquiryList from '@/components/account/InquiryList.vue';

export default {
  components: {
    AccountMyPage,
    InquiryList,
  },
};
</script>

<style lang="scss" scoped>
.account-container {
  margin-top: 180px;
}
</style>