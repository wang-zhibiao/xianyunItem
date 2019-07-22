<template>
  <div>
    <div class="cmt-list" v-for="(item,index) in pinLunData" :key="index">
      <div class="cmt-item">
        <div class="cmt-info">
          <img  :src="typeof(item.account) == 'object'?'http://157.122.54.189:9095' + item.account.defaultAvatar : ''" />
          <em style="font-style:normal">{{typeof(item.account) == 'object'?item.account.nickname:''}}</em>
          <i>{{changeTime(item.created_at)}}</i>
          <span>{{item.level}}</span>
        </div>
        <div class="cmt-content">
          <p class="cmt-message">{{item.content}}</p>
          <el-row type="flex">
            <!-- <div class="cmt-pic" v-if="item.pics.length>0"> -->
              <div class="cmt-pic" v-if="Object.keys(item).indexOf('pics') != -1">
              <!-- <img :src="Object.keys(item).indexOf(`pics`) != -1 ? 'http://157.122.54.189:9095' + item.pics[0].url :''" /> -->
            </div>
          </el-row>
          <div class="cmt-ctrl">
            <a href="javascript:;" @click="handleDiGui(item)">回复</a>
          </div>
        </div>
      </div>
      <Item :pinLunData="item.follow"></Item>
    </div>
  </div>
</template>
<script>
export default {
  name:'Item',
    props:{
        pinLunData:{
            type:Array,
            default:[]
        }
    },
    methods:{
       // 过滤时间
    changeTime(created_at) {
      console.log(created_at);

      return this.$moment(created_at).format("YYYY-MM-DD HH:mm");
    },
    }
}
</script>
<style lang="less" scoped>
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
</style>
