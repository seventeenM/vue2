import Vue from "vue";
import ElementUI from 'element-ui';

import axios from 'axios';
Vue.prototype.$http = axios;

import 'element-ui/lib/theme-default/index.css';
import Vuex from "vuex";
import Router from "vue-router";
import App from "./components/App.vue";
import Table from "./components/table.vue";
import Form from "./components/form.vue";
import Index from "./components/Index.vue";


import addTypes from "./components/addTypes.vue";
import addTypes1 from "./components/addTypes1.vue";
import typeList from "./components/typeList.vue";
import charList from "./components/charList.vue";
import addChar from "./components/addChar.vue";
import login from "./components/login.vue";

import bianji_one from "./components/bianji_one.vue";
import bianji_two from "./components/bianji_two.vue";


import add_port from "./components/add_port.vue";
import portlist_back from "./components/portList_back.vue";
import portlist_font from "./components/portList_font.vue";
import amend_port from "./components/amendPort.vue";
import amend_art from "./components/amendArt.vue";
import amend_char from "./components/amendchar.vue";


import message from "./message.vue";


Vue.use(ElementUI);
Vue.use(Router);


const router= new Router({
    linkActiveClass:"bg",
    routes:[
        {
            name:"login",
            path: '/',
            component: login
        } ,
        
        {
            name:"app",
            path: '/app',
            component: App,
            children: [
                {
                 path:"/",
                 redirect:"index"
                },
                {
                    path: 'add_article', 
                    component: Form, 
                    name: 'add_article'
                },
                {
                    path: 'amend_art', 
                    component: amend_art, 
                    name: 'amend_art'
                },
                {
                    path: 'article_list', 
                    component: Table, 
                    name: 'article_list'
                },
                {
                    path: 'index', 
                    component: Index, 
                    name: 'index'
                },
                {
                   path: 'add_type', 
                   component: addTypes, 
                   name: 'add_type'
                },
                {
                   path: 'add_type1', 
                   component: addTypes1, 
                   name: 'add_type1'
                },
                {
                   path: 'type_list', 
                   component: typeList, 
                   name: 'type_list',
                  
                },
                 {
                   path: 'add_port', 
                   component: add_port, 
                   name: 'add_port',
                  
                },
                 {
                   path: 'portlist_font', 
                   component: portlist_font, 
                   name: 'portlist_font',
                },
                {
                   path: 'portlist_back', 
                   component: portlist_back, 
                   name: 'portlist_back',
                },
                 {
                   path: 'amend_port', 
                   component: amend_port, 
                   name: 'amend_port',
                },
                 {
                   path: 'amend_char', 
                   component: amend_char, 
                   name: 'amend_char',
                },
                 {
                    name:"add_char",
                    path: 'add_char',
                    component: addChar  //message
                } ,
                 {
                   path: 'char_list', 
                   component: charList, 
                   name: 'char_list'
                },
                 {
                    path: 'bianji_one', 
                    component: bianji_one, 
                    name: 'bianji_one'
                },
                {
                    path: 'bianji_two', 
                    component: bianji_two, 
                    name: 'bianji_two'
                }
            ]
        }
    ]
})


router.beforeEach((to,from,next)=>{

     const id=window.sessionStorage.getItem("index");

    // console.log(to,from)
     if(to.path=="/"){
         next()
     }else{
         if(id!==null){
              next()
         }else{
              next({path:"/"})
         }
     }
})


const vm=new Vue({
    el:"#app",
    router
})

