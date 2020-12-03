<!--后台首页，数据可视化展示-->

<template>
    <div>
        <el-row :gutter="20" style="margin-bottom:20px;margin:10px;"> <!--gutter:间距20-->
            <el-col :span="6">
                <el-card>
                    <div class="grid-content">
                    <div>10</div>
                    <div>用户总数</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="grid-content">
                    <div>10</div>
                    <div>??总数</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="grid-content">
                    <div>10</div>
                    <div>??总数</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="grid-content">
                    <div>10</div>
                    <div>??总数</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name:'BackInfo'
}
</script>

<style scoped>
.grid-content{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
}
</style>
