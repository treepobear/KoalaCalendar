package com.treepobear.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.treepobear.demo.domin.Diagram;
import com.treepobear.demo.service.DiagramService;
import com.treepobear.demo.utils.Consts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

/**
 * 图表控制类
 */
@RestController
@RequestMapping(value = "/diagram",method = RequestMethod.POST)
public class DiagramController {
    @Autowired
    private DiagramService diagramService;

    /**
     * 添加图
     */
    @RequestMapping("/addDiagram")
    public Object addFlowChart(@RequestBody JSONObject request){
        JSONObject jsonObject = new JSONObject();
        String filename = request.getString("filename").trim();
        String type = request.getString("type").trim();
        String json_string = request.getString("json_string").trim();
        String author_id = request.getString("author_id").trim();
        Diagram diagram = new Diagram();
        diagram.setAuthor_id(author_id);
        diagram.setJson_string(json_string);
        diagram.setType(type);
        diagram.setFilename(filename);
        diagram.setCreate_time(new Date());
        if(diagramService.insert(diagram)){
            jsonObject.put(Consts.CODE,1);
            jsonObject.put(Consts.MSG,"上传成功");
        }else {
            jsonObject.put(Consts.CODE, 0);
            jsonObject.put(Consts.MSG, "上传失败");
        }
        return jsonObject;
    }

    /**
     * 根据用户id找图
     */
    @RequestMapping(value="/getDiagramById",method = RequestMethod.GET)
    public Object getDiagramById(HttpServletRequest request){
        String id = request.getParameter("param").trim();
        return diagramService.selectByUserId(id);
    }

    /**
     * 修改
     */
    @RequestMapping(value = "/modifyDiagram")
    public Object modifyDiagram(@RequestBody JSONObject request){
        JSONObject jsonObject = new JSONObject();
        String id = request.getString("id").trim();
        Integer idd = new Integer(id);
        String json_string = request.getString("json_string").trim();
        String filename = request.getString("filename").trim();
        Diagram diagram = new Diagram();
        diagram.setId(idd);
        diagram.setFilename(filename);
        diagram.setCreate_time(new Date());
        diagram.setJson_string(json_string);
        if(diagramService.update(diagram)){
            jsonObject.put(Consts.CODE,1);
            jsonObject.put(Consts.MSG,"修改成功");
        }else {
            jsonObject.put(Consts.CODE, 0);
            jsonObject.put(Consts.MSG, "修改失败");
        }

        return jsonObject;
    }
}
