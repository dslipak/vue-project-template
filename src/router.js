
import Vue from 'vue'
import VueRouter from 'vue-router'
import Signin from '@/components/Signin'
import Dashboard from '@/components/Dashboard'
import auth from './auth'

Vue.use(VueRouter)

function requireAuth (to, from, next) {
	if (!auth.signedIn()) {
		next({
			path: '/signin',
			query: { redirect: to.fullPath }
		})
	} else {
		next()
	}
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
		{ path: '/', component: Dashboard, beforeEnter: requireAuth },
    { path: '/signin', component: Signin },
    { path: '/signout',
      beforeEnter (to, from, next) {
        auth.signout()
        next('/')
      }
    }
  ]
})

export default router
