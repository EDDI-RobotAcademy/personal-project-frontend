<template>
    <div>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-if="!comments || (Array.isArray(comments) && comments.length === 0)"
            align="center"
          >
            <v-list-item-content>
              <v-list-item-title>현재 등록된 댓글이 없습니다!</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
  
          <v-list-item
            v-for="comment in comments"
            :key="comment.id"
            class="text-start"
          >
            <v-list-item-content>
              <div class="flex-container">
                <div>
                  <v-list-item-title>{{ comment.writer }}</v-list-item-title>
                </div>
                <div>
                  <v-list-item-title>{{ comment.content }}</v-list-item-title>
                </div>
                <div>
                    <v-list-item-subtitle>{{ comment.createDate }}</v-list-item-subtitle>
                </div>
                <div @click="openDeleteDialog(comment.id, comment.password)">
                    <v-btn small color="red">삭제</v-btn>
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div>
      <form @submit.prevent="onSubmit">
        <div class="input-container">
          <div class="left-inputs">
            <div class="input-box">
              <label for="writer">작성자</label>
              <input
                type="text"
                id="writer"
                :value="nickname || writer"
                :disabled="nickname !== ''"
                @input="updateWriter"
                class="outlined-input"
              />
            </div>
            <div v-if="!nickname" class="input-box">
              <label for="password">비밀번호</label>
              <input
                type="text"
                id="password"
                v-model="password"
                class="outlined-input"
              />
            </div>
          </div>
          <div class="right-inputs">
            <div class="input-box textarea-box">
              <label for="content">본문</label>
              <textarea
                class="content-textarea outlined-input"
                id="content"
                cols="40"
                rows="5"
                v-model="content"
                placeholder="본문을 입력하세요"
              ></textarea>
            </div>
            <div>
              <v-btn type="submit" color="primary">등록</v-btn>
            </div>
          </div>
        </div>
      </form>
    </div>
    <v-dialog v-model="deleteDialog" max-width="300">
        <v-card>
            <v-card-title>
                <div v-if="showPasswordInput">비밀번호 입력</div>
                <div v-else>정말 삭제하시겠습니까?</div>
            </v-card-title>
            <v-card-text v-if="showPasswordInput">
                <v-text-field
                    v-model="deletePassword"
                    placeholder="비밀번호"
                    type="text"
                    @input="validatePassword"
                ></v-text-field>
                <div v-if="invalidPassword" class="errorText">비밀번호는 6글자 이상이어야 합니다.</div>
            </v-card-text>
            <v-card-actions>
                <v-btn text small color="primary" @click="confirmDelete" :disabled="invalidPassword">확인</v-btn>
                <v-btn text small color="red" @click="cancelDelete">취소</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  
  </div>  
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
    },
    nickname: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      writer: '',
      content: '',
      password: '',
      deleteDialog: false,
      deletePassword: '',
      selectedCommentId: null,
      showPasswordInput: false,
      invalidPassword: false,

    };
  },
  methods: {
    isLoggedIn() {
      return Boolean(localStorage.getItem("isLogin"));
    },
    updateWriter(event) {
      this.writer = event.target.value;
    },
    checkCommonInputRules() {
      if (!this.content) {
        alert("내용을 입력해주세요.");
        return false;
      }

      return true;
    },
    validatePassword() {
      const passwordPattern = /^.{6,}$/;
      this.invalidPassword = !passwordPattern.test(this.deletePassword);
    },
    checkInputRulesEnabled() {
      if (!this.checkCommonInputRules()) {
        return false;
      }

      const namePattern = /^([가-힣ㄱ-ㅎㅏ-ㅣ]{2,}|[a-zA-Z]{4,})$/;
      const passwordPattern = /^.{6,}$/;

      if (!namePattern.test(this.writer)) {
        alert("작성자 이름은 한글 두 글자 이상 또는 영어 네 글자 이상이어야 합니다.");
        return false;
      }

      if (!passwordPattern.test(this.password)) {
        alert("비밀번호는 6글자 이상이어야 합니다.");
        return false;
      }

      return true;
    },
    onSubmit() {
      let isInputValid = false;

      if (this.nickname) {
        isInputValid = this.checkCommonInputRules();
      } else {
        isInputValid = this.checkInputRulesEnabled();
      }

      if (!isInputValid) return;

      const { writer, content, password, nickname } = this;
      this.$emit('commentSubmit', { writer, content, password, nickname });
      this.content = '';
    },
    openDeleteDialog(id, password) {
            this.selectedCommentId = id;
            this.showPasswordInput = !!password;
            this.deleteDialog = true;
        },
    confirmDelete() {
        if (this.showPasswordInput) {
            this.deleteComment();
        } else {
            this.$emit("deleteComment", this.selectedCommentId, '', this.nickname);
            this.cancelDelete();
        }
    },
    deleteComment() {
        this.$emit("deleteComment", this.selectedCommentId, this.deletePassword, this.nickname);
        this.selectedCommentId = null;
        this.deletePassword = "";
        this.deleteDialog = false;
    },
    cancelDelete() {
      this.selectedCommentId = null;
      this.deletePassword = "";
      this.deleteDialog = false;
    },
  },
  computed: {
    isLogin: function () {
      return this.isLoggedIn();
    },
  },
};
</script>

<style>
.errorText {
    color: red;
    font-size: 12px;
  }
  .input-container {
    display: flex;
  }

  .left-inputs {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
  }

  .right-inputs {
    display: flex;
    flex-direction: column;
  }

  .input-box {
    margin-bottom: 10px;
  }

  .outlined-input {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    outline: none;
  }

  .outlined-input:focus {
    border-color: blue;
  }

  .content-textarea {
    resize: none;
  }
  .flex-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
</style>
