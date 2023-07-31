<template lang="">
    <div>
      <board-check-form @submit="onSubmit" 
      :board="board"
      :nickname="nickname"
 />
    </div>
  </template>
  <script>
  import BoardCheckForm from "../components/BoardCheckForm.vue";
  import { mapActions, mapState } from "vuex";
  
  const boardModule = "boardModule";
  const accountModule = "accountModule";
  
  export default {
    data() {
      return {
        nickname: null,
      };
    },
    props: {
      ticker: String,
      id: String,
      purpose: String,
    },
    components: {
      BoardCheckForm,
    },
    name: "BoardRegisterPage",
    methods: {
      ...mapActions(boardModule, [
        "requestBoardToSpring",
        "requestDeleteBoardToSpring",
      ]),
      ...mapActions(accountModule, ["requestNicknameToSpring"]),
      async onSubmit() {
        const payload = { ticker: this.ticker, id: this.id };
        if (this.purpose === "delete") {
            await this.requestDeleteBoardToSpring(payload);
            await this.$router.push({ name: "StockMainPage" });
        } else if (this.purpose === "modify") {
            await this.$router.push({ name: "BoardModifyPage", params: { ticker: this.ticker, id: this.id} });
        }        
      },
    },
    async mounted() {
      const requestPayload = {
        ticker: this.ticker,
        id: this.id,
      };
      await this.requestBoardToSpring(requestPayload);
  
      if (this.isLoginFromLocalStorage) {
        const res = await this.requestNicknameToSpring()
        this.nickname = res.nickname
      }
    },
    computed: {
      ...mapState(boardModule, ["board"]),
      isLoginFromLocalStorage() {
        return localStorage.getItem("isLogin");
      },
    },
  };
  </script>
  <style lang=""></style>
  