<template>
  <div>
    <div  class="cmt-item" v-for="(item,index) in pinLunData" :key="index">
      <div  class="cmt-info">
        <img  :src="'http://157.122.54.189:9095'+item.account.defaultAvatar" />
        {{item.account.nickname}}
        <i >{{changeTime(item.account.created_at)}}</i>
        <span >{{item.level}}</span>
      </div>
      <div  class="cmt-content">
        <!---->
        <div  class="cmt-new">
          <p  class="cmt-message">{{item.content}}</p>
          <div  class="el-row el-row--flex">
            <div  class="cmt-pic" v-for="(item,index) in item.pics" :key="index">
              <img src="http://157.122.54.189:9095/uploads/e9276c6c70564244b679f86657d38360.jpeg" />
            </div>
          </div>
          <Item :pinLunData="item.parent"/>
          <div  class="cmt-ctrl">
            <a  href="javascript:;">回复</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Item",
  props: {
    pinLunData: {
      type: Array,
      default: []
    }
  },
  methods: {
    // 过滤时间
    changeTime(created_at) {
      console.log(created_at);
      return this.$moment(created_at).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>
<style lang="less" scoped>
.cmt-item{
  padding: 20px 20px 5px;
  border: 1px solid #ddd;
  .cmt-info{
    img{
      width: 16px;
      height: 16px;
    }
    span{
      float: right;
    }
  }
  .cmt-content{
    position: relative;
  }
  .cmt-pic{
    width: 80px;
    height: 80px;
    border-radius: 6px;
    overflow: hidden;
    margin-right: 5px;
    margin-top: 10px;
    padding: 5px;
    border: 1px dashed #ddd;
  }
  .cmt-new{
    img{
      width: 80px;
      height: 80px;
    }
  }
  .cmt-ctrl{
    color: aqua;
    position: absolute;
    right: 10px;
    bottom: 0;

  }
}
</style>
