<template lang="">
    <div>
        <div>
            <my-board-list-form :boards="boards" :totalPage="totalPage" @sendPage="sendPage"
            />
        </div>
    </div>
</template>

<script>
import MyBoardListForm from '../../components/board/MyBoardListForm.vue';

import { mapActions, mapState } from 'vuex';

const boardModule = 'boardModule'

export default {
    data() {
        return {
            userToken: '',
            totalPage: 0,
            page: 1
        }
    },
    components: {
        MyBoardListForm
    },
    computed: {
        ...mapState(boardModule, ['boards']),
    },
    methods: {
        ...mapActions(
            boardModule, ['requestMyBoardListToSpring', 'requestBoardListWithPageToSpring', 'requestMyBoardTotalPage']
        ),
        async sendPage(page) {
            console.log('sendPage')
            const userToken = localStorage.getItem("userToken")
            this.requestMyBoardListToSpring({ userToken, page })
            this.totalPage = await this.requestMyBoardTotalPage(userToken)
        }

    },
    created() {
        // console.log('created')
        // const userToken = localStorage.getItem("userToken")
        // const page = this.page
        // this.requestMyBoardListToSpring({ userToken, page })
    },
}
</script>
<style scoped></style>