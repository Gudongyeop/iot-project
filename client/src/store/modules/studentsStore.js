import axios from 'axios'
import router from '../../router/index.js'
import store from '../index.js'
import moment from 'moment'

const studentsStore = {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    messageSuccess: false,
    messageFail: false,
    messageBox: false,
    isSerialOk: false,
    studentsList: [],
    student: null,
    sampleStudent: {},
    selected: {
      selectedArea: '전체',
      selectedGisu: '전체',
      selectedPart: '전체',
      selectedClass: [],
      amCheck: false,
      pmCheck: false,
      },
    options: {
      optionsArea: ['전체', '서울', '대전', '구미', '광주'],
      optionsGisu: ['전체', 3, 4],
      optionsPart: ['전체', 'A', 'B', 'C'],
      optionsClass16: [...Array(16).keys()].map(i => i+1),
      optionsClass6: [...Array(6).keys()].map(i => i+1),
    },
    serialRules: [
      v => !!v || 'Serial Number is required',
      v => v.length <= 20 || 'Serial Number must be less than 20 characters',
    ],
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    classRules:[
      v => !!v || 'Class is required'
    ]
  },
  getters: {
    studentsList: (state) => state.studentsList,
    student: (state) => state.student,
    selected: (state) => state.selected,
    options: (state) => state.options,
    sampleStudent: (state) => state.sampleStudent,
    serialRules: (state) => state.serialRules,
    nameRules: (state) => state.nameRules,
    classRules: (state) => state.classRules,
    isSerialOk: (state) => state.isSerialOk,
    messageSuccess: (state) => state.messageSuccess,
    messageFail: (state) => state.messageFail,
    messageBox: (state) => state.messageBox
  },
  mutations: {
    FETCHSTUDENTS(state, data) {
        state.studentsList = data
    },
    REGISTERSTUDENT() {    
        router.push('/students')    
    },
    DELETESTUDENT() {
        router.go(0)
    },

    GETSTUDENT(state, data) {
        state.student = data
    },
    SEARCHSTUDENT(state, data) {
        state.sampleStudent = data
    },
    RESETSELECTED(state) {
      state.selected = {
        selectedArea: '전체',
        selectedGisu: '전체',
        selectedPart: '전체',
        selectedClass: [],
        amCheck: false,
        pmCheck: false,
      }
    },
    SERIALCHECK(state) {
      state.isSerialOk = true
    },
    INITIALIZESERIAL(state) {
      state.isSerialOk = false
    },
    SENDMATTER(){

    },
    SUCCESS(state) {
      state.messageSuccess = true
    },
    FAIL(state) {
      state.messageFail = true
    },
    CLEAR(state) {
      state.messageSuccess = false
      state.messageFail = false
    },
    MESSAGEBOXCLEAR(state) {
      state.messageBox = false
    },
    MESSAGEBOX(state) {
      state.messageBox = true
    }

  },
  actions: {
    fetchstudents({commit}) {
      const TOKEN = store.state.sessionStore.accessToken      
      const config = {
        headers: {'Authorization': TOKEN}            
      }
      axios
        .get('/api' + '/students', config)
        .then(res => {
          commit('FETCHSTUDENTS', res.data)
        })
        .catch()
    },  
    getstudent({commit}, no) {
      const TOKEN = store.state.sessionStore.accessToken 
      const config = {
        headers: {'Authorization': TOKEN}           
      }
      axios
        .get('/api' + '/students' + `/${no}`, config)
        .then(res => {
          commit('GETSTUDENT', res.data[0])
        })
        .catch(() => {
          alert('입력하신 정보를 다시 확인해주세요')
          router.push('/')
        })
    },
    registerstudent({commit}, data) {              
      const TOKEN = store.state.sessionStore.accessToken      
      const config = {
        headers: {'Authorization': TOKEN}           
      }
      axios
        .post('/api' + '/students', data, config)
        .then(() => {    
          commit('REGISTERSTUDENT')
        })
        .catch()
    },
    updatestudent({commit}, data) {
      const TOKEN = store.state.sessionStore.accessToken      
      const config = {
        headers: {'Authorization': TOKEN}           
      }
      axios
        .put('/api' + '/students' + `/${data.no}`, data, config)
        .then(() => {    
          commit('REGISTERSTUDENT')
        })
        .catch()
    },
    deletestudent({commit}, stu) {
      const TOKEN = store.state.sessionStore.accessToken      
      const config = {
        headers: {'Authorization': TOKEN}           
      }
      const deleteConfirm = confirm('삭제하시겠습니까?')
      if (deleteConfirm) {
        axios
          .delete('/api' + '/students' + '/' + stu.no, config)
          .then(() => {
            commit('DELETESTUDENT')
          })
          .catch()
      }
    },
    searchstudent({commit}, student) {
      const today = moment().format('YYYY-MM-DD')
      const query = `?area=${student.area}&gisu=${student.gisu}&class=${student.class}&name=${student.name}` 
      axios
        .get('/api' + `/temp/${today}/search/student`+ query)
        .then((res) => {
          commit(('SEARCHSTUDENT'), res.data)
        })
        .catch()
    },
    resetselected({commit}) {
      commit('RESETSELECTED')
    },
    serialcheck({commit}, serial) {
      const TOKEN = store.state.sessionStore.accessToken      
      const config = {
        headers: {'Authorization': TOKEN}           
      }
      const query = `?serial=${serial}`
      axios
      .get('/api' + '/students/check/serial' + query, config)
      .then (() => {
        alert('사용이 가능합니다.')
        commit('SERIALCHECK')
      })
      .catch(() => {
        alert('중복된 시리얼 번호입니다.')
        commit('INITIALIZESERIAL')
      })
    },
    initializeserial({commit}) {
      commit('INITIALIZESERIAL')
    },
    sendmatter({commit, dispatch}, dataFromTemp) {
      const stus = dataFromTemp.students
      const TOKEN = store.state.sessionStore.accessToken      
      const config = {
        headers: {'Authorization': TOKEN}           
      }
      const students = []
      stus.forEach(stu => {
        const student = {
          name: stu.student_name,
          channel_id: stu.student_channel_id,
        }
        students.push(student)
      })
      const data = {
        message: dataFromTemp.message,
        students: students
      }
      commit('MESSAGEBOX')
      axios
      .post('/api'+ '/matter/send/message', data, config)
      .then(() => { 
        commit('SUCCESS')
        dispatch('clear')
        setTimeout(() => {
          commit('MESSAGEBOXCLEAR')
        }, 2000)
      })
      .catch(()=> {
        commit('FAIL')
        dispatch('clear')
        setTimeout(() => {
          commit('MESSAGEBOXCLEAR')
        }, 2000)
      })
    },
    clear({commit}){
      setTimeout(() => {
        commit('CLEAR')
      }, 1500)
    },
  }
  
}

export default studentsStore