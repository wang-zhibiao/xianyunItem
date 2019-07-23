<template>
  <div class="cmd-floor">
    <div class="cmt-info">
      <img :src="'http://157.122.54.189:9095' + data.account.defaultAvatar" />
      <em style="font-style:normal">{{data.account.nickname}}</em>
      <i>{{changeTime(data.created_at)}}</i>
      <span>{{data.level}}</span>
    </div>
    <div class="cmt-content">
      <div class="cmt-new">
        <p class="cmt-message">{{data.content}}</p>
        <el-row type="flex" v-if="data.pics.length > 0">
          <div class="cmt-pic" v-for="(value,index) in data.pics" :key="index">
            <img :src="'http://157.122.54.189:9095' + value.url " />
          </div>
        </el-row>
        <div class="cmt-ctrl">
          <a href="javascript:;" @click="handleChuanZhi(data)">回复</a>
        </div>
      </div>
    </div>
    <div>
      <Item :data="data.parent" v-if="data.parent" @handleJieShou="handleChuanZhi"/>
    </div>
  </div>
</template>
<script>
export default {
  name: "Item",
  props: ["data"],
  methods: {
    handleChuanZhi(data){
      this.$emit("handleJieShou", data)
    },
    changeTime(created_at) {
      return this.$moment(created_at).format("YYYY-MM-DD HH:mm");
    },
  }
};
</script>
<style lang="less" scoped>
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
</style>
