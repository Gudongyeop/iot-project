<template>
    <div>

      <img @click="matOnScreen" style="cursor: pointer;" class="matbtn" src="../../assets/mattermost.png" alt="">
     
  
      <transition name="slide-fade">    
        
      <v-row v-show="mat" class="matbar justify-content-center fixed-bottom" style="background-color: rgba(218, 217, 219, 0.8)">
        <v-col cols="12" md="6">
          <v-text-field
            label="메시지를 입력하세요."
            v-model="message"
            placeholder="체온 측정하세요"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" class="my-auto justify-content-end">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#0f4c81" style="color: white" class="mx-3" v-bind="attrs" v-on="on" @click="confirmSelect">
                  선택 보내기
              </v-btn>
            </template>
            <span>선택한 인원에게 매터모스트 DM 보낼 수 있습니다.</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#0f4c81" style="color: white" class="mx-3 my-3" v-bind="attrs" v-on="on" @click="confirmAll">
                전체 보내기
              </v-btn>
            </template>
            <span>선택한 지역, 기수, 반별 전체인원에게 매터모스트 DM 보낼 수 있습니다.</span>
          </v-tooltip>
        </v-col>
      </v-row>
      
      </transition>
 
    <br>
    <v-data-table
      :headers="headers"
      :items="displayList"
      item-key="student_number"
      :search="search"
      class="elevation-1 mt-4"
      show-select
      :single-select="singleSelect"
      v-model="selected"
      :page.sync="page"
    >
    <template v-slot:item.morning_temp={item}   >
      <span :class="highTempColor(item.morning_temp)">
            {{ 
              (item.morning_temp)
              ? item.morning_temp 
              : "-" 
            }}
      </span>
    </template>


    <template  v-slot:item.morning_time={item}>
            {{ 
              (item.morning_time)
              ? $moment(item.morning_time).format('HH:mm') 
              : "-" 
            }}
    </template>

    <template v-slot:item.lunch_temp={item}>
      <span :class="highTempColor(item.lunch_temp)">
            {{ 
              (item.lunch_temp)
              ? item.lunch_temp 
              : "-"
            }}
      </span>
    </template>

    <template v-slot:item.lunch_time={item}>
      
            {{ 
              (item.lunch_time)
              ? $moment(item.lunch_time).format('HH:mm') 
              : "-" 
            }}

    </template>

    </v-data-table>
  </div>
  
</template>

<script>
import {mapGetters} from 'vuex'
const sessionStore = 'sessionStore'
export default {
  name: 'TemperatureListView',
  props: { displayList: {type: Array} ,search: {type: String}},
  data() {
    return {
      showTooltip: false,
      page: 1,
      singleSelect: false,
      selected: [],
      message:'',
      confirmMessage: false,
      mat: false,
      //서치삭제
      disable_pagination: true,
      headers: [
        { text: '이름', value: 'student_name' },
        { text: '지역', value: 'student_area' },
        { text: '기수', value: 'student_gisu' },
        { text: '반', value: 'student_class' },
        { text: '오전 체온', value: 'morning_temp' },
        { text: '오전 시간', value: 'morning_time' },       
        { text: '오후 체온', value: 'lunch_temp' },
        { text: '오후 시간', value: 'lunch_time' },   
      ],
      
    }
  },
  methods: {
    highTempColor(temp) {
      let color = ''
      temp && Number(temp) >= 37.5
      ? color = 'red'
      : color = 'black'
      return `${color}--text`
    },
    sendMatter() {
      const data = {
        students: this.selected,
        message: this.message
      }
      this.$emit('mattermost', data)
    },
    sendMatterAll() {
      const data = {
        students: this.displayList,
        message: this.message
      }
      this.$emit('mattermost', data)
    },
    confirmAll() {
      let confirmMessage = confirm(`정말 ${this.displayList.length}명에게 전체 메시지 보내시겠습니까?`)
      if (confirmMessage) {
        this.sendMatterAll()
      }
    },
    confirmSelect() {
      let confirmSelectMessage = confirm('선택한 인원에게 메시지를 보내시겠습니까?')
      if (confirmSelectMessage) {
        this.sendMatter()
      }
    },
    matOnScreen() {
      this.mat = !this.mat
    },
    setShowTooltip() {
      if (this.windowWidth >= 960) {
        this.showTooltip = false
      } else {
        this.showTooltip = true
      }
    }
  },
  computed: {
    ...mapGetters(sessionStore, [
      'isDrawerOn',
      'windowWidth'
    ])
  },
  watch: {
    displayList: {
      deep: true,
      handler() {
        this.page = 1
      }
    },
    isDrawerOn() {
      if (this.mat && this.isDrawerOn) {
        this.mat = false
      }
    },
    windowWidth() {
      this.setShowTooltip()
    }
  }
}
</script>

<style scoped>
.matbtn {
  max-height: 50px;
  position: fixed;
  bottom: 35px;
  right: 30px;
  z-index: 999
}
.matbar {
  position: fixed;
  bottom: 10px;
  right: 100px;
  border-radius: 2em;
  margin-left: 10px;
}
.slide-fade-enter-active {
  transition: all .6s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}

</style>