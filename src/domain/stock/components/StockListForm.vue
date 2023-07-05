<template lang="">
  <div>
    <h3>주식 목록</h3>
    <table class="stock-table" style="margin: 10px; width: 100%;">
      <tr>
        <th style="text-align: center; width: 50%; padding: 0 5px;">티커</th>
        <th style="text-align: center; width: 50%; padding: 0 5px;">주식</th>
      </tr>
      <tr
        v-if="!stocks || (Array.isArray(stocks) && stocks.length === 0)"
      >
        <td colspan="2" style="text-align: center;">
          현재 등록된 게시물이 없습니다!
        </td>
      </tr>
      <tr
          v-else
          v-for="stock in stocks"
          :key="stock.ticker"
          @click="navigateToStockMainPage(stock.ticker, stock.stockName)"
        >
        <td style="text-align: center; padding: 0 5px;">
          {{ stock.ticker }}
        </td>
        <td style="text-align: center; padding: 0 5px;">
          {{ stock.stockName }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    stocks: {
      type: Array,
    },
  },
  methods: {
  navigateToStockMainPage(ticker, stockName) {
    this.$router.push({
      name: "StockMainPage",
      params: { ticker: ticker.toString(), stockName: stockName },
    });
  },
},
};
</script>

<style>
    .stock-table tr:not(:first-child) {
    background-color: #f2f2f2;
    cursor: pointer; /* 마우스를 올릴 때 손가락 모양으로 변경 */
    border-radius: 4px; /* 테이블 행의 모서리를 둥글게 설정 */
    margin-bottom: 5px; /* 테이블 행 간의 여백을 확보 */
  }

  .stock-table tr:not(:first-child):hover {
    background-color: #e0e0e0;
    /* 마우스 호버 시 스타일 변경 */
  }

  .stock-table th,
  .stock-table td {
    text-align: center;
    padding: 0 5px;
  }
</style>