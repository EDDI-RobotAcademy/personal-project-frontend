<template lang="">
    <div>
        <v-card class="comments_card">
        <ul class="comments_ul">
          <div class="review_space">
            <span class="review"><v-icon class="mr-2">mdi-comment</v-icon>댓글쓰기</span>
          </div>
          <div class="textfield">
          <v-text-field placeholder="로그인 후에 댓글을 입력해주세요" v-model="text" style="width:850px" @keyup.enter="register"/>
          <v-btn text @click="register">작성</v-btn>  
          </div>
      </ul>
    </v-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            text:'',
            userToken:''
        }
    },
    methods: {
        register(){
            let commentInfo={
                userToken: this.userToken,
                text: this.text,
            }
            this.$emit("registerComment", commentInfo)
            this.text=''
        }
    },
    created(){
        this.userToken=localStorage.getItem("userToken")
    },
    
    
}
</script>
<style scoped>
.review_space{
    padding: 20px 0px;
}

.review{
    font-weight: bold;
    font-size: 20px;
}
.textfield{
    display: flex;
    align-items: center;
}
.comments_card{
    padding: 20px 0px;
    width: 1000px; 
    margin: 20px auto;
    margin-bottom: 0.5px;
    padding: 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.comments_ul{
    padding-left: 15px;
    padding-right: 15px;
}

</style>