<template>
  <div class="container">
    <div class="log-container">
      <div class="log-wrapper">
        <p v-for="(log, i) in logs" :key="i">{{ log }}</p>
      </div>
    </div>
    <div class="input-container">
      <input type="text" v-model="message" @keydown.enter.prevent="message.trim() !== '' && sendMessage()" />
      <button @click="sendMessage" :disabled="!message.trim()">send</button>
    </div>
  </div>
</template>
  
  <script>
import axiosInst from '@/utility/axiosInst';

  let ws
  export default {
    props: {
        ticker: {
          type: String,
          required: true,
        },
      },
    data() {
      return {
        isConnected: false,
        message: "",
        logs: [],
        clientIp: '',
      }
    },
    methods: {
      getCookieValue(key) {
        const cookieString = document.cookie;
        const value = cookieString
          .split("; ")
          .find((cookie) => cookie.startsWith(key))
          ?.split("=")[1];

        return value;
      },  
      connect() {
        const accessToken = this.getCookieValue("AccessToken");
        const queryString = `?accessToken=${accessToken}&clientIp=${this.clientIp}`;

        ws = new WebSocket("ws://" + '43.201.41.0:7777' + "/chat/" + this.ticker + queryString)
        ws.onopen = () => {
          ws.onmessage = ({data}) => {
            this.logs.push(data);
          }
        }
      },
      disconnect() {
        ws.close();
      },
      sendMessage() {
        ws.send(this.message)
        this.message = ''
      }
    },
    beforeDestroy() {
      ws.close();
    },
    async mounted() {      
      const response = await axiosInst.spring.get('/api/get-client-ip');
      this.clientIp = response.data;
      this.connect()
    },
    beforeUnmount() {
      this.disconnect()
    },
    
  };
  </script>
  
  <style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .log-container {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  
  .log-wrapper {
    margin-top: auto;
  }

  .input-container {
    display: flex;
    align-items: center;
  }
  
  input {
    flex-grow: 1;
    margin-right: 10px;
  }
</style>

  