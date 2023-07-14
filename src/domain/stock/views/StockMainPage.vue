<template>
  <div>
    <div>
      <h1>{{ stockName }}</h1>
    </div>
    <div style="border: 2px solid skyblue;">
      <chart-display-form :ticker="ticker" />
    </div>
    <div>
      <div style="border: 2px solid skyblue;">
        <board-list-form :boards="boards" :ticker="ticker" />
        <div>
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
      <div style="border: 2px solid skyblue;">
        <v-container>
          <chat-form :ticker="ticker" />
        </v-container>
      </div>
      <div>
        <v-container>
          <article-display-form :articles="articles" />
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
import ArticleDisplayForm from '@/domain/article/components/ArticleDisplayForm.vue';

const boardModule = 'boardModule'
const stockMoudle = 'stockModule'
const articleModule = 'articleModule'

export default {
    components: { 
        BoardListForm,
        ChartDisplayForm,
        ChatForm,
        ArticleDisplayForm,
    },
    props: {
        ticker: {
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
        ...mapState(stockMoudle, ['stock']),
        ...mapState(articleModule, ['articles']),
        stockName() {return this.stock.stockName;}
    },
    async created() {
        await this.requestBoardListToSpring(this.ticker);
        await this.requestStockToSpring(this.ticker);
        this.requestAritcleListToFastApi(this.stock.stockName);
    },
    methods: {
        ...mapActions(boardModule, ['requestBoardListToSpring']),
        ...mapActions(stockMoudle, ['requestStockToSpring']),
        ...mapActions(articleModule, ['requestAritcleListToFastApi'])
    }
}
</script>

<style lang="">
    
</style>