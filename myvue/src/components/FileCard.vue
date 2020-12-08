<template>
    <el-card :body-style="{ padding: '10px' }" style="width:280px;height:350px">
       
      <img src="../assets/img/bugbugbug.jpg" class="image">

        <div style="padding: 1px;">
        
        <span>{{filename}}</span> <span class="typediv">{{type}}</span>
        
        <div class="bottom clearfix">
          <time class="time">{{creatime}}</time>
          <el-button type="text" class="button" @click="editDiagram">编辑</el-button>
        </div>
        </div>
        <div id="rua"></div>
    </el-card>
</template>

<script>
import bus from "../assets/js/bus"
import makeMyDiagram from "../assets/js/fcdiagram"
export default {
    props: ['filename','creatime','type','content','id'],
    created(){
      this.showImage();
    },
    methods:{
      showImage(){},
      editDiagram(){
        this.$store.commit('setEditJson',this.content);
        this.$store.commit('setIsNew',false);
        this.$store.commit('setEditFileName', this.filename);
        this.$store.commit('setEditId', this.id);
        this.$router.push('/flowchart');
      }

    },


}
</script>


<style scoped>
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height:260px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .typediv{
    color:cadetblue;
    font-size: 15px;
  }
</style>