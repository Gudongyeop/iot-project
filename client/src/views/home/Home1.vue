<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap justify-center>
      <!-- ------------------------ssafyTodayTempCnt-------------------------->
      <v-flex d-flex justify-space-around mb6 xs12 sm12 md4 flex-grow-2>
        <div style="width: -webkit-fill-available;">
         <FindTodayCnt /> 
        </div>
      </v-flex>
      <!-- ------------------------학생검색-------------------------->      
      <v-flex d-flex justify-space-around xs12 sm12 md4>
        <div style="width: -webkit-fill-available;">
        <FindStudent /> 
       </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <!-- ------------------------coronaGraph-------------------------->
      <v-flex d-flex justify-space-around xs12 sm12 md4>
        <CoronaGraph />
      </v-flex>
      <!-- ------------------------coronaNews-------------------------->
      <v-flex d-flex justify-space-around mb6 xs12 sm12 md4 >
        <div style="width: -webkit-fill-available;">
          <h3 style="text-align : left;" >코로나 뉴스</h3>       
          <hr style="border: 1px solid black;">
          <CoronaNews :coronaArticles="coronaArticles" :lastUpdate="lastUpdate" @refresh="refreshNews"/>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
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
        student: {},
        //-------------
        coronaData: [],
        coronaArticles:[],
        lastUpdate: [],
        //-------------
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

<style>
.outlined {
  border: none;
}
.container.grid-list-md .layout .flex {
    padding: 10px;
}
</style>