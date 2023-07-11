<template lang="">
    <div>
        <div>
            <member-board-list-form :boards="boards"/>
        </div>
    <div>
        <router-link to="/member-board-register-page">
            <v-btn class="register_btn"
                outlined
                color="black">게시글 쓰기
            </v-btn>
        </router-link>
    </div>
    </div>
</template>

<script>
import MemberBoardListForm from '../../components/board/MemberBoardListForm.vue';

import { mapActions, mapState } from 'vuex';

const boardModule = 'boardModule'

export default {
    components:{
        MemberBoardListForm
    },
    computed: { 
        ...mapState(boardModule, ['boards']),
    },
    mounted () {
        this.requestBoardListToSpring()
    },
    methods: {
        ...mapActions(
            boardModule, ['requestBoardListToSpring']
        ),
    }
}
</script>
<style>
.register_btn{
position: absolute;
top: 5%;
right: 14%
}
</style>