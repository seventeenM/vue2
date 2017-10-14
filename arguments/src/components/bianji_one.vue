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
    
        if (value === "") {
          callback(new Error('请输入内容'));
        } else {
        
          if(/^[a-zA-Z]{1,50}$/.test(this.ruleForm.enname_one)) {
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
        
      },
      app:"",
      rules2: {
          enname_one: [
            { validator: validatePass, trigger: 'blur' }
          ],
          cnname_one: [
            { validator: validatePass1, trigger: 'blur' }
          ]
      },
      tableData5:[]
    }
  },
  created(){
      this.app=this.$route.params.data.onedata.enname;


      this.ruleForm.enname_one=this.$route.params.data.onedata.enname;
      this.ruleForm.cnname_one=this.$route.params.data.onedata.cnname;

     
  },
  methods:{
     
      submitForm(formName) { 
        var _this=this;
        this.$refs[formName].validate((valid) => {
          console.log(valid)

          if (valid) {
          
            
              this.$http.post("/api/back_class/amend_class_one",{
                oldenname_one:_this.app , //原一级类名的英文标识
                enname_one: _this.ruleForm.enname_one,    //新改变一级类名的英文标识
                cnname_one: _this.ruleForm.cnname_one    //新改变一级类名的中文标识
              }).then(function(data){
                  if(data.data.code=="1052"){
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