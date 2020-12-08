<template>
<div>

<el-dialog title="登录" :visible.sync="loginVisable" width="400px" center>
  <el-form :model="ruleForm" :rules="rules" :ref="ruleForm">
                <el-form-item prop = "username">
                    <el-input v-model="ruleForm.username" placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="ruleForm.password" rules="rules" placeholder="密码"></el-input>
                </el-form-item>
    </el-form>
<div style="text-align:center;">
      <el-button @click="userRegister" style="width:35%" >注册</el-button>
      <el-button type="primary" @click="userLogin" style="width:60%">确定</el-button>
</div>
</el-dialog>

    <el-dialog title="注册" :visible.sync="registerVisable" width="400px" center>
            <el-form :model="registerForm" ref="registerForm" label-width="80px">
            <el-form-item prop="id" label="邮箱" size="mini">
                <el-input v-model="registerForm.id" placeholder="邮箱地址"/>
            </el-form-item>
            <el-form-item prop='password' label="密码" size="mini">
                <el-input type="password" v-model="registerForm.password" placeholder="密码"/>
            </el-form-item>
            <el-form-item prop="confirmpassword" label="确认密码" size="mini">
                <el-input type="password" v-model="registerForm.confirmpassword" placeholder="重复密码"/>
            </el-form-item>
            <el-form-item prop="name" label="昵称" size="mini">
                <el-input v-model="registerForm.name" placeholder="昵称"/>
            </el-form-item>
            <el-form-item prop="birth" label="生日" size="mini">
                <el-date-picker type='date' placeholder="选择日期" v-model="registerForm.birth" style="width:100%"/>
            </el-form-item>
            <el-form-item label="性别" size="mini">
                <el-radio-group v-model="registerForm.sex">
                    <el-radio :label='0'>女</el-radio>
                    <el-radio :label='1'>男</el-radio>
                    <el-radio :label='2'>其他</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="location" label="地区" size="mini">
                <el-input v-model="registerForm.location" placeholder="地区"/>
            </el-form-item>
            <el-form-item prop="introduction" label="简介" size="mini">
                <el-input v-model="registerForm.introduction" placeholder="简介" type="textarea"/>
            </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button size="mini" @click="registerVisable=false">取消</el-button>
                <el-button size="mini" @click="addUser">确定</el-button>
            </span>
        </el-dialog>

<div class="sky">
  <div class="birds">
    <div class="bird10"></div>
    <div class="bird9"></div>
    <div class="bird8"></div>
    <div class="bird7"></div>
    <div class="bird6"></div>
    <div class="bird5"></div>
    <div class="bird4"></div>
    <div class="bird3"></div>
    <div class="bird2"></div>
    <div class="bird1"></div>
    <div class="bird0"></div>
  </div>
  <div class="clouds">
    <div class="cloud30"></div>
    <div class="cloud29"></div>
    <div class="cloud28"></div>
    <div class="cloud27"></div>
    <div class="cloud26"></div>
    <div class="cloud25"></div>
    <div class="cloud24"></div>
    <div class="cloud23"></div>
    <div class="cloud22"></div>
    <div class="cloud21"></div>
    <!-- <div class="cloud20"></div>
    <div class="cloud19"></div>-->
    <div class="cloud18"></div>
    <div class="cloud17"></div> 
    <div class="cloud16"></div>
    <div class="cloud15"></div>
    <div class="cloud14"></div>
    <div class="cloud13"></div>
    <div class="cloud12"></div>
    <div class="cloud11"></div>
    <div class="cloud10"></div>
    <div class="cloud9"></div>
    <div class="cloud8"></div>
    <div class="cloud7"></div>
    <!-- <div class="cloud6"></div>
    <div class="cloud5"></div> -->
    <div class="cloud4"></div>
    <div class="cloud3"></div>
    <div class="cloud2"></div>
    <div class="cloud1"></div>
    <div class="cloud0"></div>
  </div>
  <div class="plane"></div>
  <div class="title">
    <h1>Koala Calendar</h1>
  </div>
</div>

<ul class="globos">
  <li><div class="hilo"></div></li>
  <li><div class="hilo"></div></li>
  <li><div class="hilo"></div></li>
  <li><div class="hilo"></div></li>
  <li><div class="hilo"></div></li>
  <li><div class="hilos"></div></li>
  <li><div class="koala">
    <div class="cola"></div>
  <div class="orejas"></div>
    <div class="cuerpo"><span class="leg"></span></div>
    
  <div class="cara"><div class="ojos"></div><div class="nariz"></div></div>
 
</div>
</li>
</ul>

</div>
</template>

<script>
import bus from "../assets/js/bus"
import '../assets/css/frontpage.css'
import {setUser,userLoginStatus} from "../api/index"
import {utils} from "../utils/index"
export default{
  mixins:[utils],
  data(){
    return {
      ruleForm:{
              username:"",
              password:""
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
      },
      registerForm:{  //添加框
          id:'',
          name:'',
          sex:'',
          birth:'',
          location:'',
          introduction:'',
          password:'',
          confirmpassword:''
      },
      loginVisable: false,
      registerVisable:false,

    }
  },
  created(){
    bus.$on('login',()=>{
        this.loginVisable = true;
    })
  },
  methods:{
    userLogin(){
      var params = {
            name:this.ruleForm.username,
            password:this.ruleForm.password
        }

          userLoginStatus(params)
            .then((res)=>{
                if(res.code == 1){
                    localStorage.setItem('userName',this.ruleForm.username);
                    this.notify("登录成功","success");
                    this.$store.commit('setLoginIn',true);
                    this.$store.commit('setUserId',res.userMsg.id);
                    this.$store.commit('setUserName',res.userMsg.name);
                    this.$store.commit('setUserAvator',res.userMsg.pic);
                    this.loginVisable = false;
                }else{
                    this.notify("用户名或密码错误","error");
                }
            })

    },
    userRegister(){
      this.registerVisable = true;
    },
    addUser(){
      let d = this.registerForm.birth;
      let datetime = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
      let params = {
          id:this.registerForm.id,
          name:this.registerForm.name,
          sex:this.registerForm.sex,
          birth:datetime,
          location:this.registerForm.location,
          introduction:this.registerForm.introduction,
          pic:'img/avatar/default_avatar.jpg',
          password:this.registerForm.password
      };
      setUser(params)
            .then((res)=>{
                if(res.code == 1){
                    this.notify("注册成功","success");
                }else{
                    this.notify("注册失败","error");
                }
            })
      this.ruleForm.username = this.registerForm.id;
      this.registerVisable = false;
    
    }
  },
  mounted(){
    this.$emit('getTitle', "快来玩鸭");

  }
}
</script>