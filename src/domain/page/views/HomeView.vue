<template>
  <div style="height: 100vh; padding: 100px;">
    <div style="display: flex; flex-direction: row; justify-content: center; position: sticky; top: 64px;">
      <v-card class="table" style="width: 700px;">
        <v-container>
          <stock-list-form 
          :stocks="stocks" 
          :nowPage="nowPage" 
          :totalStockPages="totalStockPages"
          :totalOpinionPages="totalOpinionPages"
          @sort-item-selected="handleSortItemUpdate"                                             
          @ascending-selected="handleAscendingSelectedUpdate"                               
          @update-now-page="handleNowPageUpdate"
          @update-mode="handleUpdateMode"/>
        </v-container>
      </v-card>
      <v-card class="chat-table" style="width: 500px; position: sticky; top: 64px; right: 0; height: calc(60vh - 64px);">
        <v-container>
          <chat-form :ticker="ticker"/>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import StockListForm from '@/domain/stock/components/StockListForm.vue';
import ChatForm from '@/domain/chat/components/ChatForm.vue'
import { mapActions, mapState } from 'vuex';

const stockModule = 'stockModule'

export default {
  data() {
    return {
      nowPage: 1,
      ticker: "1",
      selectedSortItem:'open',
      selectedAscending: 'desc' ,
      totalStockPages: 1,
      totalOpinionPages: 1,
    }
  },
  components: {
    StockListForm,
    ChatForm,
  },
  methods: {
    ...mapActions(
      stockModule, [
        'requestStockListToSpring', 
        'requestOpinionListToSpring', 
        'requestStockPageNumToSpring',
        'requestOpinionPageNumToSrping'
      ]
    ),  
    handleUpdateMode(mode) {
      if (mode === 'stock') {
          this.selectedSortItem = 'open';
          this.fetchStockList();
        } else if (mode === 'sentiment') {
          this.selectedSortItem = 'positiveCount';
          this.fetchOpinionList();
        }
    },
    handleSortItemUpdate(selectedSortItem) {
      this.selectedSortItem = selectedSortItem;
      if (
            selectedSortItem === "open" ||
            selectedSortItem === "close" ||
            selectedSortItem === "rangeValue" ||
            selectedSortItem === "fluctuationRate" ||
            selectedSortItem === "volume"
          ) {
            this.fetchStockList();
          } else if (
            selectedSortItem === "positiveCount" ||
            selectedSortItem === "negativeCount" ||
            selectedSortItem === "naturalCount" ||
            selectedSortItem === "totalSentimentScore"
          ) {
            this.fetchOpinionList();
          }
    },
    handleAscendingSelectedUpdate(selectedAscending) {
      this.selectedAscending = selectedAscending;
      if (
            this.selectedSortItem === "open" ||
            this.selectedSortItem === "close" ||
            this.selectedSortItem === "rangeValue" ||
            this.selectedSortItem === "fluctuationRate" ||
            this.selectedSortItem === "volume"
          ) {
            this.fetchStockList();
          } else if (
            this.selectedSortItem === "positiveCount" ||
            this.selectedSortItem === "negativeCount" ||
            this.selectedSortItem === "naturalCount" ||
            this.selectedSortItem === "totalSentimentScore"
          ) {
            this.fetchOpinionList();
          }    
        },
    handleNowPageUpdate(nowPage) {
      this.nowPage = nowPage
      if (
            this.selectedSortItem === "open" ||
            this.selectedSortItem === "close" ||
            this.selectedSortItem === "rangeValue" ||
            this.selectedSortItem === "fluctuationRate" ||
            this.selectedSortItem === "volume"
          ) {
            this.fetchStockList();
          } else if (
            this.selectedSortItem === "positiveCount" ||
            this.selectedSortItem === "negativeCount" ||
            this.selectedSortItem === "naturalCount" ||
            this.selectedSortItem === "totalSentimentScore"
          ) {
            this.fetchOpinionList();
          }        
        },
    fetchStockList() {
      const payload = {
          OCVA: this.selectedSortItem,
          ascending: this.selectedAscending,
          pageNumber: this.nowPage
        }
      this.requestStockListToSpring(payload);
    },
    fetchOpinionList() {
      const payload = {
          sortItem: this.selectedSortItem,
          ascending: this.selectedAscending,
          pageNumber: this.nowPage
        }
        this.requestOpinionListToSpring(payload);
    },
    async fetchStockPageNum() {
      this.totalStockPages = await this.requestStockPageNumToSpring();
    },
    async fetchOpinioPageNum() {
      this.totalOpinionPages = await this.requestOpinionPageNumToSrping();
    }
  },
  computed: {
    ...mapState(stockModule, ['stocks']),
  },
  mounted () {
    this.fetchStockList();
    this.fetchStockPageNum();
    this.fetchOpinioPageNum()
  },
}
</script>
<style lang="css">
.table {
    width: 100%;
    border: 1px solid #444444;
  }
.chat-table{
  width: 100%;
  border: 1px solid #444444;
}
</style>