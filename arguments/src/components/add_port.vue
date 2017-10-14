<template>
    <div>
        <h3>增加标题</h3>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="文章标题" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
             <el-form-item label="接口地址" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请求类型" prop="region2">
                <el-select v-model="ruleForm.region2" placeholder="请选择">
                   <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
         
         
            <el-form-item label="请求参数" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc" :autosize="{maxRows:10,minRows:2}"></el-input>
            </el-form-item>
             <el-form-item label="返回数据" prop="desc2">
                <el-input type="textarea" v-model="ruleForm.desc2" :autosize="{maxRows:10,minRows:2}"></el-input>
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
      return {

        options:[{
          value: 'post',
          label: 'post'
        }, {
          value: 'get',
          label: 'get'
        },
        {
          value: 'formdata',
          label: 'formdata'
        }],
        options1:[{
          value: 'font',
          label: '前台接口'
        }, {
          value: 'back',
          label: '后台接口'
        }],

        ruleForm: {
          name: '',
          address:"",
          region: '',
          region2:"",
          desc:"",
          desc2:""
        },
        rules: {
          name: [
            { required: true, message: '请输入标题名称', trigger: 'blur' }
          ],
          region2: [
            {  required: true, message: '请选择请求类型', trigger: 'blur'  }
          ],
          address: [
            {  required: true, message: '请选择请求地址', trigger: 'blur'  }
          ]
        }
      };
    },
    props: {
      defaultMsg: {
        type: String
      },
      config:  {
          initialFrameWidth: null,
          initialFrameHeight: 350
      },
      id: {
        type: String
      },
    },
    methods: { 
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
         
            console.log(this.ruleForm)
            
              this.getDate();


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getDate(){
       
        var _this=this;
          this.$http.post('/api/apilist/', {
              title:_this.ruleForm.name,  //接口标题
              url:_this.ruleForm.address, //接口地址
              type:_this.ruleForm.region2,//接口类型
              sendparams:_this.ruleForm.desc, //发送的参数
              getparams:_this.ruleForm.desc2, //响应参数
              backorfont:_this.ruleForm.region //前台或后台接口
          }).then(function (response) {
            var info=response.data;
            switch(info.code){
              case "2000":
                alert(info.msg)
              break;
              case "2001":
                alert(info.msg)
              break;
            }
          },function (error) {
              console.log(error);
          })
       
    
      }
    }
  }
</script>
 
<style>
  .editor-container{
    width: 100%;
  }
  #edui1{
    width: 100% !important;
  }
  #edui1_iframeholder{
    height: 200px;
  }
    .edui-editor-iframeholder edui-default{
      height: 300px;
    }
</style>
