import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import sub_one from '@/components/sub_one'
import sub_two from '@/components/sub_two'
import cha from '@/components/cha'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
        path: '/sub_one',
        name: 'sub_one',
        component: sub_one
    },
      {
        path: '/sub_two',
        name: 'sub_two',
        component: sub_two
    },
      {
        path: '/cha',
        name: 'cha',
        component: cha
    }
  ]
})
