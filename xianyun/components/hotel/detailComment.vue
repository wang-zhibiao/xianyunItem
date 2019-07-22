<template>
  <div class="comment">
    <!-- 酒店详情头部 -->
    <header>
      <h4>10条真实用户评论</h4>
      <el-row type="flex">
        <el-col :span="4" class="comment-number">
          <el-col>总评数：{{data.all_remarks}}</el-col>
          <el-col>好评数：{{data.good_remarks}}</el-col>
          <el-col>差评数：{{data.bad_remarks}}</el-col>
        </el-col>
        <!-- 评分内容 -->
        <el-col :span="20" class="rateContent">
          <!-- 推荐div -->
          <div class="recommend">推荐</div>
          <el-col :span="6">
            <!-- 评分组件 -->
            <el-rate
              v-model="data.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </el-col>
          <el-col :span="4" class="progressContainer">
            <!-- 环境 -->
            <el-progress
              color="orange"
              :width="75"
              :stroke-width="2"
              type="circle"
              :show-text="false"
              :percentage="data.scores.environment ? data.scores.environment *10 : 0"
            ></el-progress>
            <span>环境</span>
            <em>{{data.scores.environment}}</em>
          </el-col>
          <el-col :span="4" class="progressContainer">
            <!-- 产品 -->
            <el-progress
              color="orange"
              :width="75"
              :stroke-width="2"
              type="circle"
              :show-text="false"
              :percentage="data.scores.product ? data.scores.product *10 : 0"
            ></el-progress>
            <span>产品</span>
            <em>{{data.scores.product}}</em>
          </el-col>
          <el-col :span="4" class="progressContainer">
            <!-- 服务 -->
            <el-progress
              color="orange"
              :width="75"
              :stroke-width="2"
              type="circle"
              :show-text="false"
              :percentage="data.scores.service ? data.scores.service *10 : 0"
            ></el-progress>
            <span>服务</span>
            <em>{{data.scores.service}}</em>
          </el-col>
        </el-col>
      </el-row>
    </header>
    <!-- 评论内容组件 -->
    <Main :data="commentsList"></Main>
  </div>
</template>
<script>
import Main from './commentMain'
export default {
  props: {
    data: {
      type: Object,
      default: {
        scores: {}
      }
    }
  },
  components:{
      Main
  },
  data() {
    return {
      //   评论数据
      commentsList: [],
      scoresData: {},
    };
  },
  mounted() {
    // 请求评论数据
    this.$axios({
      baseURL: "http://157.122.54.189:9095",
      url: "hotels/comments"
    }).then(res => {
      this.commentsList = res.data.data;
    });
  },
};
</script>
<style lang="less" scoped>
.comment {
  header {
    padding: 30px 0;
    margin-bottom: 20px;
    h4 {
      margin-bottom: 20px;
    }
    // 评论数
    .comment-number {
      color: #777;
    }
    // 评分内容
    .rateContent {
      position: relative;
      color: orange;
      font-size: 14px;
      height: 80px;
      line-height: 80px;
      .el-rate {
        height: 80px;
        line-height: 80px;
      }
      /deep/.el-rate__text {
        font-size: 20px;
        vertical-align: top;
      }
      //   推荐div
      .recommend {
        position: absolute;
        top: 0px;
        left: 25px;
        width: 75px;
        height: 75px;
        border-radius: 50%;
        border: 2px solid red;
        color: red;
        text-align: center;
        line-height: 75px;
        font-size: 26px;
        opacity: 0.1;
        transform: rotate(-30deg);
      }
      //   圆形进度条
      .progressContainer {
        position: relative;
        span {
          position: absolute;
          top: 20px;
          left: 20px;
          font-size: 16px;
          line-height: 16px;
        }
        em {
          position: absolute;
          top: 40px;
          left: 25px;
          font-size: 16px;
          line-height: 16px;
        }
      }
    }
  }
}
</style>