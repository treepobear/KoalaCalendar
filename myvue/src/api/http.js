//http工具类 get和post

import axios from 'axios';
axios.defaults.timeout=5000; //超时时间设置
axios.defaults.withCredentials = true; //允许跨域
//Content-Type 响应头
// axios.defaults.headers.post['Content-Type']='Content-Type: application/json;charset=UTF-8';
//基础url
axios.defaults.baseURL = "http://localhost:8888";

//相应拦截器
axios.interceptors.response.use(
    response => {
        //如果response里面的status是200，说明访问到接口了，否则错误
        if(response.status==200){
            return Promise.resolve(response); //Promise是一个异步执行的框架
        }else{
            return Promise.reject(response);
        }
    },
    error =>{
        if(error.response.status){
            switch(error.response.status){
                case 401: //没登录
                    router.replace({
                        path:'/',
                        query:{
                            redirect:router.currentRoute.fullPath
                        }
                    });
                    break;
                case 404: //没找到
                    break;

            }
            return Promise.reject(error.response);
        }
    }
);

/**
 * 封装get方法
 * 有点问题 需要再看
 */
export function get(url,param){
    return new Promise((resolve,reject) => {
        axios.get(url,{param:param})
        .then(response=>{  //正常情况
            resolve(response.data)
        })
        .catch(err => {     //异常情况
            reject(err);
        })
    });
}

/**
 * 封装post方法
 */
export function post(url,data){
    return new Promise((resolve,reject)=>{
        axios.post(url,data)
        .then(response=>{
            resolve(response.data);
        })
        .catch(err => {
            reject(err);
        })
    });
}

