<template>
  <div class="post">
    <el-row type="flex" class="post_content" justify="space-between" align="middle">
      <el-col class="menus-wrapper" :span="7">
        <!-- 左侧菜单导航栏 -->
        <Aside></Aside>
      </el-col>
      <el-col class="post-wrapper" :span="17">
        <!-- 文章展示区域 -->
        <Main :asideCity="city"></Main>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Aside from '@/components/post/aside'
import Main from "@/components/post/main";
export default {
  data () {
    return {
      city:''
    }
  },
  components: {
    Aside,
    Main
  },
  // 路由导航守卫
  beforeRouteUpdate(to,from,next){
    next();
    const obj = this.$route.query
    // 定义一个数组接收url后面的值
    let temp = Object.keys(obj)
    if(temp.length != 0){
      this.city = obj[temp[0]]
    }
  },
};
</script>
<style lang="less" scoped>
.post_content {
  width: 1000px;
  margin: 0 auto;
  // height: 900px;
  // background: #000;
  .menus-wrapper {
    width: 260px;
    height: 900px;
    background: green;
  }
  .post-wrapper {
    width: 700px;
    // height: 900px;
    // background: red;
  }
}
</style>