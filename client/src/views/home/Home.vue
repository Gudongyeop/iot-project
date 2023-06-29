<template>
<div>
  <div class="header d-flex align-center justify-content-center  px-16">
      <p class="text-center font-weight-bold mb-0" style="color: white; font-size: 3.5vw; line-height:170%">
        2주간 (8.16~29) 서울, 경기 지역<br> 사회적 거리 두기 2단계 격상
      </p>
    </div>
  <v-container fluid grid-list-md >
    <v-layout row wrap justify-center class="mt-7">
      <!-- ------------------------ssafyTodayTempCnt-------------------------->
      <v-flex d-flex justify-space-around mb6 xs12 md4 flex-grow-2 class="mx-3">
        <div style="width: -webkit-fill-available;">
         <FindTodayCnt /> 
        </div>
      </v-flex>
      <!-- ------------------------학생검색-------------------------->      
      <v-flex d-flex justify-space-around xs12 md4 class="mx-3">
        <div style="width: -webkit-fill-available;">
        <FindStudent /> 
       </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <!-- ------------------------coronaGraph-------------------------->
      <v-flex d-flex justify-space-around xs12 md4 class="mx-3">
        <div style="width: -webkit-fill-available;">
          <h3 style="text-align : left;" >코로나 확진자 그래프</h3>       
          <hr style="border: 1px solid black;">
        <CoronaGraph />
        </div>
      </v-flex>
      <!-- ------------------------coronaNews-------------------------->
      <v-flex d-flex justify-space-around mb6 xs12 md4 class="mx-3">
        <div style="width: -webkit-fill-available;" class="text-left">
          <CoronaNews :coronaArticles="coronaArticles" :lastUpdate="lastUpdate" @refresh="refreshNews"/>
        </div>
      </v-flex>
    </v-layout>
  </v-container></div>
</template>


<script>
import CoronaGraph from '@/components/home/CoronaGraph.vue'
import CoronaNews from '@/components/home/CoronaNews.vue'
import FindStudent from '@/components/home/FindStudent.vue'
import FindTodayCnt from '@/components/home/FindTodayCnt.vue'
import { mapGetters, mapActions } from 'vuex'

const homeStore = 'homeStore'
export default {
  name: 'Home',
  components:{
    CoronaGraph,
    CoronaNews,
    FindStudent, 
    FindTodayCnt,
  },
  data () {
      return {
        coronaData: [],
        coronaArticles:[],
        lastUpdate: [],
      }
    },
  computed:{
    ...mapGetters(homeStore, [
        'news',
    ]),
  },
  watch:{
    news: { 
      deep: true,
      handler() {
        this.coronaData = this.news
      }
    },
    coronaData() {
      this.getCoronaArticles()
    },
  },
  methods:{
    ...mapActions(homeStore,[
      'getnews',
      'refreshnews',
    ]),
    getCoronaArticles() {
      this.coronaArticles = this.coronaData.slice(0, 20)
      this.lastUpdate = this.coronaData.slice(20, )
    },
    refreshNews() {
      this.refreshnews()
    },
  },
  created() {
    this.getnews()
  },  
}

</script>

<style scoped>
.outlined {
  border: none;
}
.container.grid-list-md .layout .flex {
    padding: 10px;
}
.header {
  position:relative;
  z-index:1;
  height: 20vw;
  background-image: url("../../assets/doctor.jpg");
  background-position: center center;
  background-size: cover;

}
.header::after {
  position:absolute;
  background-size:cover;
  opacity:0.5!important;
  filter:alpha(opacity=50);
  z-index:-1;
  content:"";
  width:100%;
  height:20vw;
  background-color: rgba(0,0,0,0.9);
}
</style>