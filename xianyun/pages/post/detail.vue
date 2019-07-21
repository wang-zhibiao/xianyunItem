<!-- 文章详情页 -->
<template>
  <el-row class="container" type="flex" justify="space-between">
    <!-- 左边部分 -->
    <div class="left">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>{{dataList.title}}</h1>
      <div class="post-info">
        <span>攻略：{{dataList.city.created_at}}</span>
        <span>阅读：{{dataList.watch}}</span>
      </div>
      <!-- 内容展示部分 -->
      <div class="post-content" v-html="dataList.content"></div>
      <div class="post-ctrl">
        <el-row type="flex" justify="center">
          <div class="ctrl-item">
            <i class="iconfont iconpinglun"></i>
            <p>评论(608)</p>
          </div>
          <div class="ctrl-item">
            <i class="iconfont iconstar1"></i>
            <p>收藏</p>
          </div>
          <div class="ctrl-item">
            <i class="iconfont iconfenxiang"></i>
            <p>分享</p>
          </div>
          <div class="ctrl-item">
            <i class="iconfont iconding"></i>
            <p>点赞(53)</p>
          </div>
        </el-row>
      </div>
      <!-- 提交评论部分 -->
      <div class="cmt-wrapper">
        <h4 class="cmt-title">评论</h4>
        <div class="cmt-input">
          <el-input type="textarea" placeholder="说点什么把..." v-model="textarea"></el-input>
        </div>
        <el-row class="cmt-input-ctrls" type="flex" justify="space-between">
          <div class="cmt-pics">
            <el-upload
              action="http://127.0.0.1:1337/upload"
              list-type="picture-card"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :before-upload="handleBeforeUpload"
              :on-preview="handlePictureCardPreview"
              name="files"
              ref="clear"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="pics" />
            </el-dialog>
          </div>
          <div>
            <el-button type="primary" @click="handlePinLun">提交</el-button>
          </div>
        </el-row>
        <!-- 递归评论展示部分 -->
        <div class="cmt-list" v-for="(item,index) in pinLunData" :key="index">
          <div class="cmt-item">
            <div class="cmt-info">
              <img :src="$axios.defaults.baseURL + item.account.defaultAvatar" />
              <i>2019-07-19 8:38</i>
              <span>4</span>
            </div>
            <div class="cmt-content">
              <p class="cmt-message">{{item.content}}</p>
              <el-row type="flex">
                <div class="cmt-pic">
                  <img
                    src="http://157.122.54.189:9095/uploads/c6eaca91e91c461898cf16ffad0f8cd6.gif"
                  />
                </div>
              </el-row>
              <div class="cmt-ctrl">
                <a href="javascript:;">回复</a>
              </div>
            </div>
          </div>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="start"
            :page-sizes="[2, 4, 8, 10]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-row>
      </div>
    </div>
    <!-- 右边部分 -->
    <el-row class="right">
      <h4>相关攻略</h4>
      <div class="recommend-list" v-for="(value,index) in tuiJianData" :key="index">
        <nuxt-link to="#">
          <el-row type="flex">
            <el-row class="post-img" type="flex" align="middle">
              <img :src="value.images[0]" />
            </el-row>
            <div class="post-text">
              <div>{{value.title}}</div>
              <span>2019-7-18 阅读{{value.watch}}</span>
            </div>
          </el-row>
        </nuxt-link>
      </div>
    </el-row>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      dataList: {
        city: {}
        // id: "" //文章ID
      },
      textarea: "",
      tuiJianData: [],
      pics: [],
      limit: 2,
      start: 0,
      total: 0,
      pinLunData: [],
      dialogVisible: false
    };
  },
  methods: {
    // 分页评论
    init() {
      this.$axios({
        url: "/posts/comments",
        params: {
          post: this.dataList.id,
          _limit: this.limit,
          _start: this.start
        }
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.total = res.data.total;
          this.pinLunData = res.data.data;
        }
      });
    },
    // 提交评论
    handlePinLun() {
      this.$axios({
        url: "/comments",
        method: "POST",
        data: {
          content: this.textarea,
          post: this.dataList.id,
          pics: this.pics
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        // console.log(res);
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "评论成功"
          });
          this.textarea = "";
          this.$refs.clear.clearFiles();
        }
      });
    },

    // 上传之前限制格式
    handleBeforeUpload(file) {
      if (file.type.indexOf("image/") === -1) {
        this.$message({
          type: "error",
          message: "格式错误"
        });
        return false;
      }
    },
    // 上传成功的勾子
    handleSuccess(response) {
      const imgs = { url: response[0].name };
      this.pics.push(imgs);
      console.log(response);
    },

    // 删除图片的勾子
    handleRemove(file) {
      // console.log(file);
      this.pics.forEach((e, i) => {
        if (e.name === file.response[0].name) {
          this.pics.splice(i, 1);
        }
      });
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.pics = file.url;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.limit = val;
      this.init();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.start = val;
      this.init();
    }
  },
  mounted() {
    // 获取推荐文章
    this.$axios({
      url: "/posts/recommend",
      params: { id: this.dataList.id }
    }).then(res => {
      // console.log(res);
      if (res.status === 200) {
        this.tuiJianData = res.data.data;
      }
    });

    // 获取所有评论
    this.init();

    // 获取文章详情
    this.$axios({
      url: "/posts",
      params: this.$route.query
    }).then(res => {
      // console.log(res);
      if (res.status === 200) {
        const [data] = res.data.data;
        this.dataList = data;
      }
    });
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
}
.left {
  width: 700px;
  .post-content {
    width: 700px;
    overflow: hidden;
    /deep/ img {
      max-width: 700px !important;
    }
  }
  h1 {
    height: 130px;
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
  }
  .post-info {
    margin: 20px 0;
    text-align: right;
    span {
      margin-right: 20px;
      color: #999;
    }
  }
}
.post-ctrl {
  padding: 50px 0;
  .ctrl-item {
    margin: 0 20px;
    width: 60px;
    height: 55px;
    text-align: center;
    cursor: pointer;
    i {
      font-size: 28px;
      color: orange;
    }
    p {
      font-size: 14px;
      color: #999;
      margin-top: 5px;
    }
  }
}
.cmt-wrapper {
  h4 {
    margin-bottom: 20px;
  }
  .cmt-input {
    margin-bottom: 10px;
  }
  .cmt-input-ctrls {
    margin-bottom: 30px;
    /deep/ .el-upload--picture-card {
      width: 100px;
      height: 100px;
      line-height: 100px;
    }
    /deep/ .el-upload-list__item {
      width: 100px;
      height: 100px;
    }
  }
}
.cmt-list {
  .cmt-item {
    padding: 20px 20px 5px;
    .cmt-info {
      img {
        width: 16px;
        height: 16px;
      }
      span {
        float: right;
      }
    }
    .cmt-content {
      p {
        margin-top: 10px;
      }
      .cmt-pic {
        width: 80px;
        height: 80px;
        border-radius: 6px;
        border: 1px dashed #ddd;
        padding: 5px;
        margin-top: 10px;
        margin-right: 5px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }
      .cmt-ctrl {
        height: 20px;
        line-height: 20px;
        text-align: right;
        font-size: 12px;
        color: #1e50a2;
        a {
          // display: none;
          text-decoration: none;
          color: inherit;
        }
      }
    }
  }
}
.right {
  width: 280px;
  h4 {
    padding-bottom: 10px;
    border-bottom: 1px solid #999;
  }
  .recommend-list {
    padding: 20px 0;
    .post-img {
      margin-right: 10px;
      width: 100px;
      height: 80px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .post-text {
      font-size: 12px;
      flex: 1;
      position: relative;
      div {
        position: absolute;
        top: 0;
        left: 0;
      }
      span {
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
  }
}
</style>
