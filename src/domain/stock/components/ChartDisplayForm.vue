<template>
  <div v-if="isLoading">
    <h2>Loading...</h2>
  </div>
    <!-- Chart controls -->
    <div v-else="!isLoading">    
      <div>
        <v-row align="center" no-gutters>
          <v-col cols="3">
            <v-select
              label="Period"
              :items="periods"
              v-model="period"
              @change="setInitialInterval(); fetchData()"
              dense
              style="width: 50%; padding-top: 16px; padding-bottom: 16px;"
              prepend-icon="mdi-calendar"
            >
            </v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              label="Interval"
              :items="availableIntervals"
              v-model="interval"
              @change="fetchData"
              dense
              style="width: 50%; padding-top: 16px; padding-bottom: 16px; "
              prepend-icon="mdi-clock-outline"
            >
            </v-select>
          </v-col>          
        </v-row>
      </div>
    <apexchart
      v-if="!isLoading"
      type="candlestick"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import axiosInst from '@/utility/axiosInst';

export default {
  props: {
        ticker: {
            type: String,
            required: true,
        },
    },
  data() {
    return {
      isLoading: true,
      intervals: [
        "1m", "2m", "5m", "15m", "30m", "60m", "90m", "1d", "5d", "1wk", "1mo", "3mo"
      ],
      periods: [
        "1d", "5d", "1mo", "3mo", "6mo", "1y", "5y", "10y", "max"
      ],
      interval: "1m", // 기본값으로 1m 설정
      period: "1d", // 기본값으로 1d 설정
      chartOptions: {
        chart: {
          type: 'candlestick',
          height: '100%',
          zoom: {
            enabled: false
          }
        },
        plotOptions: {
          candlestick: {
            wick: {
              useFillColor: true,
            }
          }
        },
        xaxis: {
          type: 'category', 
          labels: {
            show: true,
            rotate: -45,
            formatter: (value) => {
              // 'YYYY-MM-DD HH:mm' 형식의 문자열로 반환합니다.
              return new Date(value).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              });
            },
          }
        },
        yaxis: {
          tooltip: {
            enabled: true
          },
        },
      },
      series: [
        {
          name: 'OHLC',
          data: []
        }
      ],
    };
  },
  mounted() {
    this.fetchData();
    this.setInitialInterval();
    this.fetchData(); 
  },
  methods: {
    async fetchData() {
      try {        
        const response = await axiosInst.fastApi
        .get(`/stock/${this.ticker}/${this.period}/${this.interval}`);
        const formattedData = response.data.map((item) => {
          return {
            x: new Date (item.Date),
            y: [item.Open, item.High, item.Low, item.Close],
          };
        });
        
        this.$set(this.series, 0, { name: 'OHLC', data: formattedData }); // updated line

        this.series[0].data = formattedData;
        console.log("formmated data", formattedData)
        this.isLoading = false;
      } catch (error) {
        console.error("An error occurred while fetching the data:", error);
      }
    },
    setInitialInterval() {
    if (this.period === "1d") {
      this.interval = "5m";
    } else if (this.period === "5d") {
      this.interval = "60m";
    } else if (this.period === "1mo") {
      this.interval = "90m";
    } else if (this.period === "3mo") {
      this.interval = "1d";
    } else if (this.period === "6mo") {
      this.interval = "1d";
    } else if (this.period === "1y") {
      this.interval = "5d";
    } else if (this.period === "5y") {
      this.interval = "1wk";
    } else if (this.period === "10y") {
      this.interval = "1mo";
    } else if (this.period === "max") {
      this.interval = "1mo";
    }
    // 다른 period에 대한 기본 인터벌도 여기에 추가하십시오
  },
  },
  computed: {
    // 변경된 부분: 선택 가능한 intervals와 함께 period에 따른 조건 추가
    availableIntervals() {
      if (this.period === "1d") {
        return this.intervals.slice(0, 7);
      } else if (this.period === "5d") {
        return this.intervals.slice(4, 8);
      } else if (this.period === "1mo") {
        return this.intervals.slice(5, 9);
      } else if (this.period === "3mo") {
        return this.intervals.slice(7, 10);
      } else if (this.period === "6mo") {
        return this.intervals.slice(7, 10);
      } else if (this.period === "1y") {
        return this.intervals.slice(7, 11);
      } else if (this.period === "5y") {
        return this.intervals.slice(8, 12);
      } else if (this.period === "10y") {
        return this.intervals.slice(9, 12);
      } else if (this.period === "max") {
        return this.intervals.slice(9, 12);
      }
 
      return this.intervals;
    },
  },
};
</script>
