<template>
  <div class="detailMap clearfix">
    <div class="clearx">
      <div id="container" style="width:650px; height: 360px;"></div>
      <div class="mapSidt">
        <el-tabs v-model="activeName">
          <el-tab-pane label="风景" name="first"></el-tab-pane>
          <el-tab-pane label="交通" name="second"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first'
    };
  },
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom: 13,
        center: [118.8718107, 31.32846821],
        viewMode: "3D"
      });

      var marker1 = new AMap.Marker({
        position: new AMap.LngLat(118.868838, 31.319002),
        title: "北京"
      });
      var marker2 = new AMap.Marker({
        position: new AMap.LngLat(118.870436, 31.329013),
        title: "北京"
      });

      map.add([marker1, marker2]);
    };
    var key = "6f77904e52b38763ef2be9550d25b73e";
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad`;

    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>
<style lang="less" scoped>
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.detailMap {
  width: 1000px;
  .clearx {
    float: left;
    position: relative;
  }
  .container {
  }
  .mapSidt {
    position: absolute;
    top: 0;
    left: 670px;
    width: 330px;
    height: 360px;
  }
}
</style>