<template>
  <div>    
    <p v-for="(log, i) in logs" :key="i">{{ log }}</p>
    <input type="text" v-model="message" @keyup.enter="sendMessage"/>
    <button @click="sendMessage">send</button>
  </div>
</template>

  
  <script>
  import {defineComponent} from 'vue'
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
  
  <style lang="">
  