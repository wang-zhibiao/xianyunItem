<template>
  <div id="hotelMap">
    <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=d67b45d503ac4dac45d41b907bc974db"></script> 
  </div>
</template>

<script>
export default {
   props:{
        MapData:{
            type:Array,
            default:[]
        }
    },
  data() {
    return {
      map:null,
      markers:null,
      markerList:[],
      center:[118.796623, 32.059352]
    };
  },
  methods: {
    //添加点标记
    setMarker(markers,position){
       this.markers = new AMap.Marker({
        position: position,
        map: this.map//把点标记绑在前面初始化的 map_ 上，否则不显示
      })
    },
    setMapInfo(){
       this.map = new AMap.Map("hotelMap", {
        zoom: 11, //级别
        center: this.center, //中心点坐标
        viewMode: "3D" //使用3D视图
      });
      console.log(this.MapData);
      this.MapData.forEach(v=>{
        //生成多个坐标点
      this.setMarker('marker',[v.location.longitude, v.location.latitude])
      })
      this.setMarker('marker2',[118.796623, 32.559352])
    }
  },
  watch: {
    $route(){
      setTimeout(()=>{
       this.setMapInfo()
     },3000)
    }
  },
  mounted() {
     setTimeout(()=>{
       this.setMapInfo()
     },3000)
  }
};
</script>
<style lang="less" scoped>
#hotelMap {
  width: 420px;
  height: 260px;
}
</style>