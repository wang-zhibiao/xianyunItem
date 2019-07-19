<!-- 文章展示区域 -->
<template>
  <div>
    <header>
      <!-- 搜索框 -->
      <div class="search">
        <el-input placeholder="请输入想去的地方，比如'广州'" v-model="searchText" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <!-- 推荐 -->
      <el-row class="recommend" type="flex" :gutter="10" justify="space-between">
        <el-col>推荐:</el-col>
        <el-col v-for="(item,index) in recommendList" :key="index">
          <!-- 后期根据城市名展示数据 -->
          <a href="javascript:void(0)">{{item}}</a>
        </el-col>
      </el-row>
      <el-row class="strategy" type="flex" justify="space-between">
        <el-col class="strategy-text" :span="4">推荐攻略</el-col>
        <el-col style="flex:1"></el-col>
        <el-col class="writeBtn" :span="4">
          <el-button type="primary" icon="el-icon-edit">写游记</el-button>
        </el-col>
      </el-row>
    </header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText: "",
      // 推荐文字数组
      recommendList: ["广州", "上海", "北京"]
    };
  }
};
</script>
<style lang='less' scoped>
// 边框值
@bd : 3px solid orange;
// 主颜色
@color: orange;
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
    border-bottom: 0.5px solid rgb(224, 223, 223);
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
</style>