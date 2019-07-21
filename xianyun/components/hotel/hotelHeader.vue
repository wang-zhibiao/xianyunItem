<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/hotel?city=74' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/hotel?city=74' }">南京酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{data.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="hotelTitle">
      <span>{{data.name}}</span>
      <i class="iconfont iconhuangguan"></i>
      <i class="iconfont iconhuangguan"></i>
      <i class="iconfont iconhuangguan"></i>
      <i class="iconfont iconhuangguan"></i>
      <i class="iconfont iconhuangguan"></i>
      <p>{{data.alias}}</p>
    </div>
    <div class="site">
      <i class="iconfont iconlocation"></i>
      <span>{{data.address}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    },
  }
};
</script>
<style lang="less" scoped>
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
</style>
