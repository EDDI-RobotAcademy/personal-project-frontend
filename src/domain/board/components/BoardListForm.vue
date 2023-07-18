<template>
    <div>
      <h3>게시물 목록</h3>
      <v-list>
        <v-list-item-group>
          <v-list-item v-if="!boards || (Array.isArray(boards) && boards.length === 0)" align="center">
            <v-list-item-content>
              <v-list-item-title>현재 등록된 게시물이 없습니다!</v-list-item-title>
            </v-list-item-content>
          </v-list-item>  
          <v-list-item v-else v-for="board in boards" 
                                    :key="board.id" 
                                    @click="$router.push({name: 'BoardReadPage', 
                                    params: {id: board.id.toString()}})">
            <v-list-item-content>
              <v-list-item-title class="text-start">{{ board.id }}. {{ board.title }}</v-list-item-title>
              <v-list-item-subtitle class="text-start">작성자: {{ board.writer }} | 등록일자: {{ board.updateDate }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>    
      <div class="router-link-button" style="padding: 10px;">
        <v-btn @click="$router.push({ name: 'BoardRegisterPage', params: { ticker: ticker.toString() } })">
            <v-icon left> mdi-pencil </v-icon>
            게시물 작성
        </v-btn>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      boards: {
        type: Array
      },
      ticker: {
        type: String,
        required: true,
      },
    }
  };
  </script>
  
  <style>
  .stockname-title {
    font-size: 24px;
    font-weight: bold;
  }
  
  .router-link-button {
    position: absolute;
    bottom: 0;
    left: 0;
    margin-left: 15px;
  }
  </style>
  