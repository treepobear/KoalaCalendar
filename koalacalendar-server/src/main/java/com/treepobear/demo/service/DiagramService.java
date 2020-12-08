package com.treepobear.demo.service;

import com.treepobear.demo.domin.Diagram;

import java.util.List;

public interface DiagramService {
    //增
    public boolean insert(Diagram diagram);
    ///根据主键查整个对象
    public List<Diagram> selectByUserId(String id);
    ///修改
    public boolean update(Diagram diagram);
}
