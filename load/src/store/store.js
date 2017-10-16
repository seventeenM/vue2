import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex);



export default new Vuex.Store({
    state:{
      state:true,
      navData:null,
      allArt:null,
      getHomes:false,
      homeData:null
    },
    actions:{
        getNav({commit}){


         commit("getState","loading");

            var navs=()=>{
               
                  return new Promise((resolve,reject)=>{ 
                   
                        this.$http.get("/api/front_article/getNav").then(function(data){
                            console.log("11")
                               commit("getNav",data.data.data)
                               resolve();
                         })
                    })
            }

          var arts=()=>{
                  return new Promise((resolve,reject)=>{
                        this.$http.get("/api/front_article/getArticleAll").then(function(data){
                             console.log("22")
                                 commit("getArticleAll",data.data.data)
                                 resolve();
                        })
                    })
            }
 
            return {
                navs,
                arts
            }
           
        
        },
        getDatas({dispatch,commit}){ 
            commit("getState","start");

            dispatch("getNav").then((data)=>{
                Promise.all([data.navs(),data.arts()]).then(()=>{
                   commit("getState","end");
                })
            },()=>{
                  commit("getState",false);
            })
        },
        getHome({commit}){
                  
                        this.$http.get("/getarr").then(function(data){
                        
                               commit("homeData",data.data);
                               commit("getHomes",true);
                               
                              
                         },function(){
                              commit("getHomes",false);
                         })
        }
    },
    mutations:{
        getState(state,data){
            state.state=data;
        },
        getNav(state,data){
        
            state.navData=data;
        },
        homeData(state,data){
       
            state.homeData=data;
        },
        getArticleAll(state,data){
            state.allArt=data;
        },
        getHomes(state,data){
            state.getHomes=data;
        },
    }
})

