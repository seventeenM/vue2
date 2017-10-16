<template>
  <div>
    <p v-if="state=='start'">
      准备加载。。。。
    </p>

    <p v-else-if="state=='loading'">
       数据正在加载。。。
    </p>
     <p v-else-if="getHomes">
        数据正在加载。。
     </p>
    
     <p v-else>
       数据加载失败。。。
     </p>
       
   
  </div>
</template>

<script>
import {mapState,mapActions} from "vuex";
export default {
  name: 'load',
  computed:{
    ...mapState({
      state:function(state){
      //  console.log(state)
        if(state.state=="end"){
          this.$router.push({path:"/index"})
        }
        
         return state.state
      },
      getHomes:function(state){ 
        // console.log(state)
        if(state.getHomes){
             this.$router.push({path:"/home"})
        }
      
         return state.getHomes
      }
    
    })
  },
  methods:{
     ...mapActions(["getHome","getDatas"])
  },
  mounted(){
     //this.getDatas()
     this.getHome();
  }
}
</script>

<style>

</style>
