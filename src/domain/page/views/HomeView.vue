<template>
  <div style="height: 100vh;">
    <div style="display: flex; flex-direction: row; justify-content: center; position: sticky; top: 64px;">
      <div class="table" style="width: 700px;">
        <v-container>
          <stock-list-form :stocks="stocks" />
        </v-container>
      </div>
      <div class="chat-table" style="width: 500px; position: sticky; top: 64px; right: 0; height: calc(60vh - 64px);">
        <v-container>
          <chat-form />
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import StockListForm from '@/domain/stock/components/StockListForm.vue';
import ChatForm from '@/domain/chat/components/ChatForm.vue'
import { mapActions, mapState } from 'vuex';

const stockModule = 'stockModule'

export default {

  components: {
    StockListForm,
    ChatForm,
  },
  methods: {
    ...mapActions(
      stockModule, ['requestStockListToSpring']
    ),  
  },
  computed: {
    ...mapState(stockModule, ['stocks'])
  },
  mounted () {
    this.requestStockListToSpring()
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