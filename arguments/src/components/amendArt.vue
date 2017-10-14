<template>
  <section class="form-section">

    <h1>修改页面</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
    
      <el-form-item label="添加文章" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

        <el-form-item label="一级类名" prop="class">
        
    
            <el-select v-model="da.class" placeholder="请选择" @change="handleChange(da.class)">
                    <template v-for="k in options" > 
                      <el-option :label="k.onedata.cnname" :value="k.onedata.cnname"></el-option>
                    </template>
            </el-select>


        </el-form-item>

 <el-form-item label="二级类名" prop="class1">
        
    
            <el-select v-model="da.class1" placeholder="请选择">
                    <template v-for="k in options1" > 
                      <el-option :label="k.cnname" :value="k.cnname"></el-option>
                    </template>
            </el-select>


        </el-form-item>

     


      <el-form-item label="是否显示" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
       <el-form-item label="是否推荐" prop="tui">
        <el-radio-group v-model="ruleForm.tui">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

       <el-form-item label="作者" prop="autor">
        <el-input v-model="ruleForm.autor"></el-input>
      </el-form-item>

        <el-form-item label="导读" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc" :autosize="{maxRows:10,minRows:2}"></el-input>
        </el-form-item>
       
     

   <el-form-item label="时间" prop="time">
       <div class="block1">
        <el-date-picker
          v-model="ruleForm.time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
   </el-form-item>
    <el-form-item label="内容">
          <div>
          
             <div id="editor"></div>  
         
          </div>
    </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    
    </el-form> 
  
  </section>
</template>
<script>
  export default {
    data() {
      return {
        editor: null,
        forbidden: true,
        redStar: false,
        da:{
          class1:null, 
          class:null
        },
        ruleForm: {
          name: '',
          type: '',
          tui:"",
          time:"",
          autor:"",
          desc:"",
          editor:"",
          id:"",
          enname_one:"",
          oneId:"",
          twoId:""
        },
          class:null,
          time:"",
          autor:"",
          desc:"",
          class1:null,
        rules: {
          name: [
            {required: true, message: '添加文章', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ]
        },
        options: [],
        options1:[],
         pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }
      };
    },
    beforeRouteEnter(to,from,next){
         next((vm)=>{
            vm.editor = UE.getEditor('editor');
         })
    },
    mounted(){


      this.editor = UE.getEditor('editor');
      var _this=this;



      this.$http.get("/api/back_class/class_list").then(function(data){ 
           _this.options = data.data.data; 
            _this.da.class=data.data.data[0].onedata.cnname;
            _this.getdata();
           _this.options.forEach(function(item){
                if(item.onedata.id==_this.ruleForm.oneId){
                    _this.da.class=item.onedata.cnname;
                }
            })

            _this.options.forEach(function(item){
              item.twodata.forEach(function(k){
                  if(k.id==_this.ruleForm.twoId){
                      _this.da.class1=k.cnname;
                  }
               })
            })

           
      })


  
      
    
    },
    methods: {
      
      getdata(){
      
        if(this.$route.params.data){
         

            this.ruleForm.oneId=this.$route.params.data.oneId;
            this.ruleForm.twoId=this.$route.params.data.twoId;
            this.ruleForm.name=this.$route.params.data.article_name;
            this.ruleForm.autor=this.$route.params.data.editer;
            this.ruleForm.editor=this.$route.params.data.content;

           this.editor.addListener("ready",function(){
               this.editor.setContent(this.$route.params.data.content);
           }.bind(this))
           
            this.ruleForm.id=this.$route.params.data.id;
            this.ruleForm.time=this.$route.params.data.time;
            this.ruleForm.desc=this.$route.params.data.daodu;
            this.ruleForm.tui=this.$route.params.data.recommend.toString();
            this.ruleForm.type=this.$route.params.data.art_show.toString();
            this.ruleForm.enname_one=this.$route.params.data.enname_one;
        }
       
      
      },         
      getDate (str) {
        str = str.replace(/ GMT.+$/, '');// Or str = str.substring(0, 24)
        var d = new Date(str);
        var a = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];
        for(var i = 0, len = a.length; i < len; i ++) {
            if(a[i] < 10) {
                a[i] = '0' + a[i];
            }
        }
        str = a[0] + '-' + a[1] + '-' + a[2] + ' ' + a[3] + ':' + a[4] + ':' + a[5];
       return str;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) { 

                     this.ruleForm.editor=this.editor.getContent();
                  
                     this.ruleForm.time="2017-10-11 10:50:12";
                   
                      var _this=this;

                      
                      console.log(this.ruleForm)


                       this.ruleForm.tui=Number(this.ruleForm.tui)
                       this.ruleForm.type=Number(this.ruleForm.type)

                      this.$http.post('/api/back_article/amendArticle', {

                          id:_this.ruleForm.id,           //  当前文章的唯一标识
                          article_name:_this.ruleForm.name,   //文章标题
                          visitors:"10",    //当前文章的访客量
                          editer:_this.ruleForm.autor,    // 作者
                          content:_this.ruleForm.editor,    // 文章的内容
                          time:_this.ruleForm.time,    //  文章的创建时间
                          daodu:_this.ruleForm.desc,   // 文章的导读
                          recommend:_this.ruleForm.tui,    //boolen值，1代表true，0代表false 是否在首页推荐显示
                          art_show:_this.ruleForm.type ,   // boolen值，1代表true，0代表false 是否显示
                          enname_one:_this.ruleForm.enname_one    //一级分类的英文标识，根据此字段插入不同的表

                  
                      }).then(function (response) {
                        var info=response.data;
                        switch(info.code){
                          case "3031":
                            _this.$message({
                                message: "修改成功!！",
                                type: 'success'
                              });
                          _this.ruleForm.tui=String(_this.ruleForm.tui)
                          _this.ruleForm.type=String(_this.ruleForm.type)
                          break;
                          case "3030":
                            alert(info.msg)
                          break;
                        }
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
     
         this.editor.setContent("");
         this.$refs[formName].resetFields();
         this.da.class="";
         this.da.class1="";
  

      },
      handleChange(value) {

         var _this=this;
         _this.options.forEach(function(item){
           if(item.onedata.cnname==value){
             _this.options1=item.twodata;
            // _this.ruleForm.oneId=item.onedata.id;
             _this.ruleForm.enname_one=item.onedata.enname;
           }
         })
      }
    },
    // destroyed() {
    //         this.editor.destroy();
    // }
  }
</script>
<style>
  .form-section {
    padding: 10px;
  }
  h1{
    font-size:20px;
  }
  
</style>
