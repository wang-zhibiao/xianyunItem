<template>
  <div class="slideshow clearfix">
    <div class="col-bg">
      <el-carousel arrow="always" indicator-position="" ref="carousel" :autoplay="false">
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

    <el-row class="row-bg">
      <el-col :span="24" >
        <el-row type="flex" justify="space-between" class="hotelList">
          <el-col :span="10">
            <span>价格来源</span>
          </el-col>
          <el-col :span="10">
            <span>低价房型</span>
          </el-col>
          <el-col :span="4">
            <span>最低价/每晚</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="24" v-for="(item,index) in data.products" :key="index" class="marg">
        <el-row type="flex" justify="space-between" class="colList">
          <el-col :span="10">
            <span>{{item.name}}</span>
          </el-col>
          <el-col :span="10">
            <span>{{item.bestType}}</span>
          </el-col>
          <el-col :span="4">
            <span class="price">
              ￥{{item.price}}<span class="text">起</span>
              <i class="el-icon-arrow-right"></i>
            </span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
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

  methods: {
    imgchange(index) {
      this.$refs.carousel.setActiveItem(index);
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

  .row-bg {
    margin-top: 30px;
    .marg{
      &:last-child{
          margin-bottom: 40px;
      }
    }
    .hotelList {
      font-weight: 1000;
      color: #909399;
      height: 48px;
      padding: 12px 0;
      padding-left: 8px;
      border-bottom: 1px solid #ccc;
    }
    .colList {
      color: #666;
      height: 48px;
      padding: 12px 0;
      padding-left: 8px;
      font-size: 14px;
      border-bottom: 1px solid #ccc;
      .price {
        color: orange;
        font-size: 17px;
        .text{
          color: #666;
          padding: 0 5px;
          font-size: 14px;
        }
      }
      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>