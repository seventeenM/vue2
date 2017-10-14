<template>
    <div>   
      <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input  v-model="ruleForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">

          <el-input  v-model="ruleForm.title" auto-complete="off"></el-input>
        </el-form-item>
          <el-form-item label="内容" prop="content">
                <el-input type="textarea" v-model="ruleForm.content" :autosize="{maxRows:10,minRows:2}"></el-input>
          </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>


<script>
export default {
  data() {
      

       var validatePass1 = (rule, value, callback) => {
      
        if (value === "") {
          callback(new Error('请输入内容'));
        } else {
         
            callback();            
        }
      };
     

    return {
      ruleForm: {
          name:"",
          title:"",
          content:""
      },
      app:"",
      rules2: {
          name: [
            { validator: validatePass1, trigger: 'blur' }
          ],
          title: [
            { validator: validatePass1, trigger: 'blur' }
          ],
          content: [
            { validator: validatePass1, trigger: 'blur' }
          ]
      }
    }
  },
  created(){
    
     
  },
  methods:{
     
      submitForm(formName) { 
        var _this=this;
        this.$refs[formName].validate((valid) => {
          console.log(valid)

          if (valid) {
          
            
              this.$http.post("/api/char/add_char",_this.ruleForm ).then(function(data){
                console.log(data)
                  if(data.data.code=="6032"){
                     _this.$message({
                            message: "添加成功!！",
                            type: 'success'
                      });
                  }
              })
              

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>
<style>
 .form-section {
    padding: 10px;
    width: 500px;
  }
  .el-input{
      width:250px;
  }
</style>