<template lang="">
    <div>
        <board-list-form :boards="boards"/>
        <div style="text-align: left; margin: 15px;">
            <router-link :to="{ 
                name: 'BoardRegisterPage',
                params: { ticker: ticker.toString() }}">
                게시물 작성
            </router-link>            
        </div>        
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import BoardListForm from '@/domain/board/components/BoardListForm.vue';

const boardModule = 'boardModule'

export default {
    components: { BoardListForm },
    props: {
        ticker: {
            type: String,
            required: true,
        }
    },
    data () {
        return {
        }
    },
    computed: {
        ...mapState(boardModule, ['boards']),
    },
    created () {
        this.requestBoardListToSpring(this.ticker)
    },
    methods: {
        ...mapActions(
            boardModule, ['requestBoardListToSpring']
        )
    }
}
</script>

<style lang="">
    
</style>