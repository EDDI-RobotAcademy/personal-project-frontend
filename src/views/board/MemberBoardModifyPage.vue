<template lang="">
    <div>
        <div class="btn_router_div">
            <v-container class="btn_container">
                    <v-btn
                        outlined
                        color="black"
                        @click="onClick"
                        >수정 완료
                    </v-btn>
            </v-container>
        </div>
        <MemberBoardModifyForm v-if="board" :board="board" :userToken="userToken" @submit="onSubmit"/>
        <p v-else>로딩중 .......</p>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex';
import MemberBoardModifyForm from '@/components/board/MemberBoardModifyForm.vue'
const boardModule = 'boardModule'

export default {
    name: 'MemberBoardModifyPage',
    components: {
        MemberBoardModifyForm,
    },
    props: {
        boardId: {
            type: String,
            required: true, 
    }
    },
    data(){
        return{
        userToken:''
        }
    },
    computed: {
        ...mapState(boardModule, ['board'])
    },
    methods: {
        ...mapActions(
            boardModule, ['requestBoardToSpring','requestBoardModifyToSpring']
        ),
        async onSubmit (payload) {
            // const {title, nickname, content, awsFileList} = payload
            const boardId = this.boardId
            await this.requestBoardModifyToSpring({...payload, boardId})
            await this.$router.push({
                name: 'MemberBoardReadPage',
                params: { boardId: this.boardId }
            })
        },
        onClick(){
        	if(this.userToken){
            this.$EventBus.$emit('fetchData')
            }
        }
    },
    async created () {
        await this.requestBoardToSpring(this.boardId)
        this.userToken = localStorage.getItem("userToken")
    
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