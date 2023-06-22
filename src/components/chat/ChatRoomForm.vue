<template>
  <div>
    <!-- 연결하기 버튼 클릭시 connect 메소드 실행 -->
    <button @click="connect" class="table">연결하기</button>
    <!-- 연결 끊기 버튼 클릭시 disconnect 메소드 실행 -->
    <button @click="disconnect" class="table">연결 끊기</button>
  </div>
</template>

<script>
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default {
  data() {
    return {
      stompClient: null, // stompClient를 null로 초기화
    };
  },
  methods: {
    connect() {
      // 웹소켓 서버로의 연결 생성
      const socket = new SockJS('http://localhost:7777/ws');
      // stompClient 객체 생성
      this.stompClient = Stomp.over(socket);
      console.log("stompClient", this.stompClient)
      
      console.log("beforeCunnectng")
      // 웹소켓 연결이 성공할 경우 실행
      this.stompClient.onConnect = (frame) => {
        console.log('Connected: ' + frame);
      };

      // 웹소켓 연결이 끊어질 경우 실행
      this.stompClient.onDisconnect = () => {
        console.log('Disconnected');
      };

      // 웹소켓에서 오류가 발생할 경우 실행
      this.stompClient.onStompError = (frame) => {
        console.log('Stomp error:', frame);
      };

      // 웹소켓 연결 활성화
      this.stompClient.activate();
    },
    disconnect() {
      // stompClient가 활성화된 경우 연결 해제
      if (this.stompClient) {
        this.stompClient.deactivate();
      }
    },
  },
};
</script>
<style lang="css">
.table {
  width: 100%;
  border: 1px solid #444444;
  }
</style>