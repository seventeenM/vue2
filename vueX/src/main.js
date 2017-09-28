import Vue from "vue";
import Vuex from "vuex";
import App from "./components/App.vue";
import axios from "axios";
import vueAxios from "vue-axios";


Vue.use(vueAxios,axios);
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        code: {
            a1:1,
            a2:1
        },
        count:false,
        alldata:null
    },
    mutations: {
        add(state, n) {
           // console.log(n.id)
            return state.code[n.id] += 1;
        },
        push(state, n){
           // console.log(n)
            return state.code[n.id] -= 1;
        },
        getId(state, data){
            console.log(data)
            return  state.alldata = data.id
        },
        getdata(state, data){
           
            return  state.alldata = data
        }
    },
    actions:{
        dataA({commit},_this){
           
              return new Promise((resolve) => {
                   _this.axios.get("/id").then(function(data) {

                    commit("getId", data.data)
                    resolve(data.data.id)

                })
            })


        },
        dataB({ dispatch, commit },_this){
           
            dispatch("dataA", _this).then((datas) => {
                console.log(datas)
                _this.axios.get(`/tab?id=${datas}`).then(function(data) {
                    //console.log(data)
                    commit("getdata", data.data)
                })
            })


        }
    }
    // getters: {
    //     code: state => {
    //         console.log(state.code)
    //         return state.code += 10;
    //     }
    // }
})




var vm = new Vue({
    el: "#box",
    template: "<app></app>",
    components: {
        app: App
    },
    // render(h){
    //     return h(App)
    // },

    store
    
})