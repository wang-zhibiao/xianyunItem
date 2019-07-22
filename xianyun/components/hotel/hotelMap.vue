<template>
  <div id="hotelMap">
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
      //地图窗体信息
      content: "高级酒店",
      map: null,
      markers: null,
      infoWindow:null,
      markerList: [],
      center: [118.796623, 32.059352]
    };
  },
  methods: {
    //创建窗体信息
    // createInfoWindow() {
    //   this.content.push("高级酒店");
    //   return this.content;
    // },
    //添加点标记
    setMarker(markers, position) {
      this.markers = new AMap.Marker({
        content:
          '<div style="width:20px;height:28px;text-align:center;" class="el-icon-location"></div>',
        position: position,
        offset: new AMap.Pixel(-17, -42), // 相对于基点的偏移位置
        map: this.map, //把点标记绑在前面初始化的 map_ 上，否则不显示
        title:"000"
      });
       this.markers.on('click', ()=>{
          this.infoWindow.open(this.map,position);
          });
    },
    setMapInfo() {
      this.map = new AMap.Map("hotelMap", {
        zoom: 11, //级别
        center: this.center, //中心点坐标
        viewMode: "3D" //使用3D视图
      });
      console.log(this.MapData);
      this.MapData.forEach(v => {
        //生成多个坐标点
        this.setMarker(v.area, [v.location.longitude, v.location.latitude]);
       
      });
     
    }
  },
  watch: {
    $route() {
      setTimeout(() => {
        this.setMapInfo();
      }, 3000);
    }
  },
  mounted() {
    setTimeout(() => {
      this.setMapInfo();
    }, 3000);
     this.infoWindow = new AMap.InfoWindow({
       offset: new AMap.Pixel(-5, -50),
        content: this.content, //传入 dom 对象，或者 html 字符串
      });
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