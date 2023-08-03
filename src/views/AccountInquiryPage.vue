<template>
  <div class="account-container">
    <AccountMyPage />
    <!-- InquiryList 컴포넌트에 inquiries prop을 전달 -->
    <InquiryList :inquiries="inquiries" />
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
  data() {
    return {
      inquiries: [
        // inquiries 데이터를 여기에 할당해주세요.
        // 예를 들어, 서버에서 가져온 1:1 문의 목록 데이터를 inquiries에 할당합니다.
        // 예: inquiries: [{ id: 1, inquiryType: '문의유형1', title: '제목1', createdDate: '2023-07-22', complete: true }, ...]
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.account-container {
  margin-top: 180px;
}
</style>
