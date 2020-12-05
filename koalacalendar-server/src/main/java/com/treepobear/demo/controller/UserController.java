package com.treepobear.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.treepobear.demo.domin.User;
import com.treepobear.demo.service.UserService;
import com.treepobear.demo.utils.Consts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 用户控制类
 */
@RestController
@RequestMapping(value = "/user",method = RequestMethod.POST)
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 判断用户是否登录成功
     */
    @RequestMapping(value = "/userLogin/status",method = RequestMethod.POST)
    public Object userLoginStatus(@RequestBody JSONObject request, HttpSession session) {
        JSONObject jsonObject = new JSONObject();
        String name = request.getString("name");
        String password = request.getString("password");
        if(userService.verifyLogin(name,password)){
            jsonObject.put(Consts.CODE,1);
            jsonObject.put(Consts.MSG,"登录成功");
            session.setAttribute(Consts.NAME,name);
            jsonObject.put("userMsg",userService.selectByPrimaryKey(name));
        }else{
            jsonObject.put(Consts.CODE,0);
            jsonObject.put(Consts.MSG,"用户名或密码错误");
        }
        return jsonObject;
    }

    /**
     * 添加用户
     */
    @RequestMapping("/add")
    public Object addUser(@RequestBody JSONObject request){
        JSONObject jsonObject = new JSONObject();
        String id = request.getString("id").trim();
        String name = request.getString("name").trim();
        String password = "000000".trim(); //默认密码
        String sex = request.getString("sex").trim();
        String pic = request.getString("pic").trim();
        String location = request.getString("location").trim();
        String introduction = request.getString("introduction").trim();
        String birth = request.getString("birth").trim();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date birthDate = new Date();
        try {
            birthDate = dateFormat.parse(birth);
        }catch (ParseException e){
            e.printStackTrace();
        }
        User user = new User();
        user.setId(id);
        user.setName(name);
        user.setPassword(password);
        user.setSex(new Byte(sex));
        user.setBirth(birthDate);
        user.setLocation(location);
        user.setIntroduction(introduction);
        user.setPic(pic);
        boolean flag = userService.insert(user);
        if(flag){
            jsonObject.put(Consts.CODE,1);
            jsonObject.put(Consts.MSG,"添加成功");
            return jsonObject;
        }else {
            jsonObject.put(Consts.CODE, 0);
            jsonObject.put(Consts.MSG, "添加失败");
            return jsonObject;
        }
    }

    /**
     * 修改用户信息，不包括改密码
     */
    @RequestMapping("/update")
    public Object updateUser(@RequestBody JSONObject request){
        JSONObject jsonObject = new JSONObject();
        String id = request.getString("id").trim();
        String name = request.getString("name").trim();
        String sex = request.getString("sex").trim();
        String location = request.getString("location").trim();
        String introduction = request.getString("introduction").trim();
        String birth = request.getString("birth").trim();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date birthDate = new Date();
        try {
            birthDate = dateFormat.parse(birth);
        }catch (ParseException e) {
            e.printStackTrace();
        }
        User user = new User();
        user.setId(id);
        user.setName(name);
        user.setSex(new Byte(sex));
        user.setBirth(birthDate);
        user.setLocation(location);
        user.setIntroduction(introduction);
        boolean flag = userService.update(user);
        if(flag){
            jsonObject.put(Consts.CODE,1);
            jsonObject.put(Consts.MSG,"修改成功");
        }else {
            jsonObject.put(Consts.CODE, 0);
            jsonObject.put(Consts.MSG, "修改失败");
        }
        return jsonObject;
    }

    /**
     * 删除用户
     */
    @RequestMapping(value="/delete",method = RequestMethod.GET)
    public Object deleteUser(HttpServletRequest request){
        String id = request.getParameter("param").trim();
        return userService.delete(id);

    }

    /**
     * 根据主键查询对象
     */
    @RequestMapping(value="/selectByPrimaryKey",method = RequestMethod.GET)
    public Object selectByPrimaryKey(HttpServletRequest request){
        String id = request.getParameter("param").trim();
        return userService.selectByPrimaryKey(id);
    }

    /**
     * 查询所有用户
     */
    @RequestMapping(value="/allUser",method=RequestMethod.GET)
    public Object allUser(HttpServletRequest request){
        return userService.allUser();
    }

    /**
     * 根据名字模糊查询
     */
    @RequestMapping(value="/userOfName",method = RequestMethod.GET)
    public Object userOfName(HttpServletRequest request){
        String name = request.getParameter("param").trim();
        return userService.userOfName("%"+name+"%");
    }

    /**
     * 更新用户头像
     */
    @RequestMapping(value="/updateUserPic",method=RequestMethod.POST)
    public Object updateUserPic(@RequestParam("file")MultipartFile avatarFile, @RequestParam("id")String id){
        JSONObject jsonObject = new JSONObject();
        if(avatarFile.isEmpty()){
            jsonObject.put(Consts.CODE,0);
            jsonObject.put(Consts.MSG,"上传失败");
            return jsonObject;
        }
        //文件名=当前时间到毫秒+原来的文件名
        String fileName = System.currentTimeMillis()+avatarFile.getOriginalFilename();
        //文件路径
        String filePath = System.getProperty("user.dir")
                +System.getProperty("file.separator")+"img"+
                System.getProperty("file.separator")+"avatar";
        //如果文件路径不存在，新增该路径
        File file1 = new File(filePath);
        if(!file1.exists()){
            file1.mkdir();
        }
        //实际文件地址
        File dest = new File(filePath+System.getProperty("file.separator")+fileName);
        //存储到数据库里的相对文件地址
        String storeAvatarPath="/img/avatar/"+fileName;
        try {
            avatarFile.transferTo(dest);
            User user = new User();
            user.setId(id);
            user.setPic(storeAvatarPath);
            if(userService.update(user)){
                jsonObject.put(Consts.CODE,1);
                jsonObject.put(Consts.MSG,"上传成功");
                jsonObject.put("pic",storeAvatarPath);
            }else{
                jsonObject.put(Consts.CODE,0);
                jsonObject.put(Consts.MSG,"上传失败");
            }
        } catch (IOException e) {
            e.printStackTrace();
            jsonObject.put(Consts.CODE,0);
            jsonObject.put(Consts.MSG,"上传失败"+e.getMessage());
        }finally {
            return jsonObject;
        }
    }
}
