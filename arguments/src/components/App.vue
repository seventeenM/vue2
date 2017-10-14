<template>
  <el-row class="container" style="height: 100%">
    <v-header :user="user"></v-header>
    <el-col :span="24" class="main">
      <el-row>
        <el-menu :default-active="$route.path" class="mar-l el-menu-vertical-demo el-col" light router>
          
            <el-collapse v-model="activeNames" >
                <el-collapse-item v-for="(k,index) in arr" :title="k.name" :name="index+1">

                          <router-link :to="{name:key.route}" tag="div" v-for="key in k.childs" class="lis">
                               {{key.title}}
                          </router-link>
                    
              </el-collapse-item>
            </el-collapse>

      
        </el-menu>
        <section class="contentCon">
          <el-col :span="21" :offset="3" class="content-wrapper">
            <transition>
           
              <router-view></router-view>
          
            </transition>
          </el-col>
        </section>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  import header from './header.vue';
  const ERR_OK = "000";
  export default {
    data () {
      return {
         activeNames: ['1'],
        user: {
          name:"后台管理系统"
        },
        arr:[
          {
            name:"文章管理",
            path:0,
            childs:[
              {
                route:"add_article",
                title:"添加文章"
              },
              {
                route:"article_list",
                title:"文章列表"
              }
            ]
          },
          {
            name:"分类管理",
             path:1,
            childs:[
               {
                route:"add_type",
                title:"添加一级分类"
              },
               {
                route:"add_type1",
                title:"添加二级分类"
              },
              {
                route:"type_list",
                title:"分类列表"
              }
            ]
          },
          {
            name:"接口管理",
             path:2,
            childs:[
               {
                route:"add_port",
                title:"添加接口"
              },
              {
                route:"portlist_font",
                title:"前台接口列表"
              },
              {
                route:"portlist_back",
                title:"后台接口列表"
              }
            ]
          },
          {
            name:"留言板管理",
             path:3,
            childs:[
               {
                route:"add_char",
                title:"添加留言"
              },
              {
                route:"char_list",
                title:"留言板列表"
              }
            ]
          }
        ]
      };
    },
    created () {
      // this.$http.get('/api/user').then((response) => {
      //   response = response.data;
      //   if (response.code === ERR_OK) {
      //     this.user = response.datas;
      //   }
      // });
    },
    beforeCreate () {
      // if (this.$route.path === '/') {
      //   //this.$router.push({path: '/index'})
      // }
    },
    components: {
      'v-header': header
    }
  };
</script>
<style>


  /* fa图标右侧需要流出空白 elementUI图标已自带样式 */
  i.fa {
    vertical-align: baseline;
    margin-right: 10px;
  }
  body {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    background-color: #F2F2F2;
  
  }
  .form-section{
   
  }
  .el-form-item{
    width:780px;
  }
  .block{
    margin-top:30px;
    text-align:center;
  }
  input{
    width:300px;
  }
  textarea{
    width:300px;
  }
  .menu,
  .el-menu {
    width:150px;
    height: 100%;
    background-color: #E6E6E6;
    position: fixed;
    float: left;
    overflow:hidden;
  }

  .container {
    box-sizing:border-box;
    padding-top: 60px;
    height: 100%;
  }

  .container .main {
    padding: 0;
  }
   .lis{
     height:50px;
     line-height:50px;
     text-align:center;
     
   }
   .bg{
     color:red;
   }
  .el-collapse-item__header{
    line-height:60px;
    height:60px;
    padding-left:30px;
    box-sizing:border-box;
   
   
  }
  .el-collapse-item__content{
     padding:0;
  }
.el-collapse-item__header:hover{
    background:#eee;
  }
  .lis:hover{
    background:#eee;
  }


  .container .content-wrapper {
   
    padding-left: 40px;
    box-sizing:border-box;
    padding-top:15px;
    
  }

</style>

