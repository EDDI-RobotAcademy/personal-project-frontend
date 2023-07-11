<template lang="">
    <div>
        <div style="width: 600px; height: 600px; overflow: auto; border: 2px solid skyblue;">
            <chart-display-form/>
        </div>
        <div style="width: 600px; height: 600px; overflow: auto; border: 2px solid skyblue;">
            <board-list-form :boards="boards" :stockName="stockName"/>
            <div style="text-align: left; margin: 15px;">
                <router-link :to="{ 
                    name: 'BoardRegisterPage',
                    params: { ticker: ticker.toString() }}">
                    게시물 작성
                </router-link>            
            </div>        
        </div>
    </div>    
</template>

<script>
import { mapActions, mapState } from 'vuex';
import BoardListForm from '@/domain/board/components/BoardListForm.vue';
import ChartDisplayForm from '@/domain/stock/components/ChartDisplayForm.vue'

const boardModule = 'boardModule'

export default {
    components: { 
        BoardListForm,
        ChartDisplayForm,
    },
    props: {
        ticker: {
            type: String,
            required: true,
        },
        stockName: {
            type: String,
            required: true,
        },
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