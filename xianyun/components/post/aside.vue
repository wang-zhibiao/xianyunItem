<template>
  <div class="navs">
    <div @mouseleave="leave">
      <el-row type="flex" justify="space-between">
        <el-col :span="24">
          <div
            class="hotCity"
            v-for="(item,index) in cityList"
            :key="index"
            @mouseenter="hovers(index)"
          >
            <span>{{item.type}}</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </el-col>

        <div class="rows" v-show="isShow">
          <div v-for="(item,index) in hotList" :key="index" class="back">
            <nuxt-link :to="`/post?city=${item.city}`">
              <span class="num">{{index + 1}}</span>&nbsp;&nbsp;
              <span class="oneCity">{{item.city}}</span>&nbsp;&nbsp;
              <span class="twoCity">{{item.desc}}</span>
            </nuxt-link>
          </div>
        </div>
      </el-row>
    </div>
    <div class="citys">
      <span>推荐城市</span>
    </div>

    <div class="imgs">
      <nuxt-link to="#">
        <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      cityList: [],
      hotList: [],
      arr: []
    };
  },

  methods: {
    hovers(index) {
      this.isShow = true;
      this.hotList = this.arr[index];
    },

    leave() {
      this.isShow = false;
    }
  },

  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      this.cityList = res.data.data;

      const arr = [];
      this.cityList.forEach(e => {
        this.arr.push(e.children);     
      });    
    });
  }
};
</script>
<style lang="less" scoped>
.imgs {
  margin-top: 15px;
  img {
    width: 250px;
    height: 150px;
  }
}

.citys {
  width: 250px;
  margin-top: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
}
.navs {
  margin: 15px 0;
  position: relative;
  top: 0;
  left: 0;

  .hotCity {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-collapse: collapse;
    width: 250px;
    height: 40px;
    line-height: 40px;
    span {
      margin-left: 15px;
      font-size: 14px;
    }
    &:last-child {
      border-bottom: 1px solid #ccc;
    }
    i {
      position: absolute;
      left: 230px;
      line-height: 40px;
    }

    &:hover {
      color: orange;
      border-right: none;
    }
  }

  .rows {
    position: absolute;
    left: 250px;
    width: 350px;
    height: 36px;
    line-height: 36px;
    z-index: 9;
    .back {
      background-color: #fff;
    }
    div {
      border-right: 1px solid #ccc;
    }
    div:first-child {
      border-top: 1px solid #ccc;
    }
    div:last-child {
      border-bottom: 1px solid #ccc;
      border-left: 1px solid #ccc;
    }
    .num {
      color: orange;
      font-size: 25px;
      margin-left: 15px;
      font-style: italic;
    }

    .oneCity {
      color: orange;
      &:hover {
        text-decoration: underline;
      }
    }

    .twoCity {
      color: #999999;
      font-size: 14px;
      &:hover {
        text-decoration: underline;
      }
    }

    span {
      cursor: pointer;
    }
  }
}
</style>

