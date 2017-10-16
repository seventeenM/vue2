import Vue from 'vue'
import Router from 'vue-router'
import loading from '@/components/loading'
import index from '@/components/index'
import home from '@/components/home'
import Vuex from 'vuex';


Vue.use(Router)

export default new Router({
  routes: [
    {
       path:"/",
       redirect:"loading"
    },
    {
      path: '/loading',
      name: 'loading',
      component: loading
    },{
      path:"/index",
      name:"index",
      component: index,
    },{
      path:"/home",
      name:"home",
      component: home,
    }
  ]
})
