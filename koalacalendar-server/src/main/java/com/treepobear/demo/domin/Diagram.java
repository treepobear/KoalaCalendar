package com.treepobear.demo.domin;

import java.util.Date;

/**
 * 图表
 */
public class Diagram {
    /*主键*/
    private Integer id;
    /*类型*/
    private String type;
    /*图表名*/
    private String filename;
    /*作者id*/
    private String author_id;
    /*封面*/
    private String cover;
    /*创建时间*/
    private Date create_time;
    /*内容*/
    private String json_string;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getAuthor_id() {
        return author_id;
    }

    public void setAuthor_id(String author_id) {
        this.author_id = author_id;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }

    public String getJson_string() {
        return json_string;
    }

    public void setJson_string(String json_string) {
        this.json_string = json_string;
    }
}
