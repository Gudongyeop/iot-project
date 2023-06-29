<template>
<v-container class="corona pa-0">
    <v-card
        class="text-center"
        style="box-shadow: none; width: -webkit-fill-available;"
        light
    >
        <v-container class="corona-graph pa-0">
            <Line-chart style="height: 100%;" v-if="loaded" :chartData="datacollection" :options="options"></Line-chart>
        </v-container>
        
        <v-divider class="ma-0 pa-0"></v-divider>

        <v-card-actions class="justify-center">
            <v-btn block text href="https://search.naver.com/search.naver?sm=top_sug.pre&fbm=0&acr=1&acq=%EC%BD%94%EB%A1%9C%EB%82%98&qdt=0&ie=utf8&query=%EC%BD%94%EB%A1%9C%EB%82%98+%ED%99%95%EC%A7%84%EC%9E%90" target="_blank" >COVID-19 바로가기</v-btn>
        </v-card-actions>
        
    </v-card>
    </v-container>
</template>

<script>
  import LineChart from './LineChart.js'
  export default {
    name: 'CoronaGraph',
    components: {
      LineChart
    },    
    data () {
      return {
        yMax: 0,
        yMin: 0,
        decideCntLists: [],
        clearCntLists:[],
        coronaDates: [],
        datacollection: null,
        options: {},
        loaded: false,
        coronaData: null,
      }
    },
    async mounted () {
        this.loaded = false
        this.$axios.get('api/corona')
        .then(res=>{
            this.coronaData = res.data.slice(0, 8)
            this.getDecideCnt()
            this.fillData()
            this.loaded=true
        })
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: this.coronaDates,
          datasets: [
            {
              label: '일자별 국내 확진자',
              fill: false,
              pointBorderColor: '#9b1b30',
              borderColor: '#9b1b30',
              borderWidth: 3,
              data: this.decideCntLists
            },
            {
              label: '일자별 국내 완치자',
              fill: false,
              pointBorderColor: '#0f4c81',
              borderColor: '#0f4c81',
              borderWidth: 3,
              data: this.clearCntLists
            },
          ]
        },
        this.options = {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              padding: 30
            }
          },
          plugins: {
            datalabels: {
              color: 'black',
              anchor: 'end',
              align: 'top',
              font:{
                size: 15
              }
            }
          },
          layout: {
            padding: {
              top: 40
            }
          },
          scales: {
            yAxes: [{
              ticks: {
                max: this.ceilYMax,
                min: this.floorYMin,                
                stepSize: 10,   
                display : false             
              },
              gridLines: {
                display: false,
              },
              
            }],
            xAxes: [{
              ticks:{
                fontSize :18
              },
              gridLines: {
                display: false
              },
            }]
          },
          responsive: true,
          maintainAspectRatio: false
         
        }
      },
      getDecideCnt() {
        let de_Min = 10000;
        let cl_Min = 10000;
        let de_Max =0;
        let cl_Max = 0;
        for (let index = this.coronaData.length-1; index > 0 ; index--) {
          const de_to = this.coronaData[index-1].decideCnt;
          const de_ye = this.coronaData[index].decideCnt;
          const cl_to = this.coronaData[index-1].clearCnt;
          const cl_ye = this.coronaData[index].clearCnt;
          if (de_to-de_ye >= de_Max) {
            de_Max = de_to-de_ye
          }
          if (de_to-de_ye <= de_Min) {
            de_Min = de_to-de_ye
          }
          if (cl_to-cl_ye >= cl_Max) {
            cl_Max = cl_to-cl_ye
          }
          if (cl_to-cl_ye <= cl_Min) {
            cl_Min = cl_to-cl_ye
          }
          const date = this.coronaData[index].stateDt.toString()
          const stateDate = date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8)
          this.coronaDates.push(this.$moment(stateDate).format('MM.DD'));
          this.decideCntLists.push(de_to-de_ye);
          this.clearCntLists.push(cl_to-cl_ye);
        }
        this.yMin = (de_Min <= cl_Min) 
                    ? de_Min
                    : cl_Min

        this.yMax = (de_Max <= cl_Max)
                    ? cl_Max
                    : de_Max              
      },
    },
    computed: {
      ceilYMax() {
        return (Math.ceil(this.yMax/10)+2) * 10
      },
      floorYMin() {
        return Math.floor(this.yMin/10) * 10
      }
    }
  }
</script>

<style scoped>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
  .corona {
    height: 611px;
  }
  .corona-graph {
    height: 529px;
  }
</style>