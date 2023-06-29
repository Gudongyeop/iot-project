import axios from 'axios'
let pickDate= new Date().toISOString().substr(0, 10)

const homeStore = {
	namespaced: true,
	state: {
		news: [],
		sampleTodayCnt:{},
	},
	getters: {
		news: (state) => state.news,
		sampleTodayCnt: (state) => state.sampleTodayCnt,
	},
	mutations: {
		GETNEWS(state, data) {
			state.news = data
		},
		TODAYTEMPCNT(state, data){
			state.sampleTodayCnt = data
		}
	},
	actions: {
		getnews({commit}) {
			axios
			.get('/api'+'/news')
			.then(res => {
				commit('GETNEWS', res.data)
			})
			.catch()
		},
		refreshnews({commit}) {
			axios
			.get('/api' + '/news/refresh')
			.then(res => {
				if (res.data.message == "새로고침 완료") {
					axios
					.get('/api'+'/news')
					.then(res => {
						commit('GETNEWS', res.data)
					})
					.catch()
				}
			})
		},
		//오늘 측정 한사람
		todaytempcnt({commit}, info){
			const query = `?area=${info.area}&gisu=${info.gisu}&class=${info.class}`;
			axios
			.get('/api' + `/statistics/${pickDate}`+ query)
			.then((res) => {
				commit(('TODAYTEMPCNT'), res.data);
			})
			.catch(() => {console.log('ERROR!!')})
		},
	},

}

export default homeStore