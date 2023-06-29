<template>
  <div >
    <div class="header d-flex justify-center align-center px-16">
      <p class="text-center mb-0 font-weight-bold" style="color: white; font-size: 4vh;">
        학생 관리
      </p>
    </div>

    <v-container id="dropdown-example" style="max-width: 1100px;" >
      <v-row>
        <v-col cols="12" sm="2">
          <v-select
            class="my-2"
            :items="options.optionsArea"
            color="#0f4c81"
            label="지역"
            target="#dropdown-example"  
            v-model="selectedArea"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="2">
          <v-select
            class="my-2"
            color="#0f4c81"
            :items="options.optionsGisu"
            label="기수" 
            target="#dropdown-example"
            v-model="selectedGisu"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="2" >
          <v-select
            class="my-2"
            :items="(selectedGisu == 3) ? options.optionsClass6 : options.optionsClass16"
            color="#0f4c81"
            label="반"
            target="#dropdown-example"
            v-model="selectedClass"
            multiple
          ></v-select>
        </v-col>
        <v-col cols="12" sm="4">
          <div class="search">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              color="#0f4c81"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="12" sm="2" class="mt-4">
          <div class="routerbutton pt-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="#0f4c81" style="color: white; text-decoration: none" v-bind="attrs" v-on="on" to="/register">학생 등록</v-btn>
              </template>
              <span>학생 등록 페이지로 이동</span>
            </v-tooltip>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container style="max-width: 1300px;" >
      <StudentsListView :displayStudents="displayStudents" :search="search" @delete="deleteStudent" />
    </v-container>
  </div>
</template>

<script>
import StudentsListView from '@/components/students/StudentsListView.vue'
import { mapActions, mapGetters } from 'vuex'

const studentsStore = 'studentsStore'
const sessionStore = 'sessionStore'

export default {
  name: 'Students', 
  data() {
    return {
      displayStudents: [],
      search: '',      
      selectedArea: '전체',
      selectedGisu: '전체',
      selectedClass: [],      
    }
  },
  created() {
    this.fetchstudents()    
  },
  components: { StudentsListView },
  computed: {
    ...mapGetters(studentsStore, [
      'studentsList',
      'options',
    ]),
    ...mapGetters(sessionStore, [
      'isLoggedIn'
    ])
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
    }
  },
  methods: {
    ...mapActions(studentsStore, [
      'fetchstudents',
      'deletestudent'
    ]),
    deleteStudent(stu) {
      this.deletestudent(stu)
    },   
    getDisplayList() {
      let result = this.studentsList
      const area = this.selectedArea
      const gisu = this.selectedGisu
      const classes = this.selectedClass
      if (area !== '전체') {          
        result = result.filter(student => student.area == area)
      }
      if (gisu !== '전체') {
        result = result.filter(student => student.gisu == gisu)
      } 
      if (classes.length > 0) {
        result = result.filter(student => classes.includes(student.stu_class))
      }
      this.displayStudents = result
    },   
  },

}
</script>
<style scoped>
.search{
  padding-top: 4px;
}
.routerbutton{
  padding-top: 16px;
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