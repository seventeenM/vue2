<template>
   <div style='font-size:20px; text-align:center;line-height:30px;color:#0f0;'>
       这是一级路由{{names}}页面
   </div>
</template>
<script>
   export default {
       data(){
           return {
               names:""
           }
       },
       mounted(){
           this.names=this.$route.params.id;  
       },
      watch: {
            $route() {
                this.$router.go(0)
            }
        } 
   }
</script>