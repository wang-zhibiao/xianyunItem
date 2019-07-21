<!-- 文章展示区域 -->
<template>
  <div>
    <!-- 头部 -->
    <header>
      <!-- 搜索框 -->
      <div class="search">
        <el-input
          @keyup.enter.native="searchByCity"
          placeholder="请输入想去的地方，比如'广州'"
          v-model="searchText"
          class="input-with-select"
        >
          <el-button @click="searchByCity" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <!-- 推荐 -->
      <el-row class="recommend" type="flex" :gutter="10" justify="space-between">
        <el-col>推荐:</el-col>
        <el-col v-for="(item,index) in recommendList" :key="index">
          <!-- 后期根据城市名展示数据 -->
          <a href="javascript:void(0)" @click="getDataByCity(item)">{{item}}</a>
        </el-col>
      </el-row>
      <el-row class="strategy" type="flex" justify="space-between">
        <el-col class="strategy-text" :span="4">推荐攻略</el-col>
        <el-col style="flex:1"></el-col>
        <el-col class="writeBtn" :span="4">
          <el-button type="primary" icon="el-icon-edit">
            <nuxt-link to="/post/create">写游记</nuxt-link>
          </el-button>
        </el-col>
      </el-row>
    </header>
    <!-- 城市旅游信息 -->
    <main v-for="(item,index) in articleData" :key="index">
      <!-- 3张图片 -->
      <nuxt-link :to="`/post/detail?id=${item.id}`" class="three" v-if="item.images.length > 1">
        <div class="title">{{item.title}}</div>
        <p class="description">{{item.summary}}</p>
        <!-- 图片 -->
        <el-row class="images" type="flex">
          <el-col :span="24/item.images.length" v-for="(image,number) in item.images" :key="number">
            <img :src="image" alt />
          </el-col>
        </el-row>
        <!-- 最底下的小信息 -->
        <el-row class="info" type="flex" justify="space-between">
          <el-col :span="8">
            <i class="el-icon-location-outline"></i>
            {{item.cityName}}&nbsp;&nbsp;by
            <span>
              <img
                class="avatar"
                :src="'http://157.122.54.189:9095'+item.account.defaultAvatar"
                alt
              />
              {{item.account.nickname}}
            </span>
            <i class="el-icon-view"></i>
            {{item.watch}}
          </el-col>
          <el-col :span="14"></el-col>
          <el-col :span="2" class="like">{{item.like}}赞</el-col>
        </el-row>
      </nuxt-link>
      <!-- 1张图片 -->
      <nuxt-link :to="`/post/detail?id=${item.id}`" class="one" v-else>
        <el-row type="flex">
          <el-col :span="8">
            <img :src="item.images" alt />
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="15">
            <div class="title">{{item.title}}</div>
            <p class="description">{{item.summary}}</p>
            <!-- 最底下的小信息 -->
            <el-row class="info" type="flex" justify="space-between">
              <el-col :span="14">
                <i class="el-icon-location-outline"></i>
                {{item.cityName}}&nbsp;&nbsp;by
                <span>
                  <img
                    class="avatar"
                    :src="'http://157.122.54.189:9095'+item.account.defaultAvatar"
                    alt
                  />
                  {{item.account.nickname}}
                </span>
                <i class="el-icon-view"></i>
                {{item.watch}}
              </el-col>
              <el-col :span="7"></el-col>
              <el-col :span="3" class="like">{{item.like}}赞</el-col>
            </el-row>
          </el-col>
        </el-row>
      </nuxt-link>
    </main>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 5, 10, 15]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  
  data() {
    return {
      searchText: "",
      // 推荐文字数组
      recommendList: ["广州", "上海", "北京"],
      // 文章列表数据
      articleData: [],
      // 当前页码数
      currentPage: 1,
      // 数据总数
      total: 1,
      // 从第几条数据开始获取
      start: 3,
      // 一共获取多少条
      limit: 3,
      // 定义一个接收城市的变量
      city: ""
    };
  },
  mounted() {
    // 默认从第0条数据开始拿，拿3条数据
    this.init(0, 3);
  },
  watch: {
    $route({query},old){
      // 获取路由改变后带的城市名，然后调用封装好的方法
      let city = query.city
      this.initByCity(city);
    }
  },

  methods: {
    // 搜索框筛选事件
    searchByCity() {
      if (!this.searchText.trim()) {
        this.$message.warning("请输入成名后再搜索!");
        return;
      }
      this.init(this.start, this.limit, this.searchText);
    },

    // 根据城市名请求数据
    getDataByCity(city) {
      this.initByCity(city);
    },

    // 封装通过城市名请求数据
    initByCity(city) {
      this.city = city;
      this.currentPage = 1;
      this.start = (this.currentPage - 1) * this.limit;
      this.init(this.start, this.limit, this.city);
    },

    // 封装请求数据方法
    init(_start, _limit, city) {
      this.$axios({
        // 本地数据库只有4条数据，所以请求贤哥的服务器
        baseURL: "http://157.122.54.189:9095",
        url: "/posts",
        params: {
          _start,
          _limit,
          city
        }
      }).then(res => {
        if (res.data.data.length == 0) {
          this.$message.warning("改城市还没开通攻略，请确认输入的城市名无误！");
        }
        this.articleData = res.data.data;
        this.total = res.data.total;
      });
    },
    // 封装分页器改变展示数据条数或者是改变页码数后操作
    changSize() {
      this.start = (this.currentPage - 1) * this.limit;
      // 判断
      if (!this.city) {
        this.init(this.start, this.limit);
      } else {
        this.init(this.start, this.limit, this.city);
      }
    },
    // 改变页面展示数据的条数
    handleSizeChange(val) {
      this.currentPage = 1;
      this.limit = val;
      this.changSize()
    },
    // 改变页码数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.changSize()
    }
  }
};
</script>
<style lang='less' scoped>
// 边框值
@bd : 3px solid orange;
// 主颜色
@color: orange;
@bdgray: 0.5px solid rgb(224, 223, 223);
// 头部样式
header {
  margin-top: 15px;
  // 搜索框
  .search {
    font-size: 16px;
    /deep/.el-icon-search {
      font-size: 25px;
      color: @color;
      font-weight: 600;
    }
    /deep/.el-input-group__append {
      background-color: #fff;
      border-radius: 0;
      border: none;
    }
    /deep/.el-input__inner {
      border: none;
    }
    .input-with-select {
      border: @bd;
      border-radius: 0;
    }
    ::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #757575;
      letter-spacing: 2px;
    }
  }
  // 推荐文字
  .recommend {
    width: 150px;
    font-size: 12px;
    margin: 10px 0;
    color: #757575;
    a {
      &:hover {
        color: orange;
        text-decoration: underline;
      }
    }
  }
  // 推荐攻略
  .strategy {
    border-bottom: @bdgray;
    .strategy-text {
      width: 73px;
      line-height: 40.4px;
      font-weight: 400;
      font-size: 18px;
      color: @color;
      padding-bottom: 10px;
      border-bottom: 2px solid @color;
    }
  }
}
// 主内容样式
main {
  img {
    width: 100%;
  }
  // 公共样式
  .title {
    font-size: 18px;
    padding: 20px 0 15px;
    &:hover {
      color: @color;
    }
  }
  .description {
    height: 60px;
    overflow: hidden;
    margin-bottom: 15px;
    font-size: 14px;
    color: #777;
  }
  img {
    width: 100%;
    height: 165px;
    object-fit: cover;
  }
  .info {
    font-size: 12px;
    color: #777;
    .avatar {
      width: 25px;
      height: 25px;
      vertical-align: middle;
    }
    a {
      color: @color;
    }
    .like {
      color: @color;
      font-size: 16px;
    }
  }
  .three,
  .one {
    display: block;
    padding-bottom: 10px;
    border-bottom: @bdgray;
  }
  .one {
    margin-top: 15px;
  }
}

.pagination {
  margin: 15px 0;
}
</style>