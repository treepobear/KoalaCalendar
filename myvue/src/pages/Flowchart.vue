<template>
<div>
<div class="canvas-wrapper">
    <div id="palette"/>
    <div id="myDiagramDiv"/>
</div>

<el-row class="operate-buttons">

  <el-tooltip content="说明" placement="left">
  <el-button icon="el-icon-search" circle />
  </el-tooltip><br><br>

  <el-tooltip content="json格式编辑" placement="left">
  <el-button type="primary" icon="el-icon-edit" circle @click="showJsonEditDiag" />
  </el-tooltip><br><br>

  <el-tooltip content="保存到个人文件" placement="left">
  <el-button type="success" icon="el-icon-upload" @click="uploadCheck" circle/>  
  </el-tooltip><br><br>

  <el-tooltip content="保存pdf到本地" placement="left">
  <el-button type="info" icon="el-icon-download" @click="printDiagram" circle/>
  </el-tooltip><br><br>

  <el-tooltip content="设置用户群组" placement="left">
  <el-button type="warning" icon="el-icon-user" circle/>
  </el-tooltip><br><br>

  <el-tooltip content="清空画板" placement="left">
  <el-button type="danger" icon="el-icon-delete" @click="clearCanvas" circle/>
  </el-tooltip>
</el-row>

<el-dialog title="JSON格式编辑" :visible.sync="jsonEditVisable" width="800px" center>
  <el-input
    type="textarea"
    :rows="18"
    placeholder="请输json格式的图表信息"
    v-model="chartJSON">
</el-input>
  <br><br>
  <el-button style="width:100%;height:40px;" @click="modifyDiagram">确认</el-button>
</el-dialog>

<el-dialog title = "上传确认" :visible.sync="uploadCheckVisable" width="370px" center>
  <div style="display:flex;justify-content:space-around;">
<div>用户id: {{userId}}</div><div>文件类型: 流程图</div>
  </div>
 <el-form :model="uploadForm" :ref="uploadForm" label-width="80px" style="margin-top:6px">
    <el-form-item prop = "filename" label="文件名:">
        <el-input v-model="uploadForm.filename" size="mini"></el-input>
    </el-form-item>
  </el-form>

<div style="display:flex;justify-content:center" >
<svg id="svg_my" class="svg-wrap"
  style="border:1px solid #ededed;width:250px;height:200px;" />
</div>
<br>
<div style="display:flex;justify-content:center" >
  <el-button size="small" style="width:100px" type="success" @click="uploadFile">确定</el-button>
</div>
</el-dialog>
</div>
</template>

<script>
import {mapGetters} from 'vuex';
import { addDiagram,modifyDiagramById } from '../api';
import bus from "../assets/js/bus"
import {utils} from "../utils/index"
import makeMyDiagram from "../assets/js/fcdiagram"

var $ = go.GraphObject.make;
var myDiagram;
var myPalette;

function load() {
  myDiagram.model = go.Model.fromJson({ "class": "GraphLinksModel",
  "nodeDataArray": [],
  "linkDataArray": []})}

export default {
  mixins:[utils],

  data(){
    return{
      jsonEditVisable:false,
      uploadCheckVisable: false,
      chartJSON: "",
      uploadForm:{
        filename:'',
        type:'flowchart'
      }
    }
  },
  computed:{
    ...mapGetters([
      'loginIn',
      'userId',
      'editJson',
      'isnew',
      'editFileName',
      'editId'
    ])
  },
  created(){
    bus.$on('letmegoo',()=>{
        this.letmego();
    })
  },
  methods:{
    letmego(){
      if(this.isnew){
        this.$emit('getTitle', "新建流程图");
        load(); 
      }else{
        this.$emit('getTitle', this.editFileName);
        myDiagram.model=go.Model.fromJson(this.editJson);
      }
    },
    showJsonEditDiag(){
      this.jsonEditVisable = true;
      this.chartJSON = myDiagram.model.toJson();
    },
    modifyDiagram(){
      this.jsonEditVisable = false;
      myDiagram.model = go.Model.fromJson(this.chartJSON);
    },
    //bug在哪里！啊啊啊！
    uploadCheck(){
      if(this.loginIn){
        if(!this.isnew){
          this.uploadForm.filename=this.editFileName;
        }
        this.uploadCheckVisable = true;
        this.viewInCheck();
      }else{
        this.$message({
          message: '请先返回首页登录',
          type: 'warning'
        });
      }
    },
    uploadFile(){
      if(this.isnew){
        let params = {
        author_id:this.userId,
        type:"flowchart",
        filename:this.uploadForm.filename,
        json_string:myDiagram.model.toJson()
      }
      addDiagram(params).then((res)=>{
                if(res.code == 1){
                    this.notify("添加成功","success");
                }else{
                    this.notify("添加失败","error");
                }
            });
      }else{
        let params = {
          id:this.editId,
          json_string:myDiagram.model.toJson(),
          filename:this.uploadForm.filename,
        }
        modifyDiagramById(params).then((res)=>{
                if(res.code == 1){
                    this.notify("修改成功","success");
                }else{
                    this.notify("修改失败","error");
                }
            });
      }
      
      this.uploadCheckVisable = false;
    },
    viewInCheck(){
      var printSize = new go.Size(NaN, NaN);
      var bnds = myDiagram.documentBounds;
      var x = bnds.x;
      var y = bnds.y;
      while (y < bnds.bottom) {
        while (x < bnds.right) {
          var svg = myDiagram.makeSvg({ scale: 0.35, position: new go.Point(x, y), size: printSize });
          document.getElementById("svg_my").append(svg);
          x += printSize.width;
        }
        x = bnds.x;
        y += printSize.height;
      }
    },
    printDiagram() {
      var svgWindow = window.open();
      if (!svgWindow) return;  // failure to open a new Window
      var printSize = new go.Size(700, 960);
      var bnds = myDiagram.documentBounds;
      var x = bnds.x;
      var y = bnds.y;
      while (y < bnds.bottom) {
        while (x < bnds.right) {
          var svg = myDiagram.makeSvg({ scale: 1.0, position: new go.Point(x, y), size: printSize });
          svgWindow.document.body.appendChild(svg);
          x += printSize.width;
        }
        x = bnds.x;
        y += printSize.height;
      }
      setTimeout(function() { svgWindow.print(); }, 1);
    },
    clearCanvas(){
      this.$confirm('此操作将清空正在编辑的内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            load();
            document.querySelector('svg').innerHTML = '';
        }).catch(() => {
      
        });
    },
    
  },

  mounted(){

    myDiagram = $(go.Diagram, "myDiagramDiv",  // must name or refer to the DIV HTML element
  {
    "LinkDrawn": showLinkLabel,  // this DiagramEvent listener is defined below
    "LinkRelinked": showLinkLabel,
    "undoManager.isEnabled": true,  // enable undo & redo
    // "grid.visible":true
  });

  myDiagram = makeMyDiagram(myDiagram);

function showLinkLabel(e) {
var label = e.subject.findObject("LABEL");
if (label !== null) label.visible = (e.subject.fromNode.data.category === "Conditional");
}
    this.letmego();
    
    myPalette =
      $(go.Palette, "palette",  // must name or refer to the DIV HTML element
        {
          // Instead of the default animation, use a custom fade-down
          "animationManager.initialAnimationStyle": go.AnimationManager.None,
          "InitialAnimationStarting": animateFadeDown, // Instead, animate with this function

          nodeTemplateMap: myDiagram.nodeTemplateMap,  // share the templates used by myDiagram
          model: new go.GraphLinksModel([  // specify the contents of the Palette
            { category: "Start", text: "Start" },
            { text: "Step" },
            { category: "Conditional", text: "???" },
            { category: "End", text: "End" },
            { category: "Comment", text: "Comment" }
          ])
        });

    // This is a re-implementation of the default animation, except it fades in from downwards, instead of upwards.
    function animateFadeDown(e) {
      var diagram = e.diagram;
      var animation = new go.Animation();
      animation.isViewportUnconstrained = true; // So Diagram positioning rules let the animation start off-screen
      animation.easing = go.Animation.EaseOutExpo;
      animation.duration = 900;
      // Fade "down", in other words, fade in from above
      animation.add(diagram, 'position', diagram.position.copy().offset(0, 200), diagram.position);
      animation.add(diagram, 'opacity', 0, 1);
      animation.start();
    }

  },

}
</script>

<style scoped>
#myDiagramDiv{
width:100%;
height: 100%;
z-index: 4;
background-color: white;
}
#palette{
width: 100px; 
height: 500px; 
margin-right: 2px; 
background-color: #edededed; 
border: solid 1px black;
position: absolute;
margin-left: 10px;
margin-top: 10px;
z-index: 5;
}
.operate-buttons{
  position: absolute;
  right:0;
  height: 0;
  margin-right: 15px;
}

</style>