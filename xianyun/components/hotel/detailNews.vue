<template>
  <div class="detailNews">
    <el-row>
      <el-col :span="24" class="firstSpan">
          <span>基本信息</span>
          <span>入住时间: 14:00之后</span>
          <span>离店时间: 12:00之前</span>
          <span>{{data.creation_time}} / {{data.renovat_time}}</span>
          <span>酒店规模: {{data.roomCount}}间客房</span>
      </el-col>
    </el-row>
       
    <el-row>
      <el-col :span="24" class="firstSpan">
          <span>主要设施</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" class="firstSpan">
          <span>停车服务</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" class="firstSpan">
          <span>品牌信息</span>
          <span>{{data.hotelbrand ? data.hotelbrand.name : ''}}</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
    props:{
        data:{
            type:Object,
            default:{}
        }
    }
};
</script>
<style lang="less" scoped>
 .detailNews{
     margin-top: 30px;
     widows: 1000px;
    .firstSpan{
        padding: 20px 10px;
        border-bottom: 1px solid #ccc;
        span{
           display: inline-block;
           width: 20%;
           color: #666;
           font-size: 14px;
        }
        span:first-child{
            width:16%;
            color: #000;
        }
    }
 }
</style>