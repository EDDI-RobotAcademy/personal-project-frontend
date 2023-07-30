<template>
  <div style="padding: 100px;">
    <h1>{{ stockName }}</h1> 
    <div style="display: flex; justify-content: center;">
      <div>
      <div style="display: flex; justify-content: center; padding: 10px;">
        <v-card elevation="3" height="850" width="1200" rounded>
          <chart-display-form :ticker="ticker" />
        </v-card>
      </div>
      <div style="display: flex; justify-content: center;">
        <div>
          <v-container>
            <v-card elevation="3" height="700" width="590" rounded>
              <article-display-form :isArticleLoading="isArticleLoading" :articles="articles" @update-now-page="handleNowPageUpdate" />
            </v-card>
          </v-container>
        </div>
        <div>
          <v-container>
            <v-card elevation="3" height="700" width="590" rounded>
              <board-list-form :boards="boards" :ticker="ticker" />
            </v-card>
          </v-container>
        </div>
      </div>
    </div>  
    <div>
      <v-container>
        <v-card elevation="3" height="600" width="600" rounded>
          <chat-form :ticker="ticker" />
        </v-card>
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
          nowPage: '1',
          isArticleLoading: false // 추가: 초기값으로 false 설정
        }
    },
    computed: {
        ...mapState(boardModule, ['boards']),
        ...mapState(stockMoudle, ['stock']),
        ...mapState(articleModule, ['articles']),
        stockName() {return this.stock.stockName;}
    },
    async created() {
        await this.requestStockToSpring(this.ticker);
        const payload = { stockName: this.stock.stockName, nowPage: this.nowPage };
        await this.requestBoardListToSpring(this.ticker);
        await this.loadArticles(payload);
    },
    methods: {
        ...mapActions(boardModule, ['requestBoardListToSpring']),
        ...mapActions(stockMoudle, ['requestStockToSpring']),
        ...mapActions(articleModule, ['requestAritcleListToFastApi']),
        async loadArticles(payload) {
          this.isArticleLoading = false;
          await this.requestAritcleListToFastApi(payload);
          setTimeout(() => {
                this.isArticleLoading = true;
              }, 300);
            },
        async handleNowPageUpdate(value) {
          this.nowPage = value;
          const payload = { stockName: this.stock.stockName, nowPage: this.nowPage };
          await this.loadArticles(payload);
        },
    }
}
</script>

<style>
 
</style>