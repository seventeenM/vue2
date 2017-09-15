 import Router from "vue-router";
 import Vue from "vue";


 //import Index from "./components/Index.vue";
//  import App from "./components/App.vue";
//  import Hot from "./components/Hot.vue";
//  import fen from "./components/fen.vue";
//  import jing from "./components/jing.vue";
//  import zhi from "./components/zhi.vue";
//  import guang from "./components/guang.vue";
import publish from "./components/publish.vue";
//  import  "./static/css/font-awesome.min.css";
 import  "./static/css/reset.css";
 import  "./static/css/common.css";
 import  "./static/css/style.css";

var Index = resolve => require.ensure(['./components/Index.vue'], () => 
resolve(require('./components/Index.vue')));
var App = resolve => require.ensure(['./components/App.vue'], () => 
resolve(require('./components/App.vue')));


//vue的异步组件和webpack的require.ensure()相结合
var fen = resolve => require.ensure(['./components/fen.vue'], () => 
resolve(require('./components/fen.vue')));
var Hot = resolve => require.ensure(['./components/Hot.vue'], () => 
resolve(require('./components/Hot.vue')));
var jing = resolve => require.ensure(['./components/jing.vue'], () => 
resolve(require('./components/jing.vue')));
// var zhi = resolve => require.ensure(['./components/zhi.vue'], () => 
// resolve(require('./components/zhi.vue')));
// var guang = resolve => require.ensure(['./components/guang.vue'], () => 
// resolve(require('./components/guang.vue')));



//采用amd风格的require
//var Hello = resolve => require(['@/components/Hello'], resolve)
  import axios from "axios";
  import vueAxios from "vue-axios";



//把组件按组分块
  const zhi = resolve => require.ensure([], () => resolve (require('./components/zhi.vue')), 'group-foo');
  const guang = resolve => require.ensure([], () => resolve (require('./components/guang.vue')), 'group-foo');


 Vue.use(vueAxios,axios);
 Vue.use(Router);

let router=new Router({
    linkActiveClass:"bg footBg" ,
    routes:[{
            name:"index",
            path:"/index",
            component:Index,
            children:[
                {
                    name:"hot",
                    path:"hot",
                    component:Hot,
                },
                {
                    name:"fen",
                    path:"fen",
                    component:fen
                },
                {
                    name:"jing",
                    path:"jing",
                    component:jing
                },
                {
                    name:"zhi",
                    path:"zhi",
                    component:zhi
                },
                {
                    name:"guang",
                    path:"guang",
                    component:guang
                },
                {
                    path:"/",
                    redirect:"hot"
                }
            ]
        },{
            name:"App",
            path:"/app",
            component:App
        },{
            name:"music",
            path:"/music/:id",
            component:publish
        },{
            name:"f3",
            path:"/f3",
            component:{
                template:"<div style='font-size:20px; text-align:center;line-height:30px;color:#f00;'>这是一级路由f3页面</div>"
            }
        },{
            name:"f4",
            path:"/f4",
            component:{
                template:"<div style='font-size:20px; text-align:center;line-height:30px;color:#f00;'>这是一级路由f4页面</div>"
            }
        },{
            name:"f5",
            path:"/f5",
            component:{
                template:"<div style='font-size:20px; text-align:center;line-height:30px;color:#f00;'>这是一级路由f5页面</div>"
            }
        },
        {
             path:"/",
             redirect:"index"
         }
    ]
})

 var vm= new Vue({
     el:"#box",
     router
 })