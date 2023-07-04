<template lang="">
    <div>
        <h2>게시물 수정</h2>
        <board-modify-form v-if="board" :board="board" @submit="onSubmit"/>
        <p v-else>로딩중 .......</p>
    </div>
</template>

<script>
import BoardModifyForm from '../components/BoardModifyForm.vue';
import { mapActions, mapState } from 'vuex';

const boardModule = 'boardModule'

export default {
    components: {
        BoardModifyForm,
    },
    props: {
        id: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState(boardModule, ['board'])
    },
    methods: {
        ...mapActions(
            boardModule, ['requestBoardToSpring', 'requestBoardModifyToSpring']
        ),
        async onSubmit (payload) {
            const { title, content, writer } = payload
            const id = this.id

            await this.requestBoardModifyToSpring({ title, content, writer, id })
            await this.$router.push({
                name: 'BoardReadPage',
                params: { id: this.id }
            })
        }
    },
    created () {
        this.requestBoardToSpring(this.id)
    }
}
</script>

<style lang="">
    
</style>