<template lang="">
    <div>
        <div class="btn_router_div">
            <v-container class="btn_container">
                <!-- <router-link style="float: right" :to="{ name: 'MemberBoardModifyPage', params: { boardId }} "> -->
                    <v-btn
                        outlined
                        color="black"
                        @click="modifyBoard">게시글 수정
                    </v-btn>
                <!-- </router-link> -->
                    <v-btn @click="onDelete" outlined color="black">삭제</v-btn>
            </v-container>
        </div>
        <!-- <MemberBoardReadForm v-if="board" :board="board"    :filePathList="filePathList"/> -->
        <MemberBoardReadForm v-if="board" :board="board"/>
        <p v-else>로딩중 .......</p>
        <CommentRegisterForm @registerComment="registerComment"/>
        <CommentReadForm :board="board"/>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex';
import MemberBoardReadForm from '@/components/board/MemberBoardReadForm.vue'
import CommentRegisterForm from '../../components/comment/CommentRegisterForm.vue'
import CommentReadForm from '../../components/comment/CommentReadForm.vue'

const boardModule = 'boardModule'

export default {
    data(){
        return{
        awsBucketName: process.env.VUE_APP_AWS_BUCKET_NAME,
        awsBucketRegion: process.env.VUE_APP_AWS_BUCKET_REGION,
        awsIdentityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOLID,
        userToken: ''
        }
    },
    name: 'MemberBoardReadPage',
    components: {
        MemberBoardReadForm,
        CommentRegisterForm,
        CommentReadForm
    },
    props: {
        boardId: {
            type: String,
            required: true, 
    }
    },
    mounted(){
        this.userToken = localStorage.getItem("userToken")
    },
    computed: {
        ...mapState(boardModule, ['board'])
    },
    methods: {
        ...mapActions(
            boardModule, ['requestBoardToSpring', 'requestDeleteBoardToSpring']
        ),
        async onDelete () {
            if(this.userToken){
                await this.s3fileDelete()
                await this.requestDeleteBoardToSpring(this.boardId)
                await this.$router.push('/member-board-list-page')
                
            }
        },
        s3fileDelete(){
                this.awsS3Config()
                const board = this.board
                console.log(board)
                for(let i=0 ; i< this.board.filePathList.length; i++ ){
                    console.log("aws3에서 사진 지우기", this.board.filePathList[i].imagePath)
                this.s3.deleteObject({
                    Key: this.board.filePathList[i].imagePath
                }, (err, data) => {
                    if(err){
                        return alert('AWS 버킷 데이터 삭제에 문제가 발생했습니다.: ' + err.message)
                    }
                })
                }
        },
        registerComment(){

        },
        awsS3Config(){
            AWS.config.update({
                region: this.awsBucketRegion,
                credentials: new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: this.awsIdentityPoolId
                })
            })

            this.s3 = new AWS.S3({
                apiVersion: '2006-03-01',
                params: {
                    Bucket: this.awsBucketName
                }
            })
        },
        modifyBoard(){
            if(this.userToken){
                this.$router.push({ name: 'MemberBoardModifyPage', params: { boardId: this.boardId }} )
            }
        }
    },
    async created () {
        await this.requestBoardToSpring(this.boardId)
    }
}
</script>
<style scoped>
.btn_router_div {
  justify-content: center;
  display: flex;
}

.btn_container {
  width: 1000px;
  display: flex;
  justify-content: flex-end;
}

.btn_container > * {
  margin-left: 8px;
}
</style>