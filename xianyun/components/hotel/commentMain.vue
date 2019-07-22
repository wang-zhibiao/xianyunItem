<template>
  <div>
    <div v-for="(item,index) in data" :key="index">
      <div class="containerMain" >
        <div class="left">
          <div class="user">
            <!-- 头像 -->
            <div class="avatar">
              <img :src="item.account.defaultAvatar? $axios.defaults.baseURL+''+item.account.defaultAvatar :defaultAvatar"  alt />
            </div>
            <!-- 等级 -->
            <div class="level">LV.{{item.level}}</div>
          </div>
          <el-row class="time">{{changeTime(item.updated_at)}}</el-row>
        </div>
        <div class="right">
          <el-row class="commentText">{{item.content}}</el-row>
          <el-row>
            <!-- 文本域 -->
            <el-input
              :rows="row"
              ref="textarea"
              @focus="textFocus(index)"
              @blur="textBlur(index)"
              type="textarea"
              show-word-limit
              resize="none"
              placeholder="添加回复"
              v-model="textarea1"
            ></el-input>
          </el-row>
        </div>
        
      </div>
      <Main :data="item.followed" class="componentMain"></Main>
    </div>
  </div>
</template>
<script>
export default {
  name: "Main",
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      textarea1: "",
      row: 1,
      defaultAvatar:require('../../assets/images/avatar.jpg')
    };
  },
  methods: {
    //   将日期转化格式
    changeTime(val) {
      return this.$moment(new Date(val)).format("YYYY-MM-DD");
    },
    textFocus(index) {
      this.$refs.textarea[index].$refs.textarea.setAttribute("rows", 4);
    },
    textBlur(index) {
      this.$refs.textarea[index].$refs.textarea.setAttribute("rows", 1);
    }
  }
};
</script>
<style lang='less' scoped>
@color: orange;
.containerMain {
  display: flex;
  padding-top: 30px;
    border-top: 0.5px dashed #ccc;
  margin-bottom: 15px;
  .left {
    width: 100px;
    .user {
      display: flex;
    }
  }
  .right {
    width: 900px;
  }
  .commentText {
    margin-bottom: 10px;
    color: #333;
  }
}
.avatar {
  width: 50px;
  img {
    width: 100%;
    border-radius: 50%;
    border: 2px solid @color;
  }
}
.level {
  font-size: 14px;
  color: @color;
  text-indent: 10px;
}
.time {
  font-size: 14px;
  color: #777;
}
.componentMain {
    display: flex;
    margin-left: 100px;
  //   padding-top: 20px;
  //   margin-top: 50px;
  .containerMain {
    width: 900px;
  }
}
</style>