<template>
  <div class="">
    <div class="header d-flex justify-center align-center px-16">
      <p class="text-center mb-0 font-weight-bold" style="color: white; font-size: 4vh;">
        체온 확인
      </p>
    </div>

    <v-container id="dropdown-example" style="max-width: 1100px;" >
      <v-row>
        <v-col cols="12" sm="2">
          <v-select
            class="my-2"
            color="#0f4c81"
            :items="options.optionsArea"
            label="지역"
            target="#dropdown-example"  
            v-model="selectedArea"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="2">
          <v-select 
            color="#0f4c81"
            class="my-2"
            :items="options.optionsGisu"
            label="기수" 
            target="#dropdown-example"
            v-model="selectedGisu"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="2">
          <v-select
            color="#0f4c81"
            class="my-2"
            :items="(selectedGisu == 3) ? options.optionsClass6 : options.optionsClass16"
            label="반"
            target="#dropdown-example"
            v-model="selectedClass"
            multiple
          ></v-select>
        </v-col >
         <v-col cols="12" sm="4">
          <div class="search">
            <v-text-field
              color="#0f4c81"
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="12" sm="2" class="mt-4" >
          <div class="xlsxbutton">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn  color="#0f4c81" style="color: white" v-bind="attrs" v-on="on" @click="exportData">저장 <i class="material-icons">save_alt</i></v-btn>
              </template>
              <span>선택한 지역, 기수, 반별로 저장할 수 있습니다.</span>
            </v-tooltip>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- 하단 -->
    <v-container fluid style="max-width: 1300px;">
      <v-card >
        <v-card-title class="pb-0">
          <v-row class="pb-0">
            <v-col cols="12" sm="3" md="3" class="pb-0">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="pickDate"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formatPickDate"
                    label="날짜 선택"
                    color="#0f4c81"
                    prepend-icon=""
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker color="#0f4c81" v-model="pickDate" no-title scrollable> 
                  <v-spacer></v-spacer>
                  <v-btn text color="#0f4c81" @click="menu = false" >취소</v-btn>
                  <v-btn text color="#0f4c81" @click="selectDate">선택</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
 
            <v-col class="d-inline-block justify-content-around d-flex align-items-center px-10" cols="12" sm="8" md="4">
              
              <div class="d-inline-block mr-1">
                <small>미측정:</small>
              </div>
              
              <div class="form-check form-check-inline" >
                <input type="checkbox" id="inlineCheckbox1" v-model="amCheck">
                <label class="form-check-label pl-2" for="inlineCheckbox1"><small>오전</small></label>
              </div>
              <div class="form-check form-check-inline">
                <input type="checkbox" id="inlineCheckbox2" v-model="pmCheck">
                <label class="form-check-label pl-2" for="inlineCheckbox2"><small>오후</small></label>
              </div>
            </v-col>
            
          </v-row>
        </v-card-title>
	<small class="text-left float-left ml-3 text-secondary">DM 인원 선택<br><i class="fas fa-arrow-down ml-2"></i></small>
        <TemperatureListView :displayList="displayList" :search="search" @mattermost="sendMatter" />
      </v-card>
    </v-container>
  </div>
</template>

<script>
import TemperatureListView from '@/components/students/TemperatureListView.vue'
import XLSX from 'xlsx'
import { mapActions, mapGetters } from 'vuex'
const sessionStore = 'sessionStore'
const studentsStore = 'studentsStore'
export default {
  name: 'Temperature',
  components: {
    TemperatureListView,
  },
  data() {
    return {
      pickDate: new Date().toISOString().substr(0, 10),
      menu: false,
      singleSelect: false,
      search: '',      
      displayList: [],
      selectedArea: '전체',
      selectedGisu: '전체',
      selectedClass: [],
      amCheck: false,
      pmCheck: false,
    }
  },
  methods: {
    ...mapActions(sessionStore, [
      'fetchtemplist',
      'gettemplist',
    ]),
    ...mapActions(studentsStore, [
      'resetselected',
      'sendmatter',
    ]),
    selectDate() {
      this.$refs.menu.save(this.pickDate)
      this.gettemplist(this.pickDate)
      this.resetselected()
    },
    getDisplayList() {
      let result = this.tempList
      const area = this.selectedArea
      const gisu = this.selectedGisu
      const classes = this.selectedClass  
      const amCheck = this.amCheck 
      const pmCheck = this.pmCheck
      if (area !== '전체') {          
        result = result.filter(data => data.student_area == area)
      }
      if (gisu !== '전체') {
        result = result.filter(data => data.student_gisu == gisu)
      } 
      if (classes.length > 0) {
        result = result.filter(data => classes.includes(data.student_class))
      }
      if (amCheck) {
        result = result.filter(data => !data.morning_temp )
      }
      if (pmCheck) {
        result = result.filter(data => !data.lunch_temp)
      }
      this.displayList = result
    },    
    exportData() {
      const sheetName = `${this.pickDate}_${this.selectedGisu}기_${this.selectedArea}_${this.selectedClass}반 체온 측정 현황`
      const stuTempList = XLSX.utils.json_to_sheet(this.displayList)
      const wb = XLSX.utils.book_new()
      const bookName = this.selectedArea + '_' + this.selectedGisu + '기_' + this.selectedClass + '반'
      XLSX.utils.book_append_sheet(wb, stuTempList, bookName)
      XLSX.writeFile(wb, sheetName + '.xlsx')
    },
    sendMatter(data) {
      this.sendmatter(data)
    }
  },
  computed: {
    ...mapGetters(sessionStore, [
      'tempList',
      'displayDate'
    ]),
    ...mapGetters(studentsStore, [
      'options'
    ]),
    formatPickDate() {
      return this.$moment(this.pickDate).format('YYYY.MM.DD')
    }
  },
  watch: {
    studentsList() {     
      this.displayStudents = this.studentsList
    },
    selectedArea() {
      this.getDisplayList()
    },
    selectedClass() {
      this.getDisplayList()
    },
    selectedGisu() {
      this.selectedClass = []
      this.getDisplayList()
    },
    amCheck() {
      this.getDisplayList()
    },
    pmCheck() {
      this.getDisplayList()
    },
    displayDate: {
      deep: true,
      handler() {
        this.getDisplayList()
      }
    },
  },
  created() {
    this.fetchtemplist()
    this.getDisplayList()
  }
}
</script>

<style scoped>
.search{
  padding-top: 4px;
}
.header {
  filter: grayscale(50%);

    height: 10vw;
    background-image: url("../../assets/masks.jpg");
    background-position: center center;
    background-size: cover;
}
.header::after {
  position:absolute;
  background-size:cover;
  opacity:0.5!important;
  z-index:-1;
  content:"";
  width:100%;
  height:10vw;
  background-color: rgba(0,0,0,0.8);
}
</style>