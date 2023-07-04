<template lang="">
  <div>
    <div>
      <tr>
        <td>
          <v-container class="table">
            <div>                      
              <stock-list-form :stocks="stocks"/>
          </div>       
          </v-container>        
        </td>
        <!-- <td>
          <v-container class="table"> 
            <button @click=toBoardListPage()>Board List</button> 
          </v-container>     
        </td> -->
      </tr>
    </div>          
  </div>
</template>
<script>
import StockListForm from '@/domain/stock/components/StockListForm.vue';
import { mapActions, mapState } from 'vuex';

const stockModule = 'stockModule'

export default {

  components: {
    StockListForm,
  },
  methods: {
    ...mapActions(
      stockModule, ['requestStockListToSpring']
    ),
    // toBoardListPage() {
    //   this.$router.push({
    //     name: 'BoardListPage'
    //   })
    // },
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
</style>