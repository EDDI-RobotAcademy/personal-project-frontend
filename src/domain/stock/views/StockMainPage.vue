<template>
    <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
      <div style="width: 1200px; border: 2px solid skyblue;">
        <chart-display-form :ticker="ticker" />
      </div>
      <div style="display: flex; margin-top: 20px;">
        <div style="width: 600px; height: 600px; overflow: auto; border: 2px solid skyblue;">
          <board-list-form :boards="boards" :stockName="stockName" :ticker="ticker" />
          <div style="text-align: left; margin: 15px;">
            <router-link
              :to="{
                name: 'BoardRegisterPage',
                params: { ticker: ticker.toString() }
              }"
            >
              게시물 작성
            </router-link>
          </div>
        </div>
        <div class="chat-table" style="width: 500px; position: sticky; top: 64px; right: 0; height: calc(60vh - 64px);">
          <v-container>
            <chat-form :ticker="ticker" />
          </v-container>
        </div>
      </div>
    </div>
  </template>  

<script>
import { mapActions, mapState } from 'vuex';
import BoardListForm from '@/domain/board/components/BoardListForm.vue';
import ChartDisplayForm from '@/domain/stock/components/ChartDisplayForm.vue'
import ChatForm from '@/domain/chat/components/ChatForm.vue';

const boardModule = 'boardModule'

export default {
    components: { 
        BoardListForm,
        ChartDisplayForm,
        ChatForm,
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