<template lang="">
    <div>
        <div class="btn_router_div">
            <v-container class="btn_container">
                <router-link style="float: right" :to="{ name: 'MemberBoardReadPage', params: { boardId }} ">
                    <v-btn
                        outlined
                        color="black">수정 완료
                    </v-btn>
                </router-link>
            </v-container>
        </div>
        <!-- <MemberBoardReadForm v-if="board" :board="board"    :filePathList="filePathList"/> -->
        <MemberBoardModifyForm v-if="board" :board="board" @submit="onSubmit"/>
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
    computed: {
        ...mapState(boardModule, ['board'])
    },
    methods: {
        ...mapActions(
            boardModule, ['requestBoardToSpring']
        ),
        async onSubmit (payload) {
            const boardId = this.boardId
            await this.requestBoardModifyToSpring(payload)
            await this.$router.push({
                name: 'MemberBoardReadPage',
                params: { boardId: this.boardId }
            })
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