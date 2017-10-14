<template>
    <div>   

     

      <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
     
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
      
        if (value === "") {
          callback(new Error('请输入内容'));
        } else {
        
          if(/^[a-zA-Z]{1,50}$/.test(this.ruleForm.enname_two)) {
             callback();
          }else{
            callback(new Error('必须为英文 , 且4-6位'));
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
       
          enname_two:"",
          cnname_two:""
      },
      rules2: {
          enname_two: [
            { validator: validatePass, trigger: 'blur' }
          ],
          cnname_two :[
            { validator: validatePass1, trigger: 'blur' }
          ]
      },
      app:"",
      tableData5:[]
    }
  },
  created(){
     this.app=this.$route.params.data.enname;
      this.ruleForm.enname_two=this.$route.params.data.enname;
      this.ruleForm.cnname_two=this.$route.params.data.cnname;
     
  },
  methods:{
    
      submitForm(formName) { 
        var _this=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(valid)
            
             this.$http.post("/api/back_class/amend_class_two",{
                oldenname_two:_this.app , //原二级类名的英文标识
                enname_two: _this.ruleForm.enname_two,    //新改变二级类名的英文标识
                cnname_two: _this.ruleForm.cnname_two    //新改变二级类名的中文标识
              }).then(function(data){
                  if(data.data.code=="1062"){
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