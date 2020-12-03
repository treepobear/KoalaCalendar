//与业务相关的

import {get,post} from "./http"

//判断管理员是否登录成功
export const getLoginStatus = (params) => post(`/admin/login/status`,params);
//添加用户
export const setUser = (params) =>post('user/add',params);
//查询所有用户
export const getAllUser = () =>get('/user/allUser');
//修改用户信息
export const modifyUser = (params)=>post('user/update',params);
//删除用户
export const handleDelete = (param) => get(`/user/delete?param=${param}`);