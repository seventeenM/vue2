<template>
    <div>   

     

      <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="一级类名" prop="cnname_one">
         <span>中文</span>
          <el-input  v-model="ruleForm.cnname_one" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="" prop="enname_one">
         <span>英文</span>
          <el-input  v-model="ruleForm.enname_one" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="二级类名"  prop="cnname_two">
         <span>中文</span>
          <el-input v-model="ruleForm.cnname_two"></el-input>
        </el-form-item>
         <el-form-item  prop="enname_two">
           <span>英文</span>
          <el-input  v-model="ruleForm.enname_two" auto-complete="off"></el-input>
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
      
      var validatePass = (rule, value, callback) => {
        console.log(rule,value)
        if (value === "") {
          callback(new Error('请输入密码'));
        } else {
        
          if(/^[a-zA-Z]{1,50}$/.test(this.ruleForm.enname_one) ||/^[a-zA-Z]{4,10}$/.test(this.ruleForm.enname_two)) {
             callback();
          }else{
            callback(new Error('格式不对'));
          }
        
        }
      };
     
        var validatePass1 = (rule, value, callback) => {
      
        if (value === "") {
          callback(new Error('请输入内容'));
        } else {
         
            callback();            
        }
      };

    return {
      ruleForm: {
          enname_one:"",
          cnname_one:"",
          enname_two:"",
          cnname_two:""
      },
      rules2: {
          enname_two: [
            { validator: validatePass, trigger: 'blur' }
          ],
          enname_one: [
            { validator: validatePass, trigger: 'blur' }
          ],
           cnname_two: [
            { validator: validatePass1, trigger: 'blur' }
          ],
          cnname_one: [
            { validator: validatePass1, trigger: 'blur' }
          ]
      },
      tableData5:[]
    }
  },
  created(){
      var _this=this;
     
  },
  methods:{
      submits(){
         console.log(this.ruleForm)
      
        
      },
      submitForm(formName) { 
        var _this=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(valid)
            
              this.$http.post("api/back_class/add_class_one",_this.ruleForm).then(function(data){
                  if(data.data.code=="1014"){
                      alert(data.data.msg)
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