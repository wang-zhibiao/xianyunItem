<template>
  <div style="padding:20px;border: 1px solid #ccc;">
    <div class="cmt-list" v-for="(item,index) in pinLunData" :key="index">
      <div class="cmt-item">
        <div class="cmt-info">
          <img
            :src="typeof(item.account) == 'object'?'http://157.122.54.189:9095' + item.account.defaultAvatar : ''"
          />
          <em
            style="font-style:normal"
          >{{typeof(item.account) == 'object'?item.account.nickname:''}}</em>
          <i>{{changeTime(item.created_at)}}</i>
          <span>{{item.level}}</span>
        </div>

        <div class="cmt-content">
          <Item :pinLunData="followArray(item)" style="padding:2px;background: #eee;border:1px solid #333"></Item>
          <p class="cmt-message">{{item.content}}</p>
          <el-row type="flex">
            <!-- <div class="cmt-pic" v-if="item.pics.length>0"> -->
            <div class="cmt-pic" v-if="Object.keys(item).indexOf('pics') != -1">
              <img
                :src="Object.keys(item).indexOf(`pics`) != -1 && item.pics.length>0 ? 'http://157.122.54.189:9095' + item.pics[0].url :''"
              />
            </div>
            
          </el-row>
          <div class="cmt-ctrl">
            <a href="javascript:;" @click="handleDiGui(item)">回复</a>
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
  mounted() {
    setTimeout(() => {
      console.log(this.pinLunData);
    }, 1000);
  },
  methods: {
    // 过滤时间
    changeTime(created_at) {
      return this.$moment(created_at).format("YYYY-MM-DD HH:mm");
    },
    followArray(item) {
      if (item.parent) {
        let arr = [];
        arr.push(item.parent);
        return arr;
      } else {
        return "";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.cmt-list {
  
  // padding: 20px 20px 5px;
  .cmt-item {
    .cmt-info {
      img {
        width: 16px;
        height: 16px;
      }
      span {
        float: right;
      }
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
      width: 100%;
      height: 100%;
    }
  }
  .cmt-ctrl{
    color: #1e50a2;
    position: absolute;
    right: 10px;
    bottom: 0;

  }
}
</style>
