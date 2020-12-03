package com.treepobear.demo.service;


import com.treepobear.demo.domin.User;

import java.util.List;

public interface UserService {
    //增
    public boolean insert(User user);
    //改
    public boolean update(User user);
    //删
    public boolean delete(String id);
    //查
    ///根据主键查整个对象
    public User selectByPrimaryKey(String id);
    ///查询所有用户
    public List<User> allUser();
    ///根据名字模糊查询
    public List<User> userOfName(String name);
}
