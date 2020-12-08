<template>
    <div style="margin:25px">
    
<div >
  <el-row :gutter="20">
    <el-col v-for="item in myfiles" :key ="item" :span="6">
      <file-card :filename="item.filename" :creatime="item.create_time" 
                  :type="item.type" :content="item.json_string" :id="item.id"
                  style="margin-bottom:20px"/>
    </el-col>
  </el-row>
</div>

    </div>
</template>

<script>
import {utils} from "../utils/index"
import {mapGetters} from 'vuex'
import {getPersonalFile} from "../api/index"
import FileCard from "../components/FileCard"
export default {
  components:{
    FileCard
  },
  data(){
    return{
      myfiles:[]
    }
  },
    computed:{
        ...mapGetters([
            'loginIn',
            'userId',
            'userName'
        ]),

    },
    created(){
      this.$emit('getTitle', this.userName+"的文件");
      this.getMyFiles();
    },
    methods:{
      jumpHelloWorld(){
        this.$router.push('/');
      },
      getMyFiles(){
        getPersonalFile(this.userId)
          .then(res=>{
            this.myfiles = res;
          });
        console.log(this.myfiles);
      }
    },
    
}
</script>

<style scoped>


</style>