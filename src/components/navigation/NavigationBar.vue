<template>
  <nav class="header__nav">
    <RouterLink to="/search" class="nav__link">지도</RouterLink>
    <RouterLink to="/news" class="nav__link">오늘의 뉴스</RouterLink>
    <RouterLink to="/account/liked" v-if="isLogin" class="nav__link">
      관심목록
    </RouterLink>
    <RouterLink to="/service/inquiry" class="nav__link">1:1 문의</RouterLink>
       <v-btn v-if="!isLogin" text @click="signIn" class="nav__link link--user">로그인</v-btn>
       <v-btn v-if="!isLogin" text @click="signUp" class="nav__link link--user">회원가입</v-btn>
    <template v-if="isLogin">
      <div class="header__user">
        <ADropdown-button size="large">
          {{ getNickname }}
          <AMenu slot="overlay" style="padding: 0; border-radius: 3px">
            <AMenu-item key="1" style="
								padding: 16px 25px;
								border-radius: 3px 3px 0 0;
							">
              <RouterLink to="/account/edit" style="
									width: 200px;
									font-size: 16px;
					      	text-decoration: none;
								">
                내 정보
              </RouterLink>
            </AMenu-item>
            <AMenu-item key="2" style="padding: 16px 25px; ">
              <RouterLink to="/account/inquiry-list" style="
									width: 200px;
									font-size: 16px;
					      	text-decoration: none;
								">
                1:1 문의 내역
              </RouterLink>
            </AMenu-item>
            <AMenu-item key="3" style="
								padding: 16px 10px;
								border: none;
								border-radius: 0 0 3px 3px;
							">
              <AButton @click="signOut" style="
									width: 200px;
									border: none;
									background-color: transparent;
									font-size: 16px;
									text-align: left;
									cursor: pointer;
								">
                로그아웃
              </AButton>
            </AMenu-item>
          </AMenu>
          <AIcon slot="icon" type="user" />
        </ADropdown-button>
      </div>
    </template>
  </nav>
</template>

<script>
import router from '@/router'

export default {
  data() {
    return {
      userToken: 0,
      isLogin: false,
    }
  },
  methods: {
    signUp() {
      router.push('/signup')
        .catch(() => { })
    },
    signIn() {
      router.push('/login')
        .catch(() => { })
      this.userToken = localStorage.getItem("userToken")
      if (this.userToken != null) {
        this.isLogin = true
      }
    },
    signOut() {
      localStorage.removeItem("userToken")
      this.isLogin = false
    },
    
    goToHome() {
      router.push('/')
        .catch(() => { })
    },
    myPage() {
      router.push('/myPage')
        .catch(() => { })
    }
  },
  mounted() {
    this.userToken = localStorage.getItem("userToken")
    if (this.userToken != null) {
      this.isLogin = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/NavigationBar.scss';
</style>
