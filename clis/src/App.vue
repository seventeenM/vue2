<template>
  <div id="app">
    <header id="header">
       <h1>淡淡遗忘~的个人博客</h1>
    </header>
    <div class="content">
        <div class="left">
         
            <el-input
              placeholder="一级类名"
              icon="search"
              v-model="input2"
              id="int"
              :on-icon-click="handleIconClick">
            </el-input>

              <el-table
                :data="tableData"
                 @row-click="dbclick"
                style="width: 100%">
                <el-table-column
                  prop="article_name"
                  label="相关文章"
                  >
                </el-table-column>
              </el-table>


               <hr color="red" id="hr"/>


                <el-table
                :data="tableData1"
                 @row-click="dbclick1"
                id="er"
                style="width: 100%">
                <el-table-column
                  prop="cnname"
                  label="二级类名"
                   >
                </el-table-column>
              </el-table>


        </div>
        <div class="right">
          <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">首页</el-menu-item>

            <el-submenu index="2">
              <template slot="title">一级分类</template>
              <el-menu-item v-for="k in data" :index="k.onedata.id">{{k.onedata.cnname}}</el-menu-item>
            </el-submenu>

             <el-submenu index="3">
              <template slot="title">二级分类</template>
              <el-menu-item v-for="k in data1" :index="k.id">{{k.cnname}}</el-menu-item>
            </el-submenu>


          </el-menu>

          <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/sub_one',query:{data:one} }" v-if="one!=''">{{one}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/sub_two',query:{data:two} }" v-if="two!=''">{{two}}</el-breadcrumb-item>
          </el-breadcrumb>
                    
          <router-view/>
        
        </div>
    </div>
   
   
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
      return {
        activeIndex2: '1',
        data:[],
        data1:[],
        one:"",
        two:"",
        obj:null,
        input2: '技术',
        tableData:[],
        tableData1:[],
        id:""
       
      };
  },
  watch:{
     obj(){
        this.one=this.obj.cnname_one
        this.two=this.obj.cnname_two
   
      
       
     },
  },
  mounted(){
   

      this.getDa();
      this.getGet();
    
  },
  methods: {
      getGet(){
       var _this=this;  
        this.$http.get("/api/front_article/getNav").then(function(data){
           
            if(data.data.code=="6010"){
                _this.data=data.data.data;
                _this.data1=data.data.data[0].twodata;
                _this.data.forEach(function(item){
                
                  if(_this.input2==item.onedata.cnname){
                    _this.tableData1=item.twodata;  
                   
                  }
                })
            }
        })
      },
      getDa(){
        
        var _this=this;  
        
        this.$http.get("/api/front_article/getArticleAll").then(function(data){
       
        if(data.data.code=="6012"){
         
            data.data.data.forEach(function(item){
          
                if(item.cnname_one==_this.input2){
                   _this.tableData.push(item)
                   _this.id=item.id  

                }
            })
           }
        })
      },
      handleIconClick(ev) {
         this.tableData=[]; 
  
         this.getDa();

         this.getGet();


      },
      dbclick(i){
         this.one=this.input2;
        // console.log(i)
         this.two=i.cnname_two;
      
         this.$router.push({ path: '/cha',query:{data:i,id:i.id}});
      },
       dbclick1(i){
          var _this=this;  

                 this.tableData.forEach(function(item){
                 
                    if(item.cnname_two==i.cnname){
                       _this.$router.push({ path: '/sub_two',query:{data:i.cnname} });
                    }
                
                })
      },
      handleSelect(key, keyPath) {
   
       var _this=this;

        if( keyPath[0]=="2"){

          this.data.forEach(function(item){
              if(item.onedata.id==key){
                 _this.data1=item.twodata
                 _this.one=item.onedata.cnname
                 _this.two="";
                 _this.$router.push({ path: '/sub_one',query:{data:_this.one} });
              }
          })

        }else if( keyPath[0]=="3"){
           if(_this.one==""){
               this.data.forEach(function(item){
                 item.twodata.forEach(function(k){
                    if(k.id==key){
                      _this.one=item.onedata.cnname
                      _this.two=k.cnname
                      _this.$router.push({ path: '/sub_two',query:{data:_this.two} });
                    }
                 })
                })
           }else{
              this.data1.forEach(function(item){
                  if(item.id==key){
                      _this.two=item.cnname
                     _this.$router.push({ path: '/sub_two',query:{data:_this.two} });
                  }
              })
           }
        }else if(keyPath[0]=="1"){
             _this.one=""
             _this.two=""
             this.$router.push({ path: '/' });
        }
      }
  }
}
</script>

<style>

*{
  padding:0;
  margin:0;
}
a{
  text-decoration: none;
}
html,body{
  width:100%;
  height:100%;
}
#header{
  width:100%;
  height:50px;
   position: relative;
}
#header h1{
   position: absolute;
   top:10px;
   left:-125px;
   font-size:21px;
   color:#fff;
}

#hr{
  margin-top:30px;
}
.list h3{
   text-align:center;
}
#int{
  margin-top:15px;
  margin-bottom:15px;
}
.list li{
  text-align:left;
  padding:10px;
  padding-bottom:none;
  list-style:none;
  border-bottom:1px solid #ccc;
}
p{
  position: relative;
}
#search{
  position: absolute;
  right: 10px;
  top: -1px;
}
.content{
  flex:1;
  display:flex;
}
.left{
  width:200px;
  background:#fff;
  padding:0 3px 0 3px;
  height:500px;
  overflow:auto;
  padding-bottom:20px;
}
.left img{
  width:100%;
}
.right{
  flex:1;
  padding:10px;
  padding-left:50px;
  box-sizing:border-box;
  overflow:auto;
  display:flex;
  flex-direction:column;
}
body{
  background:url("../static/img/5.jpg") no-repeat;
  background-size:100% 100%;
}
#app {
  display:flex;
  flex-direction:column;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
  width:1000px;
  margin:0 auto;
}
#er{
  margin-top:30px;
}
.el-breadcrumb__item:last-child .el-breadcrumb__item__inner{
  color:#333;
  font-size:16px;
}
.el-breadcrumb__item{
     line-height:55px;
     //background:rgba(220,220,220,.5);
     
}
.block{
  margin-top:30px;
}
.el-table__body-wrapper .el-table__body .el-table__header{
  width:100%;
}
.el-table_1_column_2 is-leaf{
  
}
..el-table__header-wrapper thead div{
 background:#ccc;
}
</style>
