<template lang="">
    <div>
        <h2>게시물 작성</h2>
        <board-register-form @submit="onSubmit" :ticker="ticker"/>
    </div>
</template>

<script>
import BoardRegisterForm from '../components/BoardRegisterForm.vue';
import { mapActions } from 'vuex';

const boardModule = 'boardModule'

export default {
    props: {
        ticker: {
            type: String,
            required: true,
        },
    },
    components: {
        BoardRegisterForm,
    },
    name: "BoardRegisterPage",
    methods: {
        ...mapActions(
            boardModule, ['requestCreateBoardToSpring']
        ),
        async onSubmit (payload) {
            const board = await this.requestCreateBoardToSpring(payload)
            await this.$router.push({
                name: 'BoardReadPage',
                params: { id: board.data.id.toString() }
            })
        }
    }
}
</script>

<style lang="">
    
</style>