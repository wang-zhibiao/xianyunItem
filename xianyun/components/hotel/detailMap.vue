<template>
  <div class="detailMap">
    <el-row>
      <el-col :span="14" id="detailMap"></el-col>
      <el-col :span="8" >
         <div class="navDiv">
          <el-tabs v-model="activeName">
            <el-tab-pane label="风景" name="first">
              <div class="traffic">
                <ul>
                  <li v-for="(item,index) in sceneryMapdata" :key="index" style="cursor:pointer;"
                   @mousemove="choose(item)">
                    <span>{{item.name}}</span>
                    <span>{{item.biz_ext.rating}}公里</span>
                  </li>
                 
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="交通" name="second">
              <div class="traffic">
                <ul>
                  <li>
                    <span>大桥(地铁站)</span>
                    <span>0.13公里</span>
                  </li>
                  <li>
                    <span>弘阳广场(地铁站)</span>
                    <span>0.92公里</span>
                  </li>
                  <li>
                    <span>南浦路(地铁站)</span>
                    <span>1.05公里</span>
                  </li>
                  <li>
                    <span>桥北客运站(公交站)</span>
                    <span>0.41公里</span>
                  </li>
                  <li>
                    <span>南京长途汽车客运北站(地铁站)</span>
                    <span>0.52公里</span>
                  </li>
                  <li>
                    <span>长江大桥北(公交站)</span>
                    <span>0.17公里</span>
                  </li>
                  <li>
                    <span>江山路大桥北路(公交站)</span>
                    <span>0.15公里</span>
                  </li>
                  <li>
                    <span>桥荫路·浦珠北路(公交站)</span>
                    <span>0.19公里</span>
                  </li>
                  <li>
                    <span>桥荫路北(公交站)</span>
                    <span>0.36公里</span>
                  </li>
                  <li>
                    <span>柳州路(地铁站)</span>
                    <span>1.62公里</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
     <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=da06fea2dc3561e40e303fd48e522ac9"
    ></script>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //地图的标签
      activeName:"first",
      // 地图的数据
      sceneryMapdata:null,
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
    //触发地图的点
    choose(data){
       let temp = data.location.split(",");
        temp = [temp[0]-0,temp[1]-0]
        this.content = data.name
         this.infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(-5, -50),
          content: this.content //传入 dom 对象，或者 html 字符串
        });
       this.infoWindow.open(this.map, temp);
    
    },
    //添加点标记
    setMarker(markers, position, data) {
      this.markers = new AMap.Marker({
        content: `<div style="width:20px;height:28px;text-align:center;" class="el-icon-location"></div>`,
        position: position,
        offset: new AMap.Pixel(-17, -42), // 相对于基点的偏移位置
        map: this.map //把点标记绑在前面初始化的 map_ 上，否则不显示
      });
       AMap.event.addListener(this.markers,"mousemove", ()=>{
        this.content = data.name;
        this.infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(-5, -50),
          content: this.content //传入 dom 对象，或者 html 字符串
        });
        this.infoWindow.open(this.map, position);
      });
    },
    setMapInfo() {
      const {location} = this.sceneryMapdata[3]
      //重新设置地图中心点
      const temp = location.split(",");
      this.center = [temp[0]-0,temp[1]-0]
      this.map = new AMap.Map("detailMap", {
        zoom: 14, //级别
        center: this.center, //中心点坐标
        viewMode: "3D" //使用3D视图
      });
      this.sceneryMapdata.forEach(v => {
        //生成多个坐标点
        let str = v.location.split(",");
        this.setMarker(v.name, [str[0]-0,str[1]-0], v);
      });
    },
    //请求数据
    getMapdata(){
      this.$axios({
      url:`https://restapi.amap.com/v3/place/text`,
      params:{
        keyword:'',
        location:"118.732841,32.077242",
        city:"南京市",
        types:"风景名胜",
        output:'json',
        page:1,
        offset:10,
        key:'da06fea2dc3561e40e303fd48e522ac9'
        // key:'79041dfa1c752f49599e2b507c64da42'
      }
    }).then(res=>{
      this.sceneryMapdata = res.data.pois
    })
    }
  },
  mounted() {
     setTimeout(() => {
      this.setMapInfo();
    }, 3000);
    //请求数据
    this.getMapdata()
  }
};
</script>
<style lang="less" scoped>
.navDiv{
  padding-left: 20px;
}
#detailMap {
  width: 650px;
  height: 360px;
  /deep/.el-icon-location {
    color: #00a4ff;
    &::before {
      display: block;
      color: #ff3366;
      transform: scale(3);
    }
  }
}

.traffic {
    overflow-y: auto;
    height: 300px;
    ul {
      li {
        height: 40px;
        color: #666;
        font-size: 14px;
        padding-left: 10px;
        span:last-child {
          float: right;
          margin-right: 10px;
        }
      }
    }
  }
</style>