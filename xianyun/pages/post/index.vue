<template>
  <div class="post">
    <el-row type="flex" class="post_content" justify="space-between">
      <el-col class="menus-wrapper" :span="7">
        <!-- 左侧菜单导航栏 -->
        <Aside></Aside>
      </el-col>
      <el-col class="post-wrapper" :span="17">
        <!-- 文章展示区域 -->
        <Main></Main>
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
};
</script>
<style lang="less" scoped>
.post_content {
  width: 1000px;
  margin: 0 auto;
  
}
</style>