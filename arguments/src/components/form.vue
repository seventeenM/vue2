<template>
  <section class="form-section">
  <h1>增加页面</h1>
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
        
    
            <el-select v-model="da.class1" placeholder="请选择"  @change="handleChange1(da.class1)">
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
          format="yyyy-MM-dd HH:mm:ss" @change="changetime"
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
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
          oneId:"",
          twoId:"",
          enname_one:""
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
          ],
          type: [
            {required: true, message: '是否显示', trigger: 'change'}
          ],
          tui: [
            {required: true, message: '是否推荐', trigger: 'change'}
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
  
    created(){
       
    },
    mounted(){
   this.editor = UE.getEditor('editor');
      var _this=this;

      this.$http.get("/api/back_class/class_list").then(function(data){ 
           _this.options = data.data.data; 
           _this.da.class=data.data.data[0].onedata.cnname;
          
      })
    
    },
    methods: {
      
          
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
                  
                    console.log(this.ruleForm.time)
                      var _this=this;
                      this.$http.post('/api/back_article/addArticle', {
                          oneId:_this.ruleForm.oneId,    // 文章所归属的一级分类id
                          twoId:_this.ruleForm.twoId,     // 文章所归属的二级分类id
                          article_name:_this.ruleForm.name,    //文章标题
                          editer:_this.ruleForm.autor,    // 作者
                          content:_this.ruleForm.editor,    // 文章的内容
                          time:_this.ruleForm.time,    //  文章的创建时间
                          daodu:_this.ruleForm.desc,    // 文章的导读
                          recommend:_this.ruleForm.tui,    //boolen值，1代表true，0代表false 是否在首页推荐显示
                          art_show:_this.ruleForm.type,     // boolen值，1代表true，0代表false 是否显示
                          enname_one:_this.ruleForm.enname_one    //一级分类的英文标识，根据此字段插入不同的表
                  
                      }).then(function (response) {
                        var info=response.data;
                        switch(info.code){
                          case "3011":
                            _this.$message({
                                message: "提交成功!！",
                                type: 'success'
                              });
                          break;
                          case "3010":
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
      

      },
      handleChange(value) {

         var _this=this;
         _this.options.forEach(function(item){
           if(item.onedata.cnname==value){
             _this.options1=item.twodata;
             _this.ruleForm.oneId=item.onedata.id;
             _this.ruleForm.enname_one=item.onedata.enname;
           }
         })
       
      },
      handleChange1(value){
        var _this=this;
         _this.options1.forEach(function(item){
          
           if(item.cnname==value){
  
             _this.ruleForm.twoId=item.id;
         
           }
         })
      },
      changetime(time){
       
        this.ruleForm.time=time;
       
      
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
  
</style>
