<template>
  <nav class="header__nav">
    <!-- 기존 네비게이션 메뉴들 -->
    <RouterLink to="/mapApi" class="nav__link">지도</RouterLink>
    <!-- <RouterLink to="/news" class="nav__link">매물등록</RouterLink> -->
    <RouterLink to="/InquiryRegisterPage" v-if="isAuthenticated" class="nav__link">1:1 문의하기</RouterLink>
    <v-btn v-if="!isAuthenticated" text @click="signIn" class="nav__link link--user">로그인</v-btn>
    <v-btn v-if="!isAuthenticated" text @click="signUp" class="nav__link link--user">회원가입</v-btn>

    <!-- 사용자 닉네임과 관련된 v-menu 영역 -->
   <v-menu v-if="isAuthenticated" v-model="showMenu" offset-y right style="border-radius: 3px;">
        <template v-slot:activator="{ on }">
          <v-btn text class="nav__link link--user" v-on="on">
            {{ userNickname }}
          </v-btn>
        </template>
        <v-list>
        <v-list-item v-for="(item, index) in menuItems" :key="index" @click="handleMenuItemClick(item)"
          :style="index === menuItems.length - 1 ? 'border-top: 1px solid #e9e9e9; border-radius: 0 0 3px 3px;' : ''">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </nav>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { LOGIN_COMPLETE , SET_USER_NICKNAME } from '@/store/account/mutation-types';
import router from '@/router';

const accountModule = 'accountModule';

export default {
  data() {
    return {
      showMenu: false, // v-menu의 표시 여부를 제어하는 변수
      menuItems: [ // 메뉴 항목들 정의
        { title: '내 정보', route: '/account/edit' },
        { title: '1:1 문의 내역', route: '/InquiryListPage' },
        { title: '로그아웃', action: 'signOut' }
      ],
      whatIsYourNickname: ''
    };
  },
  computed: {
    ...mapState(accountModule, ['isAuthenticated', 'userNickname'])
  },
  methods: {
    ...mapActions(accountModule, ['loginComplete', 'requestAccountToSpring']),
    ...mapMutations(accountModule, ['LOGIN_COMPLETE', 'SET_USER_NICKNAME']),
    signUp() {
      if (this.$route.path !== '/signup') {
        router.push('/signup');
      }
    },
    signIn() {
      // 현재 페이지가 "/login"이 아닌 경우에만 이동
      if (this.$route.path !== '/login') {
        router.push('/login');
      }
      const userNickname = localStorage.getItem("userNickname");
      // const userNickname = this.userNickname;
      console.log(userNickname); // 사용자 닉네임 출력
    },
    async signOut() {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userNickname");
      this[LOGIN_COMPLETE](false);
      this[SET_USER_NICKNAME](''); // 사용자 닉네임도 초기화
      await this.$store.commit('RESET_ACCOUNT'); // RESET_ACCOUNT 뮤테이션 호출하여 account 상태 비우기
      // 추가: isAuthenticated를 false로 설정하여 로그아웃 상태로 만듭니다.
      this.isAuthenticated = false;
      localStorage.setItem('isAuthenticated', false);
      this.$router.push('/login'); // 로그아웃 후 로그인 페이지로 이동
    },
    handleMenuItemClick(item) {
      if (item.route) {
        // 현재 경로와 다른 경로인지 확인
        if (this.$route.path !== item.route) {
          this.$router.push(item.route);
        }
      } else if (item.action === 'signOut') {
        this.signOut();
      }
      this.showMenu = false; // 메뉴를 닫음
    },
    async dropAccount() {
      await this.$store.dispatch('requestDeleteAccountToSpring', { id: this.account.id });
      alert('탈퇴가 완료되었습니다! 이용해주셔서 감사합니다');
      this.loginComplete(false); // 내비게이션바의 isAuthenticated 값을 false로 변경하여 로그아웃 상태로 전환
      router.push('/');
    },

  },

  async mounted() {
    this.userToken = localStorage.getItem('userToken');
    if (this.userToken == null) {
      this[LOGIN_COMPLETE](false);
    } else {
      // 로그인 상태일 경우 사용자 닉네임 가져오기
      this[LOGIN_COMPLETE](true);
      await this.requestAccountToSpring({ userToken: this.userToken })
      // this.$router.go(0)

    }
  },
  
  
};
</script>

<style lang="scss" scoped>
@import '../scss/NavigationBar.scss';

</style>
