import Vue from "vue";
import Vuex from "vuex";
import Router from "vue-router";
import Index from "./components/Index.vue";
import Sub from "./components/Sub.vue";

import "./commonCon.js";
import IScroll from "./static/js/iscroll.js";


Vue.prototype.$Iscroll=IScroll;

import { Lazyload } from 'mint-ui';



Vue.use(Lazyload);



import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);



const router= new Router({
    linkActiveClass:"bg",
    routes:[
        {
         
            path:"/",
            redirect:"index"
        },
        {
            name:"index",
            path:"/index",
            component:Index
        },
          {
            name:"sub1",
            path:"/sub1",
            component:Sub
          },
           {
            name:"sub2",
            path:"/sub2",
            component:Sub
          },
           {
            name:"sub3",
            path:"/sub3",
            component:Sub
          },
           {
            name:"sub4",
            path:"/sub4",
            component:Sub
          }
    ]
})




Vue.use(Router);

const vm=new Vue({
    el:"#app",
    router
})

