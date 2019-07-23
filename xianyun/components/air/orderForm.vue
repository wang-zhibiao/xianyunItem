<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in user" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div v-for="(item, index) in infoData.insurances" :key="index">
        <div class="insurance-item">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}元`"
            @change="chooseInsurance(item)"
            border
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <input type="hidden" :value="AllPrice()">
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      infoData:{
        insurances:[],
      seat_infos: {}
      },
      user: [
        {
          username: "",
          id: ""
        }
      ],
      insurances: [], // 保险数据
      contactName: "", // 联系人名字
      contactPhone: "", // 联系人电话
      captcha: "", // 验证码
      invoice: false // 发票
    };
  },
  // props: {
  //   data: {
  //     type: Object,
  //     default: {}
  //   }
  // },
  mounted() {
           // 解构url的请求
      const {query} = this.$route
      this.$axios({
          url:`/airs/${query.id}`,
          params:{
              seat_xid: query.xid
          }
      }).then(res=>{
          this.infoData = res.data;
          this.$store.commit("air/setAsideData",this.infoData)
      }) 
  },
  methods: {
    //计算总金额
    AllPrice(){
      
      let price = 0;
      price+=this.infoData.seat_infos.org_settle_price;
      price+=this.insurances.length*30;
      price+=this.infoData.airport_tax_audlet;
      price*=this.user.length
      this.$store.commit('air/setAllPrice',price)
    },
    // 保险数据
    chooseInsurance(item) {
      const index = this.insurances.indexOf(item.id);
      if (index > -1) {
        // 如果有保险就添加数据
        this.insurances.splice(index, 1);
      } else {
        this.insurances.push(item.id);
      }
      this.insurance = this.insurances;
    },
    // 添加乘机人
    handleAddUsers() {
      // 解构添加
      this.user = [
        ...this.user,
        {
          username: "",
          id: ""
        }
      ];
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.user.splice(index, 1);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      //         if (!this.contactPhone.trim()) {
      //     this.$confirm("请输入手机号码", "提示", {
      //       confirmButtonText: "确定",
      //       showCancelButton: false,
      //       type: "warning"
      //     });
      //     return;
      //   } else if (this.contactPhone.trim().length !== 11) {
      //     this.$confirm("请输入正确的(11位)手机号码", "提示", {
      //       confirmButtonText: "确定",
      //       showCancelButton: false,
      //       type: "warning"
      //     });
      //     return;
      //   }
      this.$store.dispatch("air/sendCode", this.contactPhone).then(res => {
        this.$confirm(`验证码是:${res}`, "验证码", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "success"
        });
      });
    },

    // 提交订单
    handleSubmit() {
      const { id, xid } = this.$route.query;
      const form = {
        users: this.user,
        insurances: this.insurance,
        contactName: this.contactName, // 联系人名字
        contactPhone: this.contactPhone, // 联系人电话
        captcha: this.captcha, // 验证码
        invoice: false, // 发票
        air: id / 1,
        seat_xid: xid
      };
    //   //自定义表单验证
    //   const rules = {
    //     users: {
    //       value: this.user[0].username && this.user[0].id,
    //       message: "乘机人不能为空"
    //     },
    //     contactName: {
    //       value: this.contactName,
    //       message: "请输入联系人"
    //     },
    //     contactPhone: {
    //       value: this.contactPhone,
    //       message: "请输入手机号码"
    //     },
    //     captcha: {
    //       value: this.captcha,
    //       message: "请输入验证码"
    //     }
    //   };
    //   let isTrue = true;
    //   Object.keys(rules).forEach(v =>{
    //       if(!isTrue) return "";
    //       if(!rules[v].value){
    //           isTrue = false;
    //            this.$message.warning( rules[v].message  );
    //            if(!isTrue) return 0;
    //       }
    //   })
      const token = this.$store.state.user.userInfo.token;

      
      this.$axios({
        url: "/airorders",
        method: "POST",
        data: form,
        headers: {
          Authorization: `Bearer ${token || `NO TOKEN`}`
        }
      }).then(res => {
          this.$message({
        message: "正在生成订单！请稍等",
        type: "success"
      });
        setTimeout(()=>{
          const {message,data} = res.data
            this.$message.success(message);
            this.$router.push('/air/pay?id='+data.id)
        },3000)
      });
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>