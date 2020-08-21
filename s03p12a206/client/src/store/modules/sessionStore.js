import axios from 'axios'
import router from '../../router/index.js'
import moment from 'moment'
import store from '../index.js'

const sessionStore = {
	strict: process.env.NODE_ENV !== 'production',
	namespaced: true,
	state: {     
		isLoggedIn: false,
		accessToken: '', 
		tempList: [],
		displayDate: '1901-01-01',
		loading: false,
		windowWidth: 1920,
		pages: {},
		isDrawerOn: false,
	},
	getters: {
		isLoggedIn: (state) => state.isLoggedIn,
		accessToken: (state) => state.accessToken,
		tempList: (state) => state.tempList,
		displayDate: (state) => state.displayDate,
		loading: (state) => state.loading,
		pages: (state) => state.pages,
		windowWidth: (state) => state.windowWidth,
		isDrawerOn: (state) => state.isDrawerOn,
	},
	mutations: {
		SIGNIN(state, data) {
			state.accessToken = data
			state.isLoggedIn = true
			const path = (router.currentRoute.query.redirect == undefined)
						?	'/'
						: router.currentRoute.query.redirect
			router.push(path)
		},    
		FETCHTEMPLIST(state, data) {
			state.tempList = data.data
			state.displayDate = data.date
		},
		GETPAGE(state) {
			state.loading = true
		},
		SETWIDTH(state, data) {
				state.windowWidth = data
		},
		SETDRAWER(state, data) {
			state.isDrawerOn = data
		}
	},
	actions: {
		signin({commit}, signinInfo) {            
			axios
				.post('/api' + '/signin', signinInfo)
				.then(res => {
					const token = res.data
					commit('SIGNIN', token)
				})
				.catch(() => {
					alert('로그인 실패! 아이디, 비밀번호, 이메일을 확인해주세요.') 
				})
		},
		signout({commit}) {
			commit('SIGNOUT')
		},
		fetchtemplist({commit}) {
			const TOKEN = store.state.sessionStore.accessToken      
			const config = {
				headers: {'Authorization': TOKEN}           
			}        
			const today = moment().format('YYYY-MM-DD')
			axios
				.get('/api' + '/temp' + `/${today}`, config)
				.then((res) => {           
					const data= {
						data: res.data,
						date: moment().format('YYYY-MM-DD')
					}
					commit('FETCHTEMPLIST', data)
				})
				.catch()
		},
		gettemplist({commit}, date) {
			const TOKEN = store.state.sessionStore.accessToken      
			const config = {
				headers: {'Authorization': TOKEN}           
			}        
			axios
				.get('/api' + '/temp' + `/${date}`, config)
				.then((res) => {
					const data= {
						data: res.data,
						date: date
					}
					commit('FETCHTEMPLIST', data)
				})
				.catch()
		},
	}
}

export default sessionStore