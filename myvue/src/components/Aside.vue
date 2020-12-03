<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#5980a0"
            text-color="#ffffff"
            active-text-color="#142334"
            router
        >
            <template v-for="item in items">
                <template>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        {{item.title}}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from "../assets/js/bus"
export default {
    data(){
        return {
            collapse:false, //折叠属性
            items:[
                {
                    icon:'el-icon-document',
                    index:'backinfo',
                    title:'后台首页'
                },
                {
                    icon:'el-icon-document',
                    index:'consumers',
                    title:'用户管理'
                },
                {
                    icon:'el-icon-document',
                    index:'notelist',
                    title:'博客管理'
                }
            ]
        }
    },
    computed:{
        onRoutes(){
            return this.$route.path.replace('/','');
        }
    },
    created(){
        //通过bus进行组件间的通信，来折叠侧边栏
        bus.$on('collapse',msg=>{
            this.collapse = msg    //意思是接收到信息后让我的collapse属性发生变化
        })
    }
}
</script>

<style scoped>
.sidebar{
    display:block;
    position: absolute;
    left:0;
    top:70px;
    bottom: 0;
    background-color: #819797;
    overflow-y:scroll;
}
.sidebar-el-menu:not(.el-menu--collapse){
    width:150px;
}
.sidebar >ul{
    height:100%;
}
</style>