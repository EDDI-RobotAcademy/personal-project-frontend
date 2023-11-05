<template lang="">
  <div>
    <NaviTest />
    <div style="width:600px; padding-top: 190px; margin: auto">
      <h1 style="text-align: center">환영합니다.</h1>
      <h4 style="text-align: center">SwimminGo에서 당신의 수영 이야기를 들려주세요.</h4>
      <!-- <button type="button" class="btn btn-outline-primary btn-lg" style="margin-top: 10px;">근처 수영장 확인하러 가기</button> -->
      <!-- <img src="../assets/swgHome.png" style="width: 400px; display:block; margin: auto; margin-top: 70px;" @click="$router.push('/mapMarkerTestPage')"> -->
      <div class="user-wrap">
        <div class="user-image">
          <img src="../assets/swgHome.png" @click="$router.push('/mapMarkerTestPage')">
        </div>
        <div class="user-text">
          <b>근처 수영장 찾아보기</b>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NaviTest from '@/components/NaviTest.vue';
export default {
  components: {
    NaviTest
  },
}
</script>
<style>
/* .imgBox {
  width: 400px;
  display: block;
  margin: auto;
  margin-top: 70px;
} */

.user-wrap {
  width: 500px;
  margin: auto;
  margin-top: 30px;
  position: relative;
}

.user-wrap {
  cursor: pointer;
}

.user-wrap img {
  width: 500px;
  vertical-align: middle;
}

.user-text {
  position: absolute;
  top: 45%;
  left: 50%;
  width: 100%;
  margin: 10px auto;
  transform: translate(-50%, -50%);
  font-size: 30px;
  font-family: 'ypseo';
  color: white;
  text-align: center;
  display: none;
}

.user-image:hover {
  filter: brightness(60%)
}

.user-image:hover~.user-text {
  display: block;
}
</style>