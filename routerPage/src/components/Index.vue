<template>
     <div id="all">
        <div class="list">
          <ul>
            <router-link :to="{name:'hot'}" tag="li">热门</router-link>
            <router-link :to="{name:'fen'}" tag="li">分类</router-link>
            <router-link :to="{name:'jing'}" tag="li">精品</router-link>
            <router-link :to="{name:'zhi'}" tag="li">直播</router-link>
            <router-link :to="{name:'guang'}" tag="li">广播</router-link>
          </ul>
        </div>
        <div class="cons">
            
           <router-view></router-view>

        </div>
      </div>
</template>
<script>
 export default {
     data(){
         return {
             name:"index"
         }
     }
 }
</script>
<style>

</style>