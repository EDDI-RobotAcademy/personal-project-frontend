<template>
    <div style="max-width: 1200px;">
      <v-card>
        <v-card-title>댓글 목록</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="comment in comments" :key="comment.id">
              <v-list-item-title>@{{ comment.author }}</v-list-item-title>
              <v-list-item> {{ comment.content }}</v-list-item> 
              <v-btn @click="reportedComment(comment.id)">신고</v-btn>
              <v-btn @click="commentDelete(comment.author,comment.id)">X</v-btn>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
  
      <v-card>
        <v-card-title>댓글 작성</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="onSubmit">
            <v-text-field
              v-model="newComment"
              label="댓글 내용"
              filled
            ></v-text-field>
            <v-btn type="submit" color="primary">댓글 작성</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script>
const CommentModule = 'CommentModule'
import { mapActions, mapState } from 'vuex';

  export default {
    props: {
      boardId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        newComment: '',
        author:'',
        nickname:'',
        reporter:'',
        reason:'불쾌감을 조성합니다.'
      };
    },
    computed:{
      ...mapState(CommentModule,['comments'])
    },
    watch: {
    'boardId': {
      immediate: true,
      handler(newBoardId, oldBoardId) {
        // Check if the boardId has changed
        if (newBoardId !== oldBoardId) {
          // Call the weather API method to update weatherInfo and temp
         this.fetchComments();
        }
      },
    },
  },
    methods: {
      ...mapActions(CommentModule,['requestCommentRegisterToSpring','requestCommentListToSpring','requestCommentDeleteToSpring','requestReportedCommentToSpring']),
       fetchComments() {
          const payload = this.boardId; // 수정된 부분
          console.log(payload)
           this.requestCommentListToSpring(payload)
          this.nickname=localStorage.getItem('nickname')
      },
      async onSubmit(event) {
        event.preventDefault();
        const payload = {
          content: this.newComment,
          author: localStorage.getItem('userToken'), // 작성자 정보 설정
          boardId: this.boardId
        };
        try {
          const responseData = await this.requestCommentRegisterToSpring(payload);
          if (responseData) {
            console.log('댓글 작성 결과: ' + responseData);
            this.newComment = ''; // this.content에서 this.newComment로 수정
                
              this.fetchComments();
            }
          } catch (error) {
            console.error('error : ' + error);
          }
},
 async reportedComment(key){
  console.log('받아온 ID: '+key)
  await this.requestReportedCommentToSpring(key)
},

   async commentDelete(key,id){
    if(key==localStorage.getItem('nickname')){
      this.requestCommentDeleteToSpring(id)
      await this.fetchComments();
    }else{
      alert('삭제 권한이 없습니다.')
    }
  }

      
    },
    created() {
      
    },
     mounted() {

      this.fetchComments();
     this.reporter=localStorage.getItem('nickname')
  
    },
  };
  </script>
  