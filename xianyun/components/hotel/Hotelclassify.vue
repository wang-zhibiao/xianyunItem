<template>
  <div class="Hotelclassify">
    <el-row type="flex" justify="space-between">
      <el-col :span="8" class="hotel_price">
        <el-row>
          <el-col :span="12">价格</el-col>
          <el-col :span="12" class="price_right">0-{{price*40}}</el-col>
        </el-row>
        <el-row>
          <el-slider v-model="price" :format-tooltip="formatTooltip"></el-slider>
        </el-row>
      </el-col>
      <el-col :span="6" class="HotelSeT">
        <el-col :span="24">住宿等级</el-col>
        <el-col :span="24">
          <el-select size="mini" v-model="form.levels" class="select" border="false">
                    <el-option
                    v-for="(item,index) in Hotel.levels"
                    :key="index"
                    :label="item.name"
                    :value="item.level">
                    </el-option>
                </el-select>
        </el-col>
      </el-col>
      <el-col :span="6" class="HotelSeT">
        <el-col :span="24">住宿类型</el-col>
        <el-col :span="24">
          <el-select size="mini" v-model="form.types" class="select" border="false">
                    <el-option
                    v-for="(item,index) in Hotel.types"
                    :key="index"
                    :label="item.name"
                    :value="item.name">
                    </el-option>
                </el-select>
        </el-col>
      </el-col>
      <el-col :span="6" class="HotelSeT">
        <el-col :span="24">酒店设施</el-col>
        <el-col :span="24">
          <el-select size="mini" v-model="form.assets" class="select" border="false">
                    <el-option
                    v-for="(item,index) in Hotel.assets"
                    :key="index"
                    :label="item.name"
                    :value="item.name">
                    </el-option>
                </el-select>
        </el-col>
      </el-col>
      <el-col :span="6" class="HotelSeT">
        <el-col :span="24">酒店品牌</el-col>
        <el-col :span="24">
          <el-select size="mini" v-model="form.brands" class="select" border="false">
                    <el-option
                    v-for="(item,index) in Hotel.brands"
                    :key="index"
                    :label="item.name"
                    :value="item.name">
                    </el-option>
                </el-select>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      price: 4000,
      form:{
        levels:'不限',
         assets:'不限',
        brands:'不限',
        types:'不限'
      },
      Hotel:{
        levels:[],
        assets:[],
        brands:[],
        types:[]
      }
    }
  },
  methods: {
    formatTooltip(val) {
      return val * 40;
    },
  },
  mounted (){
   this.$axios({
      url: "/hotels/options"
    }).then(res => {
      const {data} = res.data;
      this.Hotel = data;
    });
  },
};
</script>
<style lang="less" scoped>
.Hotelclassify {
  width: 1000px;
  border: 1px solid #ccc;
  font-size: 14px;
  color: #666;
  margin: 15px;
  .hotel_price {
    padding: 5px 20px;
  }
  .price_right {
    text-align: right;
  }
  .HotelSeT {
    padding: 5px 20px;
    .select{
      width: 150px;
      height: 18px;
      padding: 10px 0;
      /deep/.el-input__inner{
        height: 18px;
        border: none;
      }
      /deep/.el-input__icon{
        line-height: 0;
      }
    }
  }
  .HotelLevel_drop {
    width: 145px;
    height: 20px;
    display: inline-block;
    .hotel_select_text {
      width: 65px;
      margin-right: 100px;
    }
    /deep/.el-icon-arrow-down {
      margin-left: 50px;
    }
  }
}
</style>