<template>
    <div>
        <div style="padding-top: 90px">
            <template>
                <div class="card" style="width: 500px; margin: auto;">
                    <div class="card-body">
                        <h5 class="card-title">게시물 등록 페이지</h5>
                        <BoardRegisterForm @submit="onSubmit" />
                    </div>
                </div>
            </template>
        </div>

    </div>
</template>
<script>
import NaviTest from '@/components/NaviTest.vue'
import BoardRegisterForm from '@/components/board/boardRegisterForm.vue'

import { mapActions } from 'vuex';

const boardModule = 'boardModule'

export default {
    components: {
        NaviTest,
        BoardRegisterForm
    },
    methods: {
        ...mapActions(
            boardModule, ['requestRegisterBoardToSpring']
        ),
        async onSubmit(payload) {
            const { title, content } = payload
            await this.requestRegisterBoardToSpring({ title, content })
        }
    }

}
</script>
<style></style>