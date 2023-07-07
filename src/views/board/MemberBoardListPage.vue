<template lang="">
    <div>
        <member-board-list-form :boards="boards"/>
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
        )
    }
}
</script>
<style>
    
</style>