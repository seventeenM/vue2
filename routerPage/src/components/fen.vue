<template>
     <div class="boxs">



         <div class="box" v-for="i in arr">

         <dl @click="fn(i)">
             <dt><img :src="i.src" alt=""/></dt>
             <dd>{{i.name}}</dd>
         </dl>

        
          </div>
    
     </div>
</template>
<script> 
//  <router-link tag="dl" to="/music/:{i.name}">
//     <dt><img :src="i.src" alt=""/></dt>
//     <dd>{{i.name}}</dd>
//  </router-link>

//:to="{name:'music',params:{name:i.name,src:i.src}}"


 export default {
    data(){
      return {
         arr:null
      }
    },
    mounted(){
    
     this.axios.get("/getData").then(function(rs){
     
          this.arr=rs.data;
          
     }.bind(this))
    
      
    },
    methods:{
      fn(i){
        this.$router.push({
            path:"/music/"+i.name
        })
      
      }
    }
 }
</script>
<style>

</style>