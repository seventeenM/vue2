<template>
    <div class="box">
       <h1>请登录</h1>
       <ul>
        <li v-forms="name">
            <label htmlFor="name">账号</label>
            <input type="text" id="name" v-model.lazy="name.value" @blur="changeFn(name)"/>
        </li>
        <li v-forms="pwd">
            <label htmlFor="pwd">密码</label>
            <input type="password" id="pwd" v-model.lazy="pwd.value"/>
        </li>
         <li>    
            <button @click="submit">登录</button>
        </li>
     
    </ul> 
    </div>
</template>
<script type="text/ecmascript-6">
  
  export default{
            name:"login",
            data(){
                return {
                    name:{
                        reg:/^[a-zA-Z]{4,10}$/,
                        msg:"您输入的账号格式不对",
                        required:true,
                        value:"",
                        isfocu:false,
                        state:false
                    },
                    pwd:{
                        reg:/^[a-zA-Z]\w{5,17}$/,
                        msg:"您输入的密码格式不对",
                        required:false,
                        value:"",
                        state:false
                    }
                }
            },
            methods:{
                changeFn(data){
               
                    data.isfocu=true;
                },
                submit(){
                 var _this=this;
                    if(this.name.state&&this.pwd.state){
                      this.$http.post("http://localhost:9999/api/back_class",{
                                      loginname:this.name.value,    //登录名
                                      loginpw:this.pwd.value,    //登录密码
                      }).then(function(data){
                          if(data.data.code=="1001"){
                         
                              window.sessionStorage.setItem("index",data.data.userid);
                              
                              _this.$router.push({
                                path:"/app"
                              })

                              _this.$message({
                                message: '登录成功',
                                type: 'success'
                              });

                          }else if(data.data.code=="1002"){
                             _this.$message.error('登录失败');
                          }
                      })

                    }else{
                        this.$message({
                          message: '请认真填写',
                          type: 'warning'
                        });
                    }
                }
            } ,
            directives:{
                forms:{
                    componentUpdated(el,binding){
                       // var $p=el.getElementsByTagName("p")[0];
                       //创建p
                        var createP=(msg)=>{
                                var $p=document.createElement("p");
                                    $p.innerHTML=msg;
                                    $p.style.color="red";
                                    el.appendChild($p);
                        }
                        var clearP=()=>{
                            var $p=el.getElementsByTagName("p")[0];
                            if($p!==undefined){
                                 el.removeChild($p);
                            }
                        }
                        var test=()=>{
                             clearP()
                             if(binding.value.value!==""){
                                if(!binding.value.reg.test(binding.value.value)){
                                //不符合条件，创建p
                                    createP(binding.value.msg)
                                    binding.value.state=false;
                                }else{
                                    //符合条件
                                    binding.value.state=true;
                                }
                             }
                            
                        }
                        var requiredFn=()=>{
                             if(binding.value.value===""){
                                 clearP();
                                if(binding.value.isfocu){
                                     createP("不能为空");
                                 }
                            }else{
                                test()
                            }
                        }
                        
                        switch(binding.value.required){
                            case true :{
                                requiredFn()
                            }break;
                            default:{
                                test();
                            }
                        }                    
                    }
                }
            }
    }
</script>
<style scoped>
h1{
    text-align:center;
    line-height:50px;
    color:orange;
}
 .box{
   width:300px;
   height:300px;
   margin:100px auto;
   border:10px solid orange;
  
   border-radius:18px;
 }
 ul{
   width:250px;
   height:250px;
    font-size:16px;
    margin:60px auto;
 }
 li{
   margin-top:15px;
 }
 li input{
   height:30px;
   padding-left:10px;
   box-sizing:border-box;
 }
 button{
   height:40px;
   width:100%;
   background:orange;
   border:none;
   margin-top:30px;
   color:#fff;
 }
</style>
