<template lang="">
    <div>
        <h2>게시물 작성</h2>
        <board-register-form @submit="onSubmit" 
        :ticker="ticker"
        :nickname="nickname"
        />
    </div>
</template>

<script>
import BoardRegisterForm from '../components/BoardRegisterForm.vue';
import { mapActions } from 'vuex';

const boardModule = 'boardModule'
const accountModule = 'accountModule'

export default {
    data () {
        return {
            nickname: ''
        }
    },
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
        ...mapActions(boardModule, ['requestCreateBoardToSpring']),
        ...mapActions(accountModule, [ 'requestNicknameToSpring' ]),
        async onSubmit (payload) {
            const board = await this.requestCreateBoardToSpring(payload)
            await this.$router.push({
                name: 'BoardReadPage',
                params: { ticker: board.data.ticker.toString(), id: board.data.id.toString() }
            })
        }
    },
    async mounted() {      
        const res = await this.requestNicknameToSpring()
        this.nickname = res.nickname
    },
}
</script>

<style lang="">
    
</style>