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
//用户登录
export const userLoginStatus = (params) => post('/user/userLogin/status',params);
//添加图表
export const addDiagram = (params) =>post('/diagram/addDiagram',params);
//根据用户获取图表
export const getPersonalFile = (id) => get(`/diagram/getDiagramById?param=${id}`);
//修改图表
export const modifyDiagramById = (params)=>post('/diagram/modifyDiagram',params);