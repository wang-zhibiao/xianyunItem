<template>
    <div class="post">
        <el-row type="flex" class="post_content" justify="space-between" align="middle">
        <el-col class="menus-wrapper" :span="7">
            
        </el-col>
        <el-col class="post-wrapper" :span="17"></el-col>
        </el-row>
    </div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
.post_content{
    width: 1000px;
    margin: 0 auto;
    height: 900px;
    background: #000;
    .menus-wrapper{
        width: 260px;
        height: 900px;
         background: green;
    }
    .post-wrapper{
        width: 700px;
        height: 900px;
        background: red;
    }
}
</style>