<template>
    <div class="headerr">
        <!--折叠图片-->
        <div class="collapse-btn" @click="jumpHelloWorld">
            <i class="el-icon-menu"/>
        </div>
        <div class="logo">快来玩鸭</div>



 <div class="headerr-right">


    <el-dropdown class="headerr-mid">
    <span class="el-dropdown-link">
        新建<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="jumpflowchart">flowchart</el-dropdown-item>
        <el-dropdown-item @click.native="jumpmarkdown" disabled>markdown</el-dropdown-item>
        <el-dropdown-item disabled>uml</el-dropdown-item>
        <el-dropdown-item disabled>mind map</el-dropdown-item>
    </el-dropdown-menu>
    </el-dropdown>    


<el-input placeholder="搜索" v-model="searchinput" :disabled="true" style="margin-right:80px;">
        </el-input>

            <div class="btn-fullscreen" @click='handleFullScreen'>
                <el-tooltip :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                <i class="el-icon-rank"/>
                </el-tooltip>
            </div>
            <div class='user-avator'>
                <img src='../assets/img/default_avatar.png'/>
            </div>
            <el-dropdown class="user-name">
                <span class='el-dropdown-link'>
                    {{userName}}
                    <i class="el-icon-caret-bottom"/>
                </span>
                <el-dropdown-menu slot='dropdown'>
                    <el-dropdown-item @click.native="userLogin">用户登录</el-dropdown-item>
                    <el-dropdown-item @click.native="jumpMyFile">我的文件</el-dropdown-item>
                    <el-dropdown-item @click.native="userLogout">退出登录</el-dropdown-item>
                    <el-dropdown-item @click.native="jumpAdminLogin">后台入口</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import bus from "../assets/js/bus"
import {utils} from "../utils/index"
export default {
    mixins:[utils],
    data(){
        return{
            fullscreen:false
        }
    },
    methods:{
        userLogin(){
            bus.$emit('login');
        },
        userLogout(){

        },
        jumpAdminLogin(){
            this.$router.push("/login");

        },
        jumpMyFile(){
            this.$router.push('/myfiles');
        },
        jumpHelloWorld(){
            this.$router.push('/');
        },
        jumpflowchart(){this.$router.push('/flowchart');},
        jumpmarkdown(){this.$router.push('/markdown');},
        
    }
    
}
</script>

<style scoped>
.headerr{
    position: relative;
    background-color:#fff;
    box-sizing:border-box;
    width:100%;
    height:70px;
    font-size:22px;
    color:black;
    margin:0;
    z-index: 100;
}
.headerr .headerr-right .headerr-mid{
    display: flex;
    align-items: center;
    margin-right:60px;
}

.collapse-btn{
    float:left;
    padding:0 21px;
    cursor:pointer;
    line-height: 70px;
}
.headerr .logo{
    float:left;
    line-height:70px;
}.headerr .headerr-right{
    float:right;
    padding-right:50px;
    display: flex;
    height:70px;
    align-items: center;
}
.btn-fullscreen{
    transform:rotate(45deg);
    margin-right:5px;
    font-size:24px;
    margin-right: 20px;
}

.user-avator img{
    display: block;
    width:40px;
    height:40px;
    border-radius: 50%;
}
.user-name{
    margin-left:10px;

}
.el-dropdown-link{
    color:black;
    cursor:pointer;
    width:50px;
}
</style>