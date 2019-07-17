<template>
  <div class="header">
    <el-row type="flex" class="main" justify="space-between">
      <nuxt-link to="/">
      <!-- logo背景图 -->
        <h1>闲云旅游</h1>
      </nuxt-link>
      <!-- 导航栏 -->
      <el-row type="flex" class="nav">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <el-row>
        <!-- 登录成功时  $store.state.user是state的分类-->
        <el-dropdown v-if="$store.state.user.userInfo.token">
          <el-row type="flex" align="middle" class="el-dropdown-link">
            <nuxt-link to="#">
              <!-- 图片动态绑定 -->
                <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" alt="">
              {{$store.state.user.userInfo.user.nickname}}
            </nuxt-link>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-row>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <nuxt-link to="#">个人中心</nuxt-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <!-- 退出 -->
              <div @click="handlelogout">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 还未登录时 -->
        <nuxt-link to="/user/login"  class="account-link" v-else>登录 / 注册</nuxt-link>
      </el-row>
    </el-row>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods: {
    // 退出成功时清除本地
    handlelogout(){
      this.$store.commit('user/clearuserInfo')
       this.$message({
                message: "退出成功",
                type: "success"
            })
    }
  }
};
</script>
<style lang="less" scoped>
// 用背景图当标签
h1 {
  width: 150px;
  height: 50px;
  cursor:pointer;
  font-size: 0;
  margin-top: 9px;
  background: url(../static/logo.jpg) no-repeat;
  background-size: 150px 40px;
}
.header {
  height: 60px;
  box-shadow: 0 2px 3px #ccc;
}
.main {
  width: 1000px;
  margin: 0 auto;
  line-height: 60px;
}
.nav {
  flex: 1;
  padding: 0 20px;
  a {
    display: block;
    padding: 0 20px;
    height: 60px;
    &:hover {
      border-bottom: 5px #409eff solid;
      color: #409eff;
    }
  }
  // 绑定组件的class需要加上/deep/
  /deep/.nuxt-link-exact-active {
    background: #409eff;
    color: #fff;
    &:hover {
      color: #fff;
    }
  }
}
.el-dropdown-link{
           margin-left:20px;

           &:hover{
               img{
                    border-color: #409eff;
               }
            }

           a{
               display:block;
           }

            img{

                width:32px;
                height:32px;
                //图片与文字居中
                vertical-align: middle;
                border:2px #fff solid;
                border-radius:50px;
            }
        }

        .account-link{
            font-size: 14px;
            margin-left:10px;
            color:#666;

            &:hover{
                color:#409eff;
                // 文字下划线
                text-decoration: underline;
            }
        }
</style>