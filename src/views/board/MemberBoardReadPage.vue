<template lang="">
    <div>
        <!-- <MemberBoardReadForm v-if="board" :board="board"    :filePathList="filePathList"/> -->
        <MemberBoardReadForm v-if="board" :board="board"/>
        <p v-else>로딩중 .......</p>
        <!-- <router-link :to="{ name: 'BoardModifyPage', params: { boardId }}">
            게시물 수정
        </router-link>
        <button @click="onDelete">삭제</button>
        <router-link :to="{ name: 'BoardListPage' }">
            돌아가기
        </router-link> -->
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex';
import MemberBoardReadForm from '@/components/board/MemberBoardReadForm.vue'
const boardModule = 'boardModule'

export default {
    name: 'MemberBoardReadPage',
    components: {
        MemberBoardReadForm,
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
        // async onDelete () {
        //     await this.requestDeleteBoardToSpring(this.boardId)
        //     await this.$router.push({ name: 'BoardListPage' })
        // }
    },
    async created () {
        await this.requestBoardToSpring(this.boardId)
    
    }
}
</script>
<style lang="">
    
</style>