<template>
  <div class="container">
    <div class="log-container">
      <div class="log-wrapper">
        <p v-for="(log, i) in logs" :key="i">{{ log }}</p>
      </div>
    </div>
    <div class="input-container">
      <input type="text" v-model="message" @keyup.enter="sendMessage" />
      <button @click="sendMessage">send</button>
    </div>
  </div>
</template>
  
  <script>
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
        logs: []
      }
    },
    methods: {
      connect() {
        ws = new WebSocket("ws://" + "localhost:7777" + "/chat/" + this.ticker)
        ws.onopen = () => {
          ws.onmessage = ({data}) => {
            this.logs.push({event: '메세지 수신', data});
            console.log(data)
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
    mounted() {
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

  