<template>
  <div>    
    <p v-for="(log, i) in logs" :key="i">{{ log }}</p>
    <button v-if="!isConnected" @click="connect">connect</button>
    <button v-if="isConnected" @click="disconnect">disconnect</button>
    <input type="text" v-model="message"/>
    <button  v-if="isConnected" @click="sendMessage">send</button>
    <p v-if="isConnected">connected!</p>
    <p v-else>not connected</p>
  </div>
</template>

  
  <script>
  import {defineComponent} from 'vue'
  let ws
  export default {
    data() {
      return {
        isConnected: false,
        message: "",
        logs: []
      }
    },
    methods: {
      connect() {
        ws = new WebSocket("ws://" + "localhost:7777" + "/chat")
        ws.onopen = () => {
          this.isConnected = true;

          ws.onmessage = ({data}) => {
            this.logs.push({event: '메세지 수신', data});
            console.log(data)
          }
        }
      },
      disconnect() {
        ws.close();
        this.isConnected = false;
      },
      sendMessage() {
        ws.send(this.message)
        this.message = ''
      }
    },
    beforeDestroy() {
      ws.close();
    }
    
  };
  </script>
  
  <style lang="">
  