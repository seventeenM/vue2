<template>
  <div>
    <header>
       <p>{{user.name}}</p>
      
      </header>
  </div>
</template>
<script>
  export default {
    props: {
      user: {
      }
    },
    data () {
      return {
      };
    },
  };
</script>
<style>
  header {
    background-color:#5f9ea0;
    height: 60px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding: 0 20px;
    z-index: 999;
    box-sizing: border-box;
    position: fixed;

  }
  header p{
    text-align:center;
    line-height:60px;
    font-size:20px;
    color:#fff;
  }
  
</style>
