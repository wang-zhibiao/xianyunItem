<template>
  <div class="detail">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">南京酒店</el-breadcrumb-item>
      <el-breadcrumb-item>好来阁商务宾馆</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="hotelTitle">
      <span>好来阁商务宾馆</span>
      <i class="iconfont iconhuangguan"></i>
      <i class="iconfont iconhuangguan"></i>
      <i class="iconfont iconhuangguan"></i>
      <i class="iconfont iconhuangguan"></i>
      <i class="iconfont iconhuangguan"></i>
      <p>hao lai ge shang wu hotel</p>
    </div>
    <div class="site">
      <i class="iconfont iconlocation"></i>
      <span>高淳县淳溪镇镇兴路118号(高淳县委党校对面)</span>
    </div>
    <!-- 酒店详情轮播图 -->
    <Detailsliper />
    <!-- 酒店地图 -->
    <DetailMap />
    <!-- 酒店详细信息 -->
    <DetailNews />
    <!-- 酒店评论 -->
    <DetailComment />
  </div>
</template>
<script>
import Detailsliper from "@/components/hotel/detailsliper";
import DetailMap from "@/components/hotel/detailMap";
import DetailNews from "@/components/hotel/detailNews";
import DetailComment from "@/components/hotel/detailComment";

export default {
  components: {
    Detailsliper,
    DetailMap,
    DetailNews,
    DetailComment
  }
};
</script>
<style lang="less" scoped>
.detail {
  width: 1000px;
  margin: 0 auto;
  margin-top: 20px;

  .hotelTitle {
    margin-top: 25px;
    span:first-child {
      font-size: 30px;
    }
    i {
      color: #f90;
    }
    p {
      color: #666;
      font-size: 14px;
    }
  }
  .site {
    color: #666;
    font-size: 14px;
  }
}
</style>