<template>
    <div>
        <navi-test />
        <div style="padding-top: 90px;"></div>
        <h4 style="text-align: center; margin: 30px; font-weight: bold; color: #83c1e7;;">Board</h4>
        <hr />
        <board-list-form :boards="boards" />
        <hr />
        <div style="text-align: center;">
            <button type="button" class="btn btn-custom2" @click="$router.push('/boardRegisterPage')">
                새 글쓰기
            </button>
        </div>

    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

const boardModule = 'boardModule'

import NaviTest from "@/components/NaviTest.vue"
import BoardListForm from "@/components/board/BoardListForm.vue";
export default {
    components: {
        NaviTest,
        BoardListForm
    },
    computed: {
        ...mapState(boardModule, ['boards']),
        // output() {
        //     console.log('이게 뭐하는 거지..?')
    },
    mounted() {
        //vue의 action 호출
        this.requestBoardListToSpring()
    },
    methods: {
        //vuex의 action을 method에 맵핑
        ...mapActions(
            boardModule, ['requestBoardListToSpring']
        )
    }
}
</script>
<style></style>