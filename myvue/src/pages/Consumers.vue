<template>
    <div class = "table">
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" size="mini" @click="multiDeleteConfirmVisable=true">批量删除</el-button>
                <el-input v-model="select_word" size="mini" placeholder="请输入昵称或id" class="handle-input">
                </el-input>
                <el-button type="primary" size="mini" @click="centerDialogVisable=true">添加用户</el-button>
            </div>
        </div>
        <el-table size="mini" border style="width:100%" height="550px" :data="data" @selection-change="handleSelectionChange" >
            <el-table-column type="selection" width="40"/>
            <el-table-column label="用户头像" width="110" align="center">
                <template slot-scope="scope">
                    <div class="user-avatar">
                        <img :src="getUrl(scope.row.pic)" style="width:100%"/>
                    </div>
                    <el-upload :action="uploadUrl(scope.row.id)" 
                        :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
                        <el-button size="mini">更新头像</el-button>
                    </el-upload>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="用户id" width="120" align="center"/>
            <el-table-column prop="name" label="昵称" width="120" align="center"/>
            <el-table-column prop="sex" label="性别" width="120" align="center">
                <template slot-scope="scope">{{getSex(scope.row.sex)}}</template>
            </el-table-column>
            <el-table-column prop='birth' label='生日' width="120" align="center">
                <template slot-scope="scope">{{getBirth(scope.row.birth)}}</template>
            </el-table-column>
            <el-table-column prop="location" label="地区" width="120" align="center"/>
            <el-table-column prop="introduction" label="简介" align="center">
                <template slot-scope="scope">
                    <p class="introduction-p">{{scope.row.introduction}}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120" align="center">
                <template slot-scope="scope">
                    <el-button style="margin-bottom:10px" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <br>
                    <el-button size="mini" @click="deleteConfirm(scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <div class="pagination">
            <el-pagination
                background
                layout = "total,prev,pager,next"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="tableData.length"
                @current-change="handleCurrentChange"/>
        </div>

        <el-dialog title="确认删除" :visible.sync="deleteConfirmVisable" width="400px" center>
            <p style="text-align:center">注意：删除后数据不可恢复！</p>
            <span slot="footer">
                <el-button size="mini" @click="deleteConfirmVisable=false">取消</el-button>
                <el-button size="mini" @click="handleDelete">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="确认删除" :visible.sync="multiDeleteConfirmVisable" width="400px" center>
            <p style="text-align:center">注意：删除后数据不可恢复！</p>
            <span slot="footer">
                <el-button size="mini" @click="multiDeleteConfirmVisable=false">取消</el-button>
                <el-button size="mini" @click="delAll">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="添加用户" :visible.sync="centerDialogVisable" width="400px" center>
            <el-form :model="registerForm" ref="registerForm" label-width="80px">
            <el-form-item prop="id" label="账号" size="mini">
                <el-input v-model="registerForm.id" placeholder="账号"/>
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
                <el-button size="mini" @click="centerDialogVisable=false">取消</el-button>
                <el-button size="mini" @click="addUser">确定</el-button>
            </span>
        </el-dialog>

         <el-dialog title="编辑信息" :visible.sync="editVisable" width="400px" center>
            <el-form :model="editForm" ref="editForm" label-width="80px">
            <el-form-item prop="name" label="昵称" size="mini">
                <el-input v-model="editForm.name" placeholder="昵称"/>
            </el-form-item>
            <el-form-item prop="birth" label="生日" size="mini">
                <el-date-picker type='date' placeholder="选择日期" v-model="editForm.birth" style="width:100%"/>
            </el-form-item>
            <el-form-item label="性别" size="mini">
                <el-radio-group v-model="editForm.sex">
                    <el-radio :label='0'>女</el-radio>
                    <el-radio :label='1'>男</el-radio>
                    <el-radio :label='2'>其他</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="location" label="地区" size="mini">
                <el-input v-model="editForm.location" placeholder="地区"/>
            </el-form-item>
            <el-form-item prop="introduction" label="简介" size="mini">
                <el-input v-model="editForm.introduction" placeholder="简介" type="textarea"/>
            </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button size="mini" @click="editVisable=false">取消</el-button>
                <el-button size="mini" @click="editSave">确定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import {getAllUser, setUser,modifyUser,handleDelete} from "../api/index";
import {utils} from "../utils/index";
export default {
    mixins:[utils],
    data(){
        return{
            centerDialogVisable:false,
            editVisable:false,
            deleteConfirmVisable: false,
            multiDeleteConfirmVisable: false,
            registerForm:{  //添加框
                id:'',
                name:'',
                sex:'',
                birth:'',
                location:'',
                introduction:''
            },
            editForm:{  //不许改用户id了！
                id:'',
                name:'',
                sex:'',
                birth:'',
                location:'',
                introduction:''
            },
            tableData:[],
            tempData:[],
            select_word:'',
            pageSize:5, //分页每页大小
            currentPage:1, //当前页
            idx: null,  //当前选择项
            multiSelections: []  //当前多选项
        }
    },
    computed:{
        //计算当前搜索结果表里的数据
        data(){
            return this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage * this.pageSize);
        }
    },
    watch:{ //监控变化

        //搜索框里的内容发生变化的时候，搜索结果table列表的内容跟着它的内容发生变化
        select_word:function(){
            if(this.select_word == ''){
                this.tableData=this.tempData;
            }else{
                this.tableData=[];
                for(let item of this.tempData){
                    if(item.name.includes(this.select_word)||
                    item.id.includes(this.select_word)){
                        this.tableData.push(item);
                    }
                }
            }
        }
    },
    created(){
        this.getData();
    },
    methods:{
        //获取当前页
        handleCurrentChange(val){
            this.currentPage=val;
        },
        //查询所有用户
        getData(){
            this.tableData =[];
            this.tempData = []
            getAllUser().then(res=>{
                this.tableData=res;
                this.tempData=res;
            })
        },
        //删除用户
        handleDelete(){
            handleDelete(this.idx.id).then((res)=>{
                if(res){
                    this.notify("删除成功","success");
                    this.getData();
                }else{
                    this.notify("删除失败","error");
                }
            })
            this.deleteConfirmVisable = false;
        },
        deleteConfirm(row){
            this.deleteConfirmVisable = true;
            this.idx = row;
        },
        //添加用户
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
                password:'000000'
            }
            setUser(params)
            .then((res)=>{
                if(res.code == 1){
                    this.notify("添加成功","success");
                }else{
                    this.notify("添加失败","error");
                }
            })
            this.centerDialogVisable = false;
            this.getData();
        },
        //提交编辑信息
        editSave(){
            let d = new Date(this.editForm.birth);
            let datetime = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
            let params = {
                id:this.editForm.id,
                name:this.editForm.name,
                sex:this.editForm.sex,
                birth:datetime,
                location:this.editForm.location,
                introduction:this.editForm.introduction,
            }
            modifyUser(params)
            .then((res)=>{
                if(res.code == 1){
                    this.notify("修改成功","success");
                    this.getData();
                }else{
                    this.notify("修改失败","error");
                }
            })
            this.editVisable = false;
            this.getData();
        },
        //弹出编辑框
        handleEdit(row){
            this.editVisable=true;
            this.editForm={
                id:row.id, name: row.name, birth:row.birth, sex:row.sex,
                location:row.location, introduction:row.introduction
            }
        },
        //更新图片
        uploadUrl(id){
            return `${this.$store.state.HOST}/user/updateUserPic?id=${id}`
        }
    }
}
</script>

<style scoped>
.handle-box{
    margin-bottom:20px;
}
.user-avatar{
    width: 100%;
    height: 80px;
    border-radius: 5px;
    margin-bottom: 5px;
    overflow: hidden;
}
.handle-input{
    width:300px;
    display: inline-block;
}
.pagination{
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
.introduction-p{
    overflow-y:scroll;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
}
</style>