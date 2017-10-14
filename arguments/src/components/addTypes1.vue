<template>
    <div>   

      <el-form label-width="100px" :model="ruleForm" :rules="rules2" ref="ruleForm" >
        <el-form-item label="选择一级分类" >
              <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.onedata.id"
                    :label="item.onedata.cnname"
                    :value="item.onedata.id">
                  </el-option>
                </el-select>
        </el-form-item>
        <el-form-item label="添加二级分类"  prop="cname1" >
          <span>中文</span>
          <el-input v-model="ruleForm.cname1" placeholder="请输入内容"></el-input>
       </el-form-item>
        <el-form-item  prop="ename1">
           <span>英文</span>
          <el-input  v-model="ruleForm.ename1" auto-complete="off"></el-input>
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
        
          if(/^[a-zA-Z]{1,50}$/.test(this.ruleForm.ename1)) {
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
      ruleForm:{
           cname1:"",
           ename1:""
      },
     options: [
     
     ],
      value: '',
      rules2: {
          ename1: [
            { validator: validatePass, trigger: 'blur' }
          ],
          cname1: [
            { validator: validatePass1, trigger: 'blur' }
          ]
      }
    }
  },
  created(){
      var _this=this;
     
      this.$http.get("/api/back_class/class_list").then(function(data){ 
        
           _this.options = data.data.data;
           console.log( _this.options)
         
      })
  },
  methods:{
     
       submitForm(formName) { 
        var _this=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
        
              this.$http.post("/api/back_class/add_two_class",{
                      oneId:_this.value,  //所属一级分类id
                      enname_two:_this.ruleForm.ename1,  //二级英文标识
                      cnname_two:_this.ruleForm.cname1   //二级名称
              }).then(function(data){
                  if(data.data.code=="1032"){
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
        this.value="";
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