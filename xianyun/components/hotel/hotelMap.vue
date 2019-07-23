<template>
  <div id="hotelMap" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=d67b45d503ac4dac45d41b907bc974db"
    ></script>
  </div>
</template>

<script>
export default {
  props: {
    MapData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      //地图加载时间
      loading:true,
      //地图窗体信息
      content: "高级酒店",
      map: null,
      markers: null,
      infoWindow: null,
      center: [118.796623, 32.059352]
    };
  },
  methods: {
    //添加点标记
    setMarker(markers, position, data) {
      // console.log(data);
      this.markers = new AMap.Marker({
        content: `<div style="width:20px;height:28px;text-align:center;" class="el-icon-location"></div>`,
        position: position,
        offset: new AMap.Pixel(-17, -42), // 相对于基点的偏移位置
        map: this.map //把点标记绑在前面初始化的 map_ 上，否则不显示
      });
      this.markers.on("mousemove", () => {
        this.content =  
    `<div><img src="${data.photos}" style="width:100px; height:50px;margin:0 auto"> 
    <div><b style="color:#666">${data.name}</b>`
;
        this.infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(-5, -50),
          content: this.content //传入 dom 对象，或者 html 字符串
        });
        this.infoWindow.open(this.map, position);
      });
    },
    setMapInfo() {
      
      const {location} = this.MapData[3]
      //重新设置地图中心点
       setTimeout(()=>{
      this.loading = false;
      },1000)
      this.center = [location.longitude,location.latitude]
      this.map = new AMap.Map("hotelMap", {
        zoom: 10, //级别
        center: this.center, //中心点坐标
        viewMode: "3D" //使用3D视图
      });
      this.MapData.forEach(v => {
        //生成多个坐标点
        this.setMarker(v.area, [v.location.longitude, v.location.latitude], v);
        
      });
    }
  },
  watch: {
    $route() {
      setTimeout(() => {
        this.setMapInfo();
        this.loading =true;
      }, 3000);
    }
  },
  mounted() { 
    setTimeout(() => {
      this.setMapInfo();
    }, 3000);
  }
};
</script>
<style lang="less" scoped>
#hotelMap {
  width: 420px;
  height: 260px;
  /deep/.el-icon-location {
    color: #00a4ff;
    &::before {
      display: block;
      color: #ff3366;
      transform: scale(3);
    }
  }
}
</style>