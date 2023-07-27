<template lang="">
    <div>
        <v-card class="comments_card">
        <ul class="comments_ul">
        <li class="comments_li" v-for="comment in board.commentList">
            <p class="comments_name">
                <v-img class="logoImg" src="../../assets/icon/no_logo.png" />
              <span class="comments_nickname">{{ comment.member.nickname }} <br></span>
            <span class="comments_postdate">{{ comment.createdDate }} <br></span>
            </p>
                <div class="comments_content"> 
                    <div v-if="!isModify">
                    <span class="comments_description">{{ comment.text }} <br></span>
                    </div>
                    <div v-else="!isModify">
                    <input class="comments_description_modify" v-model="comment.text"/>
                    </div>
                    <div class="button_icon">
                    <button class="mr-1" @click="modifyComment(comment)"><v-icon>mdi-note-edit-outline</v-icon></button>
                    <button @click="deleteComment(comment.commentId)"><v-icon>mdi-alpha-x-circle-outline</v-icon></button>
                </div>
            </div>
          </li>
      </ul>
    </v-card>
    </div>
</template>
<script>
const commentModule = 'commentModule'
import { mapActions } from 'vuex';
export default {
    props: {
        board: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            text: '',
            userToken: '',
            isModify: false
        }
    },
    methods: {
        ...mapActions(
            commentModule, ['requestCommentModifyToSpring', 'requestDeleteCommentToSpring']
        ),
        modifyComment(comment) {
            this.isModify = !this.isModify
            if (!this.isModify) {
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
        }
    },
    created() {
        this.userToken = localStorage.getItem("userToken")
    },
}
</script>
<style scoped>
.comments_content {
    display: flex;
    flex-direction: row;
    text-align: right;
    justify-content: space-between;
}

.button_icon {
    margin-left: auto;
}

.comments_card {
    padding: 20px 0px;
    width: 1000px;
    margin: 0px auto;
    padding: 10px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.1), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 2px 0px rgba(0, 0, 0, 0.12)
}

.comments_ul {
    padding-left: 15px;
    padding-right: 15px;
}

.comments_li {
    list-style-type: none;
    border-bottom: 1px solid #e6e6eb;
    padding: 20px 0px 10px 0px;
}

.comments_description {
    font-size: 15px;
    color: #505050;
    display: block;
    font-weight: bold;
    padding-left: 30px;
}

.comments_name {
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    margin-bottom: 0px;
    /* justify-content: space-between; */
}

.logoImg {
    max-height: 30px;
    max-width: 30px;
    aspect-ratio: 1;
}

.comments_nickname {
    margin-right: 5px;

}

.comments_postdate {
    color: grey;
    font-size: 15px;
    margin-left: auto;
}

.comments_description_modify:focus {
    outline: none;
}

.comments_description_modify {
    width: 550px;
    font-size: 15px;
    color: #505050;
    display: block;
    font-weight: bold;
    padding-left: 30px;
}</style>