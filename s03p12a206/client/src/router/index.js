import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/Home.vue'
import Signin from '@/views/accounts/Signin.vue'
import Students from '@/views/students/Students.vue'
import Register from '@/views/students/Register.vue'
import Update from '@/views/students/Update.vue'
import NotFound from '@/views/NotFound.vue'
import Temperature from '@/views/students/Temperature.vue'
import store  from '../store/index'


Vue.use(VueRouter)
  const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin,
    },
    {
      path: "/students",
      name: "Students",
      component: Students,      
      // 여기가 로그인 안되면 못 가는 곳
      beforeEnter(to, from, next) {
        if (store.state.sessionStore.accessToken !== '') {
          next()
        } else {          
          const confirms = confirm('로그인이 필요한 페이지입니다. 로그인 페이지로 이동하시겠습니까')
          if (confirms) {
            next({name: 'Signin', query: {redirect:'/students'}})
          } else {
            next('/')
          }
        }
      }     
    },
    {
      path: "/temperature",
      name: "Temperature",
      component: Temperature,
      beforeEnter(to, from, next) {
        if (store.state.sessionStore.accessToken !== '') {
          next()
        } else {          
          const confirms = confirm('로그인이 필요한 페이지입니다. 로그인 페이지로 이동하시겠습니까')
          if (confirms) {
            next({name: 'Signin', query: {redirect:'/temperature'}})
          } else {
            next('/')
          }
        }
      }     
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      beforeEnter(to, from, next) {
        if (store.state.sessionStore.accessToken !== '') {
          next()
        } else {          
          const confirms = confirm('로그인이 필요한 페이지입니다. 로그인 페이지로 이동하시겠습니까')
          if (confirms) {
            next({name: 'Signin', query: {redirect:'/register'}})
          } else {
            next('/')
          }
        }
      }     
    },
    {
      path: "/students/:no",
      name: "update",
      component: Update,
      beforeEnter(to, from, next) {
        if (store.state.sessionStore.accessToken !== '') {
          next()
        } else {          
          const confirms = confirm('로그인이 필요한 페이지입니다. 로그인 페이지로 이동하시겠습니까')
          if (confirms) {
            next({name: 'Signin', query: {redirect:`/students/${to.params.no}`}})
          } else {
            next('/')
          }
        }
      } 
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedPosition)
        }, 250)
      })
    }else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ x: 0, y: 0 })
        }, 250)
      })
    }
  }
})

export default router
