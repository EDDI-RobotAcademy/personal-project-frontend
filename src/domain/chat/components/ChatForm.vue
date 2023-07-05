<template>
    <div>
      <h1>Chat</h1>
      <div class="messages" style="max-height: 300px; overflow-y: scroll;">
       <div v-for="(message, index) in messages" :key="index">
          {{ message }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        messages: [
          "Message 1",
          "Message 2",
          "Message 3",
          "Message 4",
          "Message 5",
          "Message 6",
          "Message 7",
          "Message 8",
          "Message 9",
          "Message 10",
          "Message 11",
          "Message 12",
          "Message 13",
          "Message 14",
          "Message 15",
          "Message 16",
          "Message 17",
          "Message 18",
          "Message 19",
          "Message 20",
        ],
      };
    },
  };
  </script>
  
  <style lang="">
  