package com.treepobear.demo.service.impl;

import com.treepobear.demo.dao.UserMapper;
import com.treepobear.demo.domin.User;
import com.treepobear.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 用户Service实现类
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public boolean insert(User user) {
        return userMapper.insert(user)>0;
    }

    @Override
    public boolean update(User user) {
        return userMapper.update(user)>0;
    }

    @Override
    public boolean delete(String id) {
        return userMapper.delete(id)>0;
    }

    @Override
    public User selectByPrimaryKey(String id) {
        return userMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<User> allUser() {
        return userMapper.allUser();
    }

    @Override
    public List<User> userOfName(String name) {
        return userMapper.userOfName(name);
    }
}
