<template lang="">
  <div>
      <h3>주식 목록</h3>
      <table style="margin: 10px;">
          <tr>
              <th align="center" width="30%">티커</th>
              <th align="center" width="80%">주식</th>
          </tr>
          <tr v-if="!stocks || (Array.isArray(stocks) && stocks.length === 0)">
              <td colspan="3">
                  현재 등록된 게시물이 없습니다!
              </td>
          </tr>
          <tr v-else v-for="stock in stocks" :key="stock.ticker">              
              <td align="center">
                  <router-link :to="{ 
                      name: 'StockMainPage', 
                      params: { ticker: stock.ticker.toString() }}">
                          {{ stock.ticker }}
                  </router-link>
                  
                </td>
              <td align="center">
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
      }
  },
  
  
}
</script>

<style lang="">
  
</style>