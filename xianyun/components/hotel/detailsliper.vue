<template>
  <div class="slideshow clearfix">
    <div class="col-bg">
      <el-carousel :interval="3000" indicator-position="none" ref="carousel">
        <el-carousel-item v-for="(item,index) in imgList" :key="index" name="index">
          <img :src="item.idView" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="dol-bg">
      <span v-for="(item,index) in imgList" :key="index" @click="imgchange(index)">
        <img :src="item.idView" />
      </span>
     </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgList: [
        { id: 0, idView: require("../../assets/images/1.jpeg") },
        { id: 1, idView: require("../../assets/images/2.jpeg") },
        { id: 2, idView: require("../../assets/images/3.jpeg") },
        { id: 3, idView: require("../../assets/images/4.jpeg") },
        { id: 4, idView: require("../../assets/images/5.jpeg") },
        { id: 5, idView: require("../../assets/images/6.jpeg") }
      ]
    };
  },

  methods:{
      imgchange(index) {
        this.$refs.carousel.setActiveItem(index)
      }
  }
};
</script>
<style lang="less" scoped>
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.slideshow {
  /deep/.el-carousel__container {
    height: 360px;
    width: 640px;
  }
  width: 1000px;
  height: 360px;
  margin-top: 30px;
  margin-bottom: 30px;
  .col-bg {
    float: left;
    width: 640px;
    height: 360px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .dol-bg {
    img {
      margin-left: 15px;
      margin-bottom: 11px;
      width: 160px;
      height: 110px;
      cursor: pointer;
    }
  }
}
</style>