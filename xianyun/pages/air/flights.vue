<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="FiltersData" @changFilters="changFilters"/>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in NewData" :key="index" :data="item" />
         <!-- 分页组件 -->
      <!-- 分页 -->
      <el-row type="flex" justify="center" style="margin-top:10px;">
        <!-- size-change：切换条数时候触发 -->
        <!-- current-change：选择页数时候触发 -->
        <!-- current-page: 当前页数 -->
        <!-- page-size：当前条数 -->
        <!-- total：总条数 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="flightsData.pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="flightsData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="flightsData.total"
        ></el-pagination>
      </el-row>
      </div>
     
      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside/>
      </div>
      
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";
export default {
  data() {
    return {
      //机票的数据
      ListData: [],
      // 帅选的数据
      FiltersData:{
        info:{},
        options:{}
      },
      // 缓存的数据
      cacheFlightsData:{
        flights: [],
        info:{},
        options:{}
      },
      flightsData:{
          pageIndex:1,
          pageSize:5,
          total:10
      },
    };
  },
  // 监听路由的变化
  watch: {
    $route(){
      this.getListData()
    }
  },
  //组件注册
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  mounted() {
    this.getListData();
  },
  //监听式写法
  computed: {
      NewData(){
             const {pageIndex,pageSize} = this.flightsData
            return this.ListData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)
      }
  },
  methods: {
    // 子组件的传值监听
    changFilters(arr){
     this.ListData = arr;
     this.flightsData.total = arr.length;
    },
      //请求列表数据
    getListData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        this.flightsData.total = res.data.total;
        this.ListData = res.data.flights;
        this.FiltersData = res.data;
        this.cacheFlightsData = {...res.data}
         // this.getNewListData()
      });
    },
    // 传递给子组件的的数据 需要不被改变
    //页面数量
    handleSizeChange(value){
        this.flightsData.pageSize = value;
        //  this.getNewListData()
    },
    //当前页
    handleCurrentChange(value){
         this.flightsData.pageIndex = value;
        // this.getNewListData()
    },
    //获取切割后的数据
    // getNewListData(){
    //     const {pageIndex,pageSize} = this.flightsData
    //      this.NewData = this.ListData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)
    //      console.log(this.newData);
    // }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>