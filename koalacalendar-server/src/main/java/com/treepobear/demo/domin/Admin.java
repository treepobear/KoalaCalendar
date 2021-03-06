package com.treepobear.demo.domin;

import java.io.Serializable;

/**
 * 管理员
 */
public class Admin implements Serializable {
    private Integer id; //主键
    private String name; //账号
    private String password; //密码

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
