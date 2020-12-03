<template>
<div>
<draw-header></draw-header>
    <div class="login-wrap">
        <div class="kc-title"> Koala Calendar 后台 </div>
        <div class="kc-login">
            <el-form :model="ruleForm" :rules="rules" :ref="ruleForm">
                <el-form-item prop = "username">
                    <el-input v-model="ruleForm.username" placeholder="管理员账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="ruleForm.password" rules="rules" placeholder="密码"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</div>
</template>

<script>
import {getLoginStatus} from "../api/index";
import {utils} from "../utils/index";
import DrawHeader from "../components/DrawHeader"
export default {
  name: 'AdminLogin',
  mixins:[utils],
  components:{
      DrawHeader
  },
  data:function(){
      return {
          ruleForm:{
              username:"Treepobear",
              password:"708988"
          },
          rules:{
              username:[{
                      required:true,
                      message:"请输入账号",
                      trigger:"blur"
                  }],
              password:[{
                    required:true,
                    message:"请输入密码",
                    trigger:"blur"
              }]
          }
      }
  },
  methods:{
      submitForm(){
        //   let params = new FormData();
        //   params.append('name',this.ruleForm.username);
        //   params.append('password',this.ruleForm.password);

        var params = {
            name:this.ruleForm.username,
            password:this.ruleForm.password
        }

          getLoginStatus(params)
            .then((res)=>{
                if(res.code == 1){
                    localStorage.setItem('userName',this.ruleForm.username);
                    this.notify("登录成功","success");
                    this.$router.push("/backinfo");
                }else{
                    this.notify("登录失败","error");
                }
            })
      }
  }
}
</script>

<style>
.login-wrap{
  position: absolute;
  background-image: url('../assets/img/background1.jpg');
  width: 100%;
  height:100%;
  background-size:cover;
  background-position: center;
  background-attachment: fixed;
}
.kc-title{
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    color:#ffffff;
}
.kc-login{
    position: absolute;
    left:50%;
    top:50%;
    width:400px;
    height: 180px;
    margin-left: -230px;
    margin-top: -150px;
    padding: 40px;
    border-radius: 5px;
    background-color:#ffffff;
}
.login-btn{
    text-align: center;
}
.login-btn button{
    width:100%;
    height: 40px;
    background-color: brown;
}

</style>

