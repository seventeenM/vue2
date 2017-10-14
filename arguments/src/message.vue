<template>
    <div>   

     

      <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
       
          <el-input  v-model="ruleForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
      
          <el-input  v-model="ruleForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号"  prop="tel">
       
          <el-input v-model="ruleForm.tel"></el-input>
        </el-form-item>
         <el-form-item label="内容"  prop="content">
         
          <el-input  v-model="ruleForm.content" auto-complete="off"></el-input>
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
         email:"",
         tel:"",
         content:""
      },
      rules2: {
          name: [
            { validator: validatePass1, trigger: 'blur' }
          ],
           email: [
            { validator: validatePass1, trigger: 'blur' }
          ],
          tel: [
            { validator: validatePass1, trigger: 'blur' }
          ],
           content: [
            { validator: validatePass1, trigger: 'blur' }
          ]
      },
      tableData5:[]
    }
  },
  created(){
    const _this=this;

    $.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
      
          _this.ruleForm.city=remote_ip_info.city;
          _this.ruleForm.province=remote_ip_info.province;
          _this.ruleForm.country=remote_ip_info.country;

    })
     
    $.getScript("http://pv.sohu.com/cityjson?ie=utf-8",function(){

          _this.ruleForm.ip=returnCitySN.cip;

    })

  },
  methods:{
      submits(){
         console.log(this.ruleForm)
      },
      submitForm(formName) { 
        var _this=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
           
              this.$http.post("/api/message/insertmsg",_this.ruleForm).then(function(data){
                  console.log(data)
                  if(data.data.code=="7011"){
                       alert("sucess");
                  }else{
                    
                  }
              },function(err){
                 console.log(err)
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