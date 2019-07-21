<template>
  <div class="hotel">
    <el-row type="flex" class="hotel_content">
      <!-- 面包屑 -->
      <el-row class="Hotel_crumbs">
        <el-breadcrumb separator="">
          <el-breadcrumb-item style="width:54px">酒店<i class="el-icon-arrow-right" style="margin-left:5px"></i></el-breadcrumb-item>
          <el-breadcrumb-item>南京市酒店预定</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <!-- 筛选查询酒店 -->
      <HotelFiltrate/>
      <el-col :span="14" class="Hotel_strategy">
        <!-- 区域详情 -->
        <HotelStrategy/>
      </el-col>
      <!-- 地图 -->
      <el-col :span="10" class="Hotel_map">
        <hotelMap/>
      </el-col>
       <!-- 酒店分类筛选 -->
        <Hotelclassify/>
        <!-- 酒店列表页面 -->
        <HotelList :data="HotelList"/>
        <!-- 分页器 -->
        
    </el-row>
  </div>
</template>
<script>
//引入插件
import HotelFiltrate from '@/components/hotel/HotelFiltrate'
import HotelStrategy from '@/components/hotel/HotelStrategy'
import hotelMap from '@/components/hotel/hotelMap'
import Hotelclassify from '@/components/hotel/Hotelclassify'
import HotelList from '@/components/hotel/HotelList'

export default {
    data () {
        return {
          HotelList:[],
            hotel:{
              id:1,
              city:74,
              price_in:99,
              scenic:1,
              name_contains:"",
              hotellevel:1,
              hoteltype:1,
              hotelbrand:1,
              hotelasset:1,
              enterTime:"2019-7-29",
              leftTime:"2019-8-02",
              person:2,
              limit:3,
              start:1
            }
        }
    },
    components: {
        HotelFiltrate,HotelStrategy,hotelMap,Hotelclassify,HotelList
    },
    mounted () {
      this.getHotelList()
    },
    methods: {
      //获取酒店列表数据
      getHotelList(){
        const {id,city,enterTime,leftTime,limit,start} = this.hotel
        this.$axios({
          url:'/hotels',
          params:{
            city,enterTime,leftTime,
            _limit:limit,_start:start
          }
        }).then(res=>{
          // console.log(res);
          this.HotelList = res.data.data
        })
      }
    }
};
</script>
<style lang="less" scoped>
.hotel {
  width: 1000px;
  margin: 0 auto;
  .hotel_content {
    flex-wrap: wrap;
  }
  .Hotel_crumbs {
    padding: 20px 0;
  }
  
}
</style>