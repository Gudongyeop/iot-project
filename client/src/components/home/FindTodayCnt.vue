<template>
  <div>
    <h3 style="text-align : left;" >오늘 체온 측정 현황</h3>
      <hr style="border: 1px solid black;">
      <v-form
      ref="form"
      v-model="valid"
      >
        <v-select
          :items="optionsArea"
          v-model="selected.area"
          :rules="commonRules"
          filled
          required
          label="지역"
        ></v-select>

        <v-select
          :items="optionsGisu"
          v-model="selected.gisu"
          :rules="commonRules"
          filled
          required
          label="기수"
        ></v-select>

        <v-select
          :items="optionsClass"
          v-model="selected.class"
          :rules="commonRules"
          filled
          required
          label="반"
        ></v-select>
        </v-form>
        <v-text-field
          disabled=""
          label="오늘 날짜"
          v-model="today"
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="#0f4c81"
        style="color: white"
        @click.stop="dialog = true"
        @click="todaytempcnt(selected)"
        :dialog="dialog"
      >
        submit
      </v-btn>
      <v-dialog
      v-model="dialog"
      max-width="290"
      >
        <v-card>
          <div class="pop-head" >
          <strong class="tit">오늘 체온측정 현황</strong>
          </div>
          <v-card-text v-if="todayTempCnt" class="pt-4 pb-0">
            <h5>{{todayTempCnt.구분.지역}} {{todayTempCnt.구분.기수}}기 {{todayTempCnt.구분.반}}반</h5>
            <p>오전 미측정: {{todayTempCnt.오전미측정}} 명 | 오전 측정: {{todayTempCnt.오전측정}} 명</p>
            <p>오후 미측정: {{todayTempCnt.오후미측정}} 명 | 오후 측정: {{todayTempCnt.오후측정}} 명</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              style="color: #0f4c81"
              text
              @click="dialog = false"
            >
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
const homeStore = 'homeStore'
import { mapGetters, mapActions} from 'vuex'
export default {
  name: 'FindTodayCnt',
  data () {
    return {
      valid: false,
      dialog: false,
      todayTempCnt: null,
      commonRules: [
        v => !!v || 'Required.'
      ],
      selected: {
        area: '',
        gisu: '',
        class: '',
      },
      optionsArea: ['전체','서울', '대전', '구미', '광주'],
      optionsGisu: ['전체',3, 4],
    }
  },
  methods: {
    ...mapActions(homeStore, [
      'todaytempcnt'
    ])
  },
  computed:{
    ...mapGetters(homeStore, [
        'sampleTodayCnt',
    ]),
    today() {
      return this.$moment().format('YYYY.MM.DD (dd)')
    },
    selectedGisu() {
      return this.selected.gisu
    },
    optionsClass() {
      let stuClass = 0
      if (this.selected.gisu == 3) {
        stuClass = 6
      } else {
        stuClass = 16
      }
      return [...Array(stuClass).keys()].map(i => i+1)
    },
  },
  watch:{
    sampleTodayCnt: {
      deep: true,
      handler() {
        this.todayTempCnt = this.sampleTodayCnt
      }
    },
    dialog() {
      this.$refs.form.reset()
      this.selected.class == ''
    },
    selectedGisu() {
      if (this.selected.class == '' || this.selected.class == undefined){
        this.selected.class == ''
      } else {
        this.selected.class = 0
      }
    }
  }
}
</script>

<style>
.pop-head {
    position: relative;
    background: #0f4c81;
    padding: 10px 40px 10px 40px;
}
.pop-head .tit {
    font-size: 20px;
    color: white;
    font-weight: 500;
}
</style>