package com.treepobear.demo.service.impl;

import com.treepobear.demo.dao.DiagramMapper;
import com.treepobear.demo.domin.Diagram;
import com.treepobear.demo.service.DiagramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiagramServiceImpl implements DiagramService {
    @Autowired
    DiagramMapper diagramMapper;


    @Override
    public boolean insert(Diagram diagram) {
        return diagramMapper.insert(diagram)>0;    }

    @Override
    public List<Diagram> selectByUserId(String id) {
        return diagramMapper.selectByUserId(id);
    }

    @Override
    public boolean update(Diagram diagram) {
        return diagramMapper.modifyById(diagram)>0;
    }
}
