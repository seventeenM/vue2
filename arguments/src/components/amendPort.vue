<template>
    <div>
        <h3>修改接口文档</h3>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
             <el-form-item label="接口地址" prop="url">
                <el-input v-model="ruleForm.url"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="backorfont">
                <el-select v-model="ruleForm.backorfont" placeholder="请选择">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请求类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择">
                   <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
         
         
            <el-form-item label="请求参数" prop="sendparams">
                <el-input type="textarea" v-model="ruleForm.sendparams" :autosize="{maxRows:10,minRows:2}"></el-input>
            </el-form-item>
             <el-form-item label="返回数据" prop="getparams">
                <el-input type="textarea" v-model="ruleForm.getparams" :autosize="{maxRows:10,minRows:2}"></el-input>
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
        },
        rules: {
          title: [
            { required: true, message: '请输入标题名称', trigger: 'blur' }
          ],
          url: [
            {  required: true, message: '请选择请求类型', trigger: 'blur'  }
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
    created(){
       console.log(this.$route.params.data)
       this.ruleForm=this.$route.params.data
    },
    mounted() {
         
    },
    methods: { 
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
         
         
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
          this.$http.post('/api/apilist/amend', _this.ruleForm).then(function (response) {
            var info=response.data;
            switch(info.code){
              case "2022":
                alert(info.msg)
              break;
              case "2021":
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
