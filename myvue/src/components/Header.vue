<template>
    <div class="headerr">
        <!--折叠图片-->
        <div class="collapse-btn" @click="collapseChange">
            <i class="el-icon-menu"/>
        </div>
        <div class="logo">Koala Calendar 后台</div>
        <div class="headerr-right">
            <div class="btn-fullscreen" @click='handleFullScreen'>
                <el-tooltip :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                <i class="el-icon-rank"/>
                </el-tooltip>
            </div>
            <div class='user-avator'>
                <img src='../assets/img/admin_avatar.jpg'/>
            </div>
            <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                <span class='el-dropdown-link'>
                    {{userName}}
                    <i class="el-icon-caret-bottom"/>
                </span>
                <el-dropdown-menu slot='dropdown'>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
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
        return {
            collapse:false,
            fullscreen:false
        }
    },
    computed:{
        userName(){
            return localStorage.getItem('userName');
        }
    },
    methods:{
        //侧边栏折叠
        collapseChange(){
            this.collapse = !this.collapse;
            bus.$emit('collapse',this.collapse);
        },
        handleCommand(){
            // if(command == "logout"){
                localStorage.removeItem('userName');
                this.$router.push("/login");
            // }
        }
    }
}
</script>

<style scoped>
.headerr{
    position: relative;
    background-color:#2e465b;
    box-sizing:border-box;
    width:100%;
    height:70px;
    font-size:22px;
    color:white;
    margin:0;
    z-index: 100;
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
}
.headerr .headerr-right{
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
    color:white;
    cursor:pointer;
}
</style>