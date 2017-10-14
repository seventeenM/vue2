<template>
  <section class="form-section">
    <h3>{{ruleForm.article_name}}</h3>
    <p><label>作者:</label>{{ruleForm.editer}}</p>
      <div class="con">
          <h1>内容</h1>
          <div id="content">{{ruleForm.content}}</div>
      </div>
  </section>
</template>
<script>

import url from 'url';

  export default {
    data() {
      return {
        ruleForm: {}
      }
    },
    watch:{
      $route(){

         // this.$route.query.data.content=this.$route.query.data.content.replace("/<[^>]*>/g","") 
          content.innerHTML=this.$route.query.data.content;
          this.ruleForm=this.$route.query.data;
      }
    },
    mounted(){

     // console.log(url.parse(this.$route.query.data))
    
      content.innerHTML=this.$route.query.data.content;
      this.ruleForm=this.$route.query.data;
     
    },
    methods: {
    
    }
  }
</script>
<style scoped>
  .form-section {
    padding: 10px;
    background:#fff;
    flex:1;
    overflow:auto;
  }
  p{
    line-height:50px;
  }
  .con{
     display:flex;
     margin-top:30px;
  }
  .con h1{
    width:100px;
  }
  .con div{
    flex:1;
    background:skyblue;
    line-height:25px;
    text-align:left;
    padding:15px;
    box-sizing:border-box;
  }
  
</style>
