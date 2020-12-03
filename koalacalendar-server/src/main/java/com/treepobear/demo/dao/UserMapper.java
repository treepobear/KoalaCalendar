package com.treepobear.demo.dao;
import com.treepobear.demo.domin.User;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 用户Dao
 */
@Repository
public interface UserMapper {
    //增
    public int insert(User user);
    //改
    public int update(User user);
    //删
    public int delete(String id);
    //查
    ///根据主键查整个对象
    public User selectByPrimaryKey(String id);
    ///查询所有用户
    public List<User> allUser();
    ///根据名字模糊查询
    public List<User> userOfName(String name);

}
