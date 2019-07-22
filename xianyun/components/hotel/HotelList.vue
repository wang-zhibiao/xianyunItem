<template>
  <div class="HotelList">
    <el-row type="flex" justify="space-between" class="List_content" v-for="(item,index) in data" :key="index">
      <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
        <nuxt-link :to="`/hotel/detail?id=${item.id}`">
          <img
            data-v-0a769ebc
            :src="item.photos"
            :alt="item.name"
            width="320"
            height="210"
          />
        </nuxt-link>
      </el-col>
      <el-col :span="10" style="padding:0 15px;">
        <h4>
          <nuxt-link :to="`/hotel/detail?id=${item.id}`">{{item.name}}</nuxt-link>
        </h4>
        <el-col style="padding:5px 0;">
          <span>{{item.alias}}</span>
          <i class="iconfont iconhuangguan" style="color:#f90"></i>
          <i class="iconfont iconhuangguan" style="color:#f90"></i>
          <i class="iconfont iconhuangguan" style="color:#f90"></i>
          <span>经济型</span>
          <el-row type="flex" justify="space-between" style="padding:5px 0;">
            <el-col :span="10">
              <div class="levels">
                <el-rate
              v-model="item.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
              </div>
            </el-col>
            <el-col :span="7">
              <span style="color:#f90">{{item.common_remarks}}</span>
              条评价
            </el-col>
            <el-col :span="7">
              <span style="color:#f90">{{item.good_remarks}}</span>
              篇游记
            </el-col>
          </el-row>
          <el-row>
            <i class="iconfont iconlocation"></i>
            <span>位于: {{item.address}}</span>
          </el-row>
        </el-col>
      </el-col>
      <el-col :span="6" class="hotel_reservation">
        <el-row type="flex" justify="space-between" class="hotel_navigation" v-for="(value,index) in item.products" :key="index">
          <el-col :span="12">{{value.name}}</el-col>
          <el-col :span="12">
            <span>￥{{value.price}}</span>起
            <i class="el-icon-arrow-right"></i>
          </el-col>
        </el-row>
        
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
    props:{
        data:{
            type:Array,
            default:[]
        }
    }
};
</script>
<style lang="less" scoped>
.HotelList {
  width: 1000px;
  margin: 0 auto;
  .List_content {
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    margin-bottom: 15px;
    h4 {
      font-size: 20px;
    }
    .hotel_reservation {
      .hotel_navigation {
          font-size: 14px;
          color: #666;
        padding: 20px 10px;
        margin: 0 20px;
        border-bottom: 1px solid #ddd;
        &:hover{
            background: #eee;
        }
      }
      span {
        color: #f90;
        padding-right: 5px;
      }
    }
  }
}
</style>