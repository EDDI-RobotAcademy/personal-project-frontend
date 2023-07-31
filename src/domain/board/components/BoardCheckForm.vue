<template lang="">
    <div>
      <form @submit.prevent="onSubmit">
        <table v-if="board.password">
          <tr>
            <td>비밀번호</td>
            <td>
              <input type="text" v-model="password" />
            </td>
          </tr>
        </table>
  
        <div>
          <v-btn type="submit" color="primary">확인</v-btn>
          <v-btn color="grey" @click.prevent="cancel">취소</v-btn>
        </div>
      </form>
    </div>
  </template>
  <script>
  export default {
    props: {
      board: {
        type: Object,
        required: true,
      },
      nickname: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        password: "",
      };
    },
    methods: {
      onSubmit() {
        if (this.board.password) {
            if (this.board.password.trim() === this.password) {
            this.$emit("submit");
            } else {
            alert("비밀번호가 일치하지 않습니다.");
            }
        } else {
            if (this.board.writer === this.nickname) {
            this.$emit("submit");
            } else {
            alert("계정이 일치하지 않습니다.");
            }
        }
      },
      cancel() {
        this.$router.go(-1);
      },
    },
  };
  </script>
  <style lang=""></style>
  