import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import sessionStore from './modules/sessionStore'
import temperatureStore from './modules/temperatureStore'
import studentsStore from './modules/studentsStore'
import userStore from './modules/userStore'
import homeStore from './modules/homeStore'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        temperatureStore,
        studentsStore,
        userStore,
        sessionStore,
        homeStore,
    },
    plugins: [
        createPersistedState({
            paths: ['sessionStore'],
            storage: window.sessionStorage,
        })
    ]
})

export default store