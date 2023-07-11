<template lang="">
    <div>
        <h2>{{ board.title }}</h2>
        <board-read-form v-if="board" :board="board"/>
        <p v-else>로딩중 .......</p>
        <router-link :to="{ name: 'BoardModifyPage', params: { id: board.id }}">
            게시물 수정
        </router-link>
        <button @click="onDelete">삭제</button>
        <router-link :to="{ name: 'StockMainPage' }">
            돌아가기
        </router-link>
    </div>
</template>

<script>
import BoardReadForm from '../components/BoardReadForm.vue'
import { mapActions, mapState } from 'vuex';

const boardModule = 'boardModule'

export default {
    components: {
        BoardReadForm
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        ticker: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapState(boardModule, ['board'])
    },
    methods: {
        ...mapActions(
            boardModule, ['requestBoardToSpring', 'requestDeleteBoardToSpring']
        ),
        async onDelete() {
            const payload = {
                ticker: this.ticker,
                id: this.id,
            };
            await this.requestDeleteBoardToSpring(payload);
            await this.$router.push({ name: 'StockMainPage' });
            },
        async fetchData() {
            const payload = {
            ticker: this.ticker,
            id: this.id,
            };
            await this.requestBoardToSpring(payload);
        },
    },
    created () {
        this.fetchData();
    }
}
</script>
<style lang="">
    
</style>