import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        HOST:'http://127.0.0.1:8888',
        loginIn: false,   //用户是否已经登录
        userId:'',
        userName:'未登录',
        userAvator:'img/avatar/default_avatar.jpg',

    },
    getters:{
        loginIn:state =>{
            let loginIn = state.loginIn
            if(!loginIn){
                loginIn = JSON.parse(window.sessionStorage.getItem('loginIn'))
            }
            return loginIn
        },
        userId:state =>{
            let userId = state.userId
            if(!userId){
                userId = JSON.parse(window.sessionStorage.getItem('userId'))
            }
            return loginIn
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
    }
})

export default store