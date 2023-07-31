<template lang="">
    <div>
      <h2>{{ board.title }}</h2>
      <board-read-form v-if="board" :board="board" />
      <p v-else>로딩중 .......</p>
      <v-btn @click="onModify">게시물 수정</v-btn>
      <v-btn @click="onDelete">삭제</v-btn>
      <v-btn :to="{ name: 'StockMainPage' }">돌아가기</v-btn>
      <comment-comprehensive-form 
      @commentSubmit="commentSubmit"
      @deleteComment="deleteComment"
      :nickname="nickname"
      :comments="comments"
        />
    </div>
  </template>
  
  <script>
  import BoardReadForm from "../components/BoardReadForm.vue";
  import CommentComprehensiveForm from "../components/CommentComprehensiveForm.vue"
  import { mapActions, mapState } from "vuex";
  
  const boardModule = "boardModule";
  const accountModule = "accountModule";
  
  export default {
    data () {
        return {
            nickname: ''
        }
    },
    components: {
      BoardReadForm,
      CommentComprehensiveForm,
    },
    props: {
      id: {
        type: String,
        required: true,
      },
      ticker: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapState(boardModule, ["board", "comments"]),

    },
    methods: {
      ...mapActions(boardModule, [
        "requestBoardToSpring",
        "requestDeleteBoardToSpring",
        "requestRegisterCommentToSpring",
        "requestCommentListToSpring",
        "requestDeleteCommentToSpring"
      ]),
      ...mapActions(accountModule, [ 'requestNicknameToSpring' ]),
      async onDelete() {
        const payload = {
          ticker: this.ticker,
          id: this.id,
          purpose: 'delete'

        };
        await this.$router.push({ name: "BoardCheckPage", params: payload });
      },
      async fetchData() {
        const payload = {
          ticker: this.ticker,
          id: this.id,
        };
        const commentPayload = {
            id: this.id
        };
        await this.requestBoardToSpring(payload);
        await this.requestCommentListToSpring(commentPayload);
      },
      async onModify() {
        const payload = {
          ticker: this.ticker,
          id: this.id,
          purpose: 'modify'
        };
        await this.$router.push({ name: "BoardCheckPage", params: payload });
      },
      async commentSubmit(payload) {
        payload.id = this.id;
        await this.requestRegisterCommentToSpring(payload)
      },
      async deleteComment( selectedCommentId, deletePassword, nickname ) {
        const payload = {
            selectedCommentId,
            deletePassword,
            nickname
        };
        await this.requestDeleteCommentToSpring(payload)
      }
    },
    async created() {
        await this.fetchData();
    },
    async mounted() {      
        const res = await this.requestNicknameToSpring()
        this.nickname = res.nickname
    },
  };
  </script>
  
  <style lang="">
</style>
  