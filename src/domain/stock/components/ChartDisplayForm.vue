<template lang="">
    <div>
        <apexchart
            type="candlestick"
            :options="chartOptions.chart"
            :series="chartOptions.series"
            height="350"
            />
    </div>
</template>

<script>
import axiosInst from "@/utility/axiosInst";

export default {
    data() {
    return {
      chartOptions: {
        series: [
          {
            name: "candle",
            data: [ ],
          },
        ],
        chart: {
          type: "candlestick",
          height: 350
        },
        title: {
          text: "CandleStick Chart",
          align: "left"
        },
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      }
    };
  },
  mounted() {
    axiosInst.fastApi.get('/stock/test')
    .then(response => {
        const data = response.data; // JSON 데이터 수신
        this.chartOptions.series[0].data = data; // 차트 데이터로 설정
        new ApexCharts(this.$refs.chart, this.chartOptions).render(); // 차트 렌더링
      })
      .catch(error => {
        console.error('데이터를 받아오는 동안 오류가 발생했습니다.', error);
      });
  }
}
</script>

<style lang="">
    
</style>