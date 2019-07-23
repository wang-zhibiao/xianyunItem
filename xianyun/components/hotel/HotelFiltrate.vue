<template>
  <div class="filtrate">
    <!-- 筛选城市 -->
    <el-row class="Hotel_filtrate">
      <el-form :model="form">
        <!-- 选择城市 -->
        <el-form-item class="hotel_inquire" >
          <el-autocomplete
            v-model="form.hotelCity"
            :fetch-suggestions="queryDepartSearch"
            @select="handleSelect"
            placeholder="请输入内容"
          ></el-autocomplete>
        </el-form-item>
        <!-- 入住时间 -->
        <el-form-item class="hotel_Date">
          <el-date-picker
            v-model="form.hoteldate"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <!-- 入住人数 -->
        </el-form-item>
        <el-form-item class="hotel_number">
          <el-input
            placeholder="人数未定"
            suffix-icon="el-icon-s-custom"
            v-model="form.number"
            @focus="isShow = true"
            readonly
          ></el-input>
        </el-form-item>
        <!-- 入住人数选择 -->
        <el-row class="hotel_adult" v-if="isShow">
          <el-col :span="8">
            <span>每间</span>
          </el-col>
          <el-col :span="16">
            <el-select
              size="mini"
              v-model="form.adult"
              placeholder
              class="hotel_select hotel_select_adult"
            >
              <el-option
                v-for="item in housingData"
                :key="item.adult"
                :label="item.adult"
                :value="item.adult"
              ></el-option>
            </el-select>
            <el-select
              size="mini"
              v-model="form.children"
              class="hotel_select hotel_select_children"
            >
              <el-option
                v-for="item in housingData"
                :key="item.children"
                :label="item.children"
                :value="item.children"
              ></el-option>
            </el-select>
          </el-col>
          <el-row class="hotel_number_sure">
            <el-button type="primary" class="sure_number" @click="chooseHousing">确定</el-button>
          </el-row>
        </el-row>
        <!-- 查看酒店按钮 -->
        <el-button type="primary" round @click="chooseCity">查看价格</el-button>
      </el-form>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 住房选择数据
      housingData: [
        { adult: 1, children: 1 },
        { adult: 2, children: 2 },
        { adult: 3, children: 3 },
        { adult: 4, children: 4 },
        { adult: 5, children: 5 },
        { adult: 6, children: 6 }
      ],
      form: {
        id:0,
        hotelCity: "南京市", // 查询城市
        hoteldate: "", //住房时间
        number: "", // 住房人数
        adult: "2", //成人
        children: "0" //儿童
      },
      isShow: false //选择人数的菜单是否显示
    };
  },
  mounted() {},
  methods: {
    // 选择城市时触发筛选
    chooseCity(){
      const {id} = this.form
      this.$router.push({ path: 'hotel', query: { city:id }})
    },
    // 选择城市时触发
    handleSelect(item){
      this.form.hotelCity = item.name
      this.form.id = item.id
    },
    //搜索建议
      // value 是选中的值，cb是回调函数，接收要展示的列表
       async queryDepartSearch(value, cb){
         const res = await this.findCity(value)
         cb(res)
        },
        findCity(queryString){
          return new Promise((revoled,reject)=>{
            if(queryString.length == 0){
              revoled([])
              return
            }
            this.$axios({
               url:'/airs/city',
               params:{name:queryString}
           }).then(res=>{
               const {data} = res.data
              const newData = data.map(v=>{
                   v.value = v.name.replace("市",""); 
                   return v
               })
               revoled(data)
           })
          })
        },
    // 下拉菜单返回的数据
    // 显示选择框
    chooseHousing() {
      //判断人数
      if (this.form.adult > 0 && this.form.children > 0) {
        this.form.number = `${this.form.adult} 位成人 ${this.form.children} 位儿童`;
      } else if (this.form.adult > 0 && this.form.children == 0) {
        this.form.number = `${this.form.adult} 位成人`;
      } else if (this.form.adult == 0 && this.form.children > 0) {
        this.form.number = `${this.form.children} 位儿童`;
      } else if (this.form.adult == 0 && this.form.children == 0) {
        this.form.number = "";
      }
      this.isShow = false;
    }
  }
};
</script>
<style lang="less" scoped>
.Hotel_filtrate {
  width: 1000px;
  display: inline-block;
  position: relative;
  .hotel_inquire {
    width: 200px;
    display: inline-block;
  }
  .hotel_Date {
    display: inline-block;
  }
  .hotel_number {
    display: inline-block;
  }
  .hotel_adult {
    width: 325px;
    z-index: 999;
    height: 115px;
    position: absolute;
    top: 50px;
    right: 110px;
    box-shadow: 0px 0px 5px #ccc;
    padding: 15px 10px 0;
    background: #fff;
  }
  .hotel_number_sure {
    width: 100%;
    margin-top: 50px;
    border-top: 1px solid #ccc;
    .sure_number {
      width: 56px;
      height: 28px;
      font-size: 12px;
      line-height: 12px;
      padding: 1px;
      margin: 10px 0 0 230px;
      text-align: center;
    }
  }
  .hotel_select {
    width: 90px;
    height: 20px;
    position: relative;
  }
  .hotel_select_adult {
    &::after {
      position: absolute;
      top: 5px;
      left: 30px;
      font-size: 12px;
      content: "成人";
    }
  }
  .hotel_select_children {
    &::after {
      position: absolute;
      top: 5px;
      left: 30px;
      font-size: 12px;
      content: "儿童";
    }
  }
}
</style>