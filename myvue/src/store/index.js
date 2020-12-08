import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        HOST:'http://localhost:8888',
        loginIn: false,   //用户是否已经登录
        userId:'',
        userName:'',
        userAvator:'',
        editJson:'',
        isnew:true,
        editFileName:'',
        editId:''
    },
    getters:{
        loginIn:state =>{
            let loginIn = state.loginIn
            if(!loginIn){
                loginIn = JSON.parse(window.sessionStorage.getItem('loginIn'))
            }
            return loginIn
        },
        editId:state =>{
            let editId = state.editId
            if(!editId){
                editId = JSON.parse(window.sessionStorage.getItem('editId'))
            }
            return editId
        },
        editFileName:state =>{
            let editFileName = state.editFileName
            if(!editFileName){
                editFileName = JSON.parse(window.sessionStorage.getItem('editFileName'))
            }
            return editFileName
        },
        isnew:state =>{
            let isnew = state.isnew
            if(!isnew){
                isnew = JSON.parse(window.sessionStorage.getItem('isnew'))
            }
            return isnew
        },
        editJson:state =>{
            let editJson = state.editJson
            if(!editJson){
                editJson = JSON.parse(window.sessionStorage.getItem('editJson'))
            }
            return editJson
        },
        userId:state =>{
            let userId = state.userId
            if(!userId){
                userId = JSON.parse(window.sessionStorage.getItem('userId'))
            }
            return userId
        },
        userName:state =>{
            let userName = state.userName
            if(!userName){
                userName = JSON.parse(window.sessionStorage.getItem('userName'))
            }
            return userName
        },
        userAvator:state =>{
            let userAvator = state.userAvator
            if(!userAvator){
                userAvator = JSON.parse(window.sessionStorage.getItem('userAvator'))
            }
            return userAvator
        },
        

    },
    mutations:{
        setEditJson: (state,editJson) =>{
            state.editJson = editJson
            window.sessionStorage.setItem('editJson',JSON.stringify(editJson))
        },
        setIsNew: (state,isnew) =>{
            state.isnew = isnew
            window.sessionStorage.setItem('isnew',JSON.stringify(isnew))
        },
        setLoginIn: (state,loginIn) =>{
            state.loginIn = loginIn
            window.sessionStorage.setItem('loginIn',JSON.stringify(loginIn))
        },
        setUserId: (state,userId) =>{
            state.userId = userId
            window.sessionStorage.setItem('userId',JSON.stringify(userId))
        },
        setUserName: (state,userName) =>{
            state.userName = userName
            window.sessionStorage.setItem('userName',JSON.stringify(userName))
        },
        setUserAvator: (state,userAvator) =>{
            state.userAvator = userAvator
            window.sessionStorage.setItem('userAvator',JSON.stringify(userAvator))
        },
        setEditFileName: (state,editFileName) =>{
            state.editFileName = editFileName
            window.sessionStorage.setItem('editFileName',JSON.stringify(editFileName))
        },
        setEditId: (state,editId) =>{
            state.editId = editId
            window.sessionStorage.setItem('editId',JSON.stringify(editId))
        },
    }
})

export default store