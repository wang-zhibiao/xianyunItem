<template>
  <div class="detailMap clearfix">
    <div class="clearx">
      <div id="container" style="width:650px; height: 360px;"></div>
      <div class="mapSidt">
        <div class="navDiv">
          <el-tabs v-model="activeName">
            <el-tab-pane label="风景" name="first">
              <div class="traffic">
                <ul>
                  <li>
                    <span>南京长江大桥</span>
                    <span>2.42公里</span>
                  </li>
                  <li>
                    <span>浦口公园</span>
                    <span>3.01公里</span>
                  </li>
                  <li>
                    <span>五塘广场</span>
                    <span>4.64公里</span>
                  </li>
                  <li>
                    <span>基督教桥北点</span>
                    <span>0.63公里</span>
                  </li>
                  <li>
                    <span>总统府</span>
                    <span>11.06公里</span>
                  </li>
                  <li>
                    <span>桥北滨江生态公园</span>
                    <span>1.52公里</span>
                  </li>
                  <li>
                    <span>阅江楼景区</span>
                    <span>3.90公里</span>
                  </li>
                  <li>
                    <span>夫子庙</span>
                    <span>12.96公里</span>
                  </li>
                  <li>
                    <span>古林公园</span>
                    <span>6.97公里</span>
                  </li>
                  <li>
                    <span>夫珍珠泉旅游度假区</span>
                    <span>5.56公里</span>
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
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      count: 0
    };
  },
  methods: {
    load() {
      this.count += 2;
    }
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
}
</style>