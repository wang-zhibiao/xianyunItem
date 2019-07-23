<template>
  <div class="hotel">
    <el-row type="flex" class="hotel_content">
      <!-- 面包屑 -->
      <el-row class="Hotel_crumbs">
        <el-breadcrumb separator>
          <el-breadcrumb-item style="width:54px">
            酒店
            <i class="el-icon-arrow-right" style="margin-left:5px"></i>
          </el-breadcrumb-item>
          <el-breadcrumb-item>南京市酒店预定</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <!-- 筛选查询酒店 -->
      <HotelFiltrate />
      <el-col :span="14" class="Hotel_strategy">
        <!-- 区域详情 -->
        <HotelStrategy :name="backCity" />
      </el-col>
      <!-- 地图 -->
      <el-col :span="10" class="Hotel_map"   >
        <hotelMap :MapData="location" />
      </el-col>
      <!-- 酒店分类筛选 -->
      <Hotelclassify @changeDatalist="changeDatalist" />
      <!-- 酒店列表页面 -->
      <HotelList :data="HotelList" />
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="hotel.start"
        :page-size="hotel.limit"
        layout="total, prev, pager, next, jumper"
        :total="total"
        style="padding-left:400px"
      ></el-pagination>
    </el-row>
  </div>
</template>
<script>
//引入插件
import HotelFiltrate from "@/components/hotel/HotelFiltrate";
import HotelStrategy from "@/components/hotel/HotelStrategy";
import hotelMap from "@/components/hotel/hotelMap";
import Hotelclassify from "@/components/hotel/Hotelclassify";
import HotelList from "@/components/hotel/HotelList";

export default {
  data() {
    return {
      
      
      total:0,
      //地图的数据
      location:[],
      //存储列表数据
      HotelList: [],
      //缓存列表数据
      rantList:[],
      //返回的城市数据
      changeData:5,
      backCity:{},
      hotel: {
        id: 1,
        city: 74,
        price_in: 99,
        scenic: 3227,
        name_contains: "",
        hoteltype: 1,
        hotelbrand: 1,
        hotelasset: 1,
        enterTime: "2019-7-29",
        leftTime: "2019-8-02",
        person: 2,
        limit: 10,
        start: 1
      }
    };
  },
  components: {
    HotelFiltrate,
    HotelStrategy,
    hotelMap,
    Hotelclassify,
    HotelList
  },
  mounted() {
    this.getHotelList();
   
  },
  watch: {
    $route(){
      const {city,scenic} = this.$route.query
      this.hotel.city = city
      this.hotel.scenic = scenic
      this.getHotelList();
    }
  },
  methods: {
    //监听请求的分类数据
    changeDatalist(classify){
    //  const {changePrice,
    //     changeLevels,
    //     changeTypes,
    //     changeAssets,
    //     changeBrands} = classify
    if(classify<10){
      this.changeData= classify
      this.getHotelList()
    }else{
      const arr = this.rantList.filter(v=>{
         return v.price <= classify
      })
      this.HotelList = arr;
    }
    },
    //分页请求数据
    // 列表数据条数
    handleSizeChange(val){
      
    },
    //当前页
    handleCurrentChange(val){
      this.hotel.start = val
      this.getHotelList()
    },
    //获取酒店列表数据
    getHotelList() {
      const { id, city, enterTime, leftTime, limit, start,scenic,hotellevel } = this.hotel;
      this.$axios({
        baseURL: "http://157.122.54.189:9095",
        url: "/hotels",
        params: {
          city,
          enterTime,
          leftTime,
          scenic,
          hotellevel,
          _limit: limit,
          _start: start,
          hotellevel:this.changeData
        }
      }).then(res => {
        this.HotelList = res.data.data;
        this.rantList = [...res.data.data];
        this.location = res.data.data;
        this.total = res.data.total
        this.backCity = res.data.data[0].city.name
      });
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