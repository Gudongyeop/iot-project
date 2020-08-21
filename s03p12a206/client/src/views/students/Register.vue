<template>
  <div>
    <div class="">
      <div class="header d-flex justify-center align-center px-16">
      <p class="text-center mb-0 font-weight-bold" style="color: white; font-size: 4vh;">
          학생 등록
        </p>
      </div>
    </div>
    <div class="my-10 mx-10">
      <v-form v-model="valid">
      <v-container style="max-width: 1000px;">
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="stuInfo.serial"            
              :counter="20"
              :rules="serialRules"
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
            <v-overflow-btn
            class="my-2"
            :items="optionsArea"
            label="지역"
            target="#dropdown-example"  
            v-model="stuInfo.area"
          ></v-overflow-btn>
          </v-col>

          <v-col
            cols="12"
            md="3"
          >
            <v-overflow-btn 
            class="my-2"
            :items="optionsGisu"
            label="기수" 
            target="#dropdown-example"
            v-model="stuInfo.gisu"
          ></v-overflow-btn>
          </v-col>
          <v-col
            cols="12"
            md="3"
          >
            <v-overflow-btn
            class="my-2"
            :items="optionsClass"
            :rules="classRules"
            label="반"
            target="#dropdown-example"
            v-model="stuInfo.stu_class"
          ></v-overflow-btn>
          </v-col>
          <v-col
            cols="12"
            md="3"
          >
            <v-overflow-btn
            class="my-2"
            :items="optionsPart"
            label="구분"
            target="#dropdown-example"
            v-model="stuInfo.part"
          ></v-overflow-btn>
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
        등록
      </v-btn>
    </div>
  </div>
</template>

<script>
import GetSerial from '@/components/students/GetSerial.vue'
import { mapActions, mapGetters} from 'vuex'

const studentsStore = 'studentsStore'

export default {
  name: 'Register', 
  components: {GetSerial},
  data() {
    return {
      dialog: false,
      valid: false,
      serial: '',
      username: '',
      stuInfo: {
        serial: '',
        name: '',
        area: '서울',
        gisu: 3,
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
  }, // data
  methods: {
    ...mapActions(studentsStore, [ 
      'registerstudent',
      'initializeserial'
    ]),

    submit() {     
      const registerInfo = this.stuInfo
      this.registerstudent(registerInfo)   
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
    selectedGisu() {
      this.stuInfo.stu_class = 0
    }
  }
}
</script>

<style scoped>
.header {
  height: 10vw;
  filter: grayscale(50%);
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