package com.treepobear.demo.dao;

import com.treepobear.demo.domin.Diagram;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 图表Dao
 */
@Repository
public interface DiagramMapper {
    //增
    public int insert(Diagram diagram);
    ///根据用户id查所有图表
    public List<Diagram> selectByUserId(String id);
    ///根据id修改
    public int modifyById(Diagram diagram);
}
