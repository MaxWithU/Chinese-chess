import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: index
    }
  ]
})
