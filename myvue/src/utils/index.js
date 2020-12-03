export const utils = {
    methods:{
        //提示信息
        notify(title,type){
            this.$notify({
                title:title,
                type:type
            })
        },
        //根据相对地址获取绝对地址
        getUrl(url){
            return `${this.$store.state.HOST}/${url}`
        },
        //获取性别中文
        getSex(value){
            if(value==0){
                return '女';
            }else if(value==1){
                return '男';
            }else return '其他';
        },
        //获取生日
        getBirth(val){
            return String(val).substr(1,10);
        },
        //上传图片之前的校验
        beforeAvatarUpload(file){
            const isJPG = (file.type === 'image/jpeg')||(file.type==='image/png');
            if(!isJPG){
                this.$message.error("上传图片只能是jpg或png格式");
                return false;
            }
            //不能大于2兆
            const isLt2M = file.size / 1024 /1024 < 2;
            if(!isLt2M){
                this.$message.error("上传图片大小不能超过2M");
                return false;
            }
            return true;
        },
        //上传图片成功后
        handleAvatarSuccess(res){
            let _this=this; //Consumers.vue
            if(res.code == 1){
                _this.getData();
                _this.$notify({title:'上传成功',type:'success'});
            }else{
                _this.$notify({title:'上传失败',type:'error'});
            }
        },
        // //把已经选择的项复制给multiSelections
        handleSelectionChange(val){
            this.multiSelections = val;
        },
        //批量删除已选择的项
        delAll(){
            for(let item of this.multiSelections){
                this.idx = item;
                this.handleDelete();
            }
            this.multiSelections = [];
            this.mutiDeleteConfirmVisable = false;
        },
        //全屏事件
        handleFullScreen(){
            if(this.fullscreen){
                if(document.exitFullscreen){
                    document.exitFullscreen();
                }
                else if(document.webkitCancelFullScreen){ //safari Chrome
                    document.webkitCancelFullScreen();
                }else if(document.mozCancelFullScreen){ //firefox
                    document.mozCancelFullScreen();
                }else if(document.msExitFullScreen){    //ie
                    document.msExitFullScreen();
                }
            }else{
                let element = document.documentElement;
                if(element.requestFullscreen){
                    element.requestFullscreen();
                }else if(element.webkitRequestFullScreen){//safari Chrome
                    element.webkitRequestFullScreen();
                }else if(element.mozRequestFullScreen){//safari Chrome
                    element.mozRequestFullScreen();
                }else if(element.msRequestFullScreen){//ie
                    element.msRequestFullScreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
    }
}