<template>
  <div>
    <div>
      <div class="header d-flex justify-center align-center px-16">
      <p class="text-center mb-0 font-weight-bold" style="color: white; font-size: 4vh;">
          학생 수정
        </p>
      </div>
    </div>

    <div class="my-10 mx-10">
      <div  v-if="student">
      <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="stuInfo.serial"
              :rules="serialRules"
              :counter="20"
              label="Serial Number"
              required
            >
            <template v-slot:append>
                <v-btn
                  color="#0f4c81"
                  style="color: white"
                  @click="dialogOn"
                >
                  등록
                </v-btn>
              </template>
            </v-text-field>
          <v-dialog
            v-model="dialog"
            max-width="1080"
          >
            <v-card>
                <GetSerial @close="closeModal" @getSerialNum="getSerialNum"/>
              <v-card-actions>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="stuInfo.name"
              :rules="nameRules"
              :counter="10"
              label="이름"
              required
            ></v-text-field>
          </v-col>
        
          <v-col
            cols="12"
            md="3"
          >
            <v-select
            class="my-2"
            :items="optionsArea"
            label="지역"
            target="#dropdown-example"  
            v-model="stuInfo.area"
          ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="3"
          >
            <v-select
            class="my-2"
            :items="optionsGisu"
            label="기수" 
            target="#dropdown-example"
            v-model="stuInfo.gisu"
          ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="3"
          >
            <v-select
            class="my-2"
            :items="optionsClass"
            :rules="classRules"
            label="반"
            target="#dropdown-example"
            v-model="stuInfo.stu_class"
          ></v-select>
          </v-col>
          <v-col
            cols="12"
            md="3"
          >
            <v-select
            class="my-2"
            :items="optionsPart"
            label="구분"
            target="#dropdown-example"
            v-model="stuInfo.part"
          ></v-select>
          </v-col>


        </v-row>
      </v-container>
    </v-form>
    <v-btn
          :disabled="!valid"
          color="#0f4c81"
          style="color: white"
          @click="submit"
        >
          수정
        </v-btn>
    </div>
    </div>
  </div>
</template>

<script>
import GetSerial from '@/components/students/GetSerial.vue'
import {mapActions, mapGetters} from 'vuex'
const studentsStore = 'studentsStore'
export default {
  name: 'Update',
  components: {GetSerial},
  data() {
    return {
      isStudent: false,
      dialog: false,
      valid: false,
      serial: '',
      stuInfo: {
        serial: '',
        name: '',
        area: '서울',
        gisu: null,
        stu_class: 1,
        part: 'A'     
      },  
      optionsArea: [       
        '서울', '대전', '구미', '광주'
      ],
      optionsGisu: [     
        {text: '3기', value: 3},
        {text: '4기', value: 4}
      ],
      optionsPart: [
        'A', 'B', 'C'
      ],
    }
    
  },
  methods: {
    ...mapActions(studentsStore, [
      'getstudent',
      'updatestudent',
      'initializeserial'
    ]),
    submit() {
      this.updatestudent(this.stuInfo)
    },
    closeModal() {
      this.dialog = false
    },
    getSerialNum(data) {
      this.stuInfo.serial = data
      this.dialog = false
    },
    dialogOn() {
      this.initializeserial()
      this.dialog = true
    }
  },
  computed: {
    ...mapGetters(studentsStore, [
      'student',
      'nameRules',
      'serialRules',
      'classRules'
    ]),
    optionsClass() {
      let stuClass = 0
      if (this.stuInfo.gisu == 3) {
        stuClass = 6
      } else {
        stuClass = 16
      }
      return [...Array(stuClass).keys()].map(i => i+1)
    },
    selectedGisu() {
      return this.stuInfo.gisu
    }
  },
  watch: {
    student() {
      this.stuInfo = this.student
      setTimeout(() => {this.isStudent = true}, 10)
    },
    selectedGisu() {
      if (this.isStudent) {
        this.stuInfo.stu_class = 0
      }
    }
  },
  created() {
    this.getstudent(this.$route.params.no)
  },
}
</script>

<style scoped>
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