<template lang="">
    <div>
        <v-card class="comments_card">
            <ul class="comments_ul">
                <li class="comments_li_1">
                    <span v-if="!comments || (Array.isArray(comments) && comments.length === 0)">
            현재 등록된 댓글이 없습니다.
          </span>
        </li>
      </ul>
      <ul class="comments_ul">
        <li class="comments_li" v-for="(comment, index) in comments" :key="comment.commentId">
          <router-link
            :to="{ name: 'MemberBoardReadPage', params: { boardId: comment.memberBoard.boardId.toString() }}"
            :class="{ 'router-link-custom': true }"
          >
          <div class="comments_title_container">
            <span>{{ comment.memberBoard.title }}</span>
            <span class="comments_postdate">{{ comment.createdDate }}</span>
          </div>  
        </router-link>
          <div class="comments_content">
            <div class="comments_description_icon">
              <div v-if="!isModify[index]">
                <span class="comments_description">{{ comment.text }} <br></span>
              </div>
              <div v-else>
                <input class="comments_description_modify" v-model="comment.text" />
              </div>
              <div class="button_icon">
                <button class="mr-1" @click="modifyComment(comment, index)">
                  <v-icon>mdi-note-edit-outline</v-icon>
                </button>
                <button @click="deleteComment(comment.commentId)">
                  <v-icon>mdi-alpha-x-circle-outline</v-icon>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
        <div v-if="!comments || (Array.isArray(comments) && comments.length === 0)">
        </div>
        <div v-else>
        <v-pagination class="pagination" v-model="page" :length="totalPage" circle @click="sendPage"></v-pagination>
        </div>
</v-card>
</div>
</template>
<script>
const commentModule = 'commentModule'
import { mapActions } from 'vuex';
export default {
    props: {
        comments: {
            type: Array,
            required: true,
        },
        totalPage: {
            type: Number
        }
    },
    data() {
        return {
            text: '',
            userToken: '',
            isModify: {},
            page: 1
        }
    },
    methods: {
        ...mapActions(
            commentModule, ['requestCommentModifyToSpring', 'requestDeleteCommentToSpring']
        ),
        sendPage() {
            const page = this.page
            this.$emit("sendPage", page)
        },
        modifyComment(comment, index) {
            this.$set(this.isModify, index, !this.isModify[index])
            if (!this.isModify[index]) {
                const { text, commentId } = comment
                const userToken = this.userToken
                this.requestCommentModifyToSpring({ text, userToken, commentId })
                    .then(() =>
                        location.reload()
                    )
            }
        },
        deleteComment(commentId) {
            this.requestDeleteCommentToSpring(commentId)
                .then(() =>
                    location.reload()
                )
        }
    },
    created() {
        this.userToken = localStorage.getItem("userToken")
    },
    watch: {
        page: {
            immediate: true,
            handler() {
                this.sendPage()
            }
        }
    }
}
</script>
<style scoped>
.comments_card {
    padding: 20px 0px;
    width: 1000px;
    margin: 0px auto;
    padding: 10px;
    color: #878787;
}

.comments_ul {
    padding-left: 15px;
    padding-right: 15px;
}

.comments_li_1 {
    list-style-type: none;
    padding: 20px 0px 10px 0px;
    text-align: center;
    font-size: 17px;
}

.comments_li {
    list-style-type: none;
    border-bottom: 1px solid #e6e6eb;
    padding: 20px 0px 10px 0px;
}

.router-link-custom {
    color: black;
    text-decoration: none;
}

.router-link-custom:hover {
    color: grey;
    text-decoration: underline;
}

.comments_title_container {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.comments_postdate {
    color: grey;
    font-size: 15px;
}

.comments_description_icon {
    margin: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

}

.comments_description {
    font-size: 17px;
    color: #505050;
    display: block;
    /* font-weight: bold; */
    padding-left: 30px;
}

.comments_description_modify:focus {
    outline: none;
    width: 850px;
}

.comments_description_modify {
    color: red;
}

.button_icon {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>