package com.treepobear.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.treepobear.demo.service.AdminService;
import com.treepobear.demo.utils.Consts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
public class AdminController {
    @Autowired
    private AdminService adminService;

    /**
     * 判断是否登录成功
     */
    @RequestMapping(value = "/admin/login/status",method = RequestMethod.POST)
    public Object loginStatus(@RequestBody JSONObject request, HttpSession session){
        JSONObject jsonObject = new JSONObject();
        String name = request.getString("name");
        String password = request.getString("password");
        boolean flag = adminService.verifyPassword(name,password);
        if(flag){
            jsonObject.put(Consts.CODE,1);
            jsonObject.put(Consts.MSG,"登录成功");
            session.setAttribute(Consts.NAME,name);
        }else{
            jsonObject.put(Consts.CODE,0);
            jsonObject.put(Consts.MSG,"用户名或密码错误");
        }
        return jsonObject;

    }
}
