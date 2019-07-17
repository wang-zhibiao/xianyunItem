<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" label-width="80px" :model="form">
            <el-form-item label="出发城市">
                <!-- fetch-suggestions 返回输入建议的方法 -->
                <!-- select 点击选中建议项时触发 -->
                <el-autocomplete
                v-model="form.departCity"
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                class="el-autocomplete"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="到达城市">
                <el-autocomplete
                 v-model="form.destCity"
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                v-model="form.departDate"
                @change="handleDate">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
       
      </div>
</template>

<script>
import mement from 'moment'
export default {
    data(){
        return {
           
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,
             form: {
                departCity: "", // 出发城市
                departCode: "", // 出发城市代码
                destCity: "",  // 到达城市
                destCode: "",  // 到达城市代码
                departDate: "", // 日期字符串
            },
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            if(index == 1){
              this.$message.warning('暂不支持往返')
            }
        },
        
        // 出发城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
       async queryDepartSearch(value, cb){
         const res = await this.findCity(value)
         if(res.length>0){
           this.form.departCity = res[0].value;
           this.form.departCode = res[0].sort;
         }
         cb(res)
        },
        findCity(queryString){
          return new Promise((revoled,reject)=>{
            if(queryString.trim().length == 0){
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
               revoled(newData)
           })
          })
        },
        // 目标城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
       async queryDestSearch(value, cb){
          const res = await this.findCity(value)
         if(res.length>0){
           this.form.destCity = res[0].value;
           this.form.destCode = res[0].sort;
         }
         cb(res)
        },
       
        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
            console.log(item);
            this.form.departCity = item.value;
            this.form.departCode = item.sort;
        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            this.form.destCity = item.value;
            this.form.destCode = item.sort;
        },

        // 确认选择日期时触发
        handleDate(value){
           console.log(value);
           //时间的解析
           this.form.departDate = mement(value).format('YYYY-MM-DD')
        },

        // 触发和目标城市切换时触发
        handleReverse(){
          //解构出来互换
          const {departCity,departCode,destCity,destCode} = this.form
            this.form.departCity = destCity
            this.form.departCode = destCode

            this.form.destCity = departCity
            this.form.destCode = departCode
        },

        // 提交表单是触发
        handleSubmit(){
           console.log(this.form);
           let vilde = true;
           const rules = [
             {
               message:'请输入出发城市',
               rule:this.form.departCity
             },
             {
               message:'请输入到达城市',
               rule:this.form.destCity
             },{
               message:'请输入出发日期',
               rule:this.form.departDate
             }
           ]
          rules.map(v =>{
            if(v.rule.length == 0){
              vilde = false;
              return setTimeout(()=>{
                this.$message.warning(v.message)
              },100)
            }
           })
           // 如果为false时需要转化为true 让他进入if return 停止
           if(!vilde) return
          this.$router.push({
            path:'/air/flights',
            query:this.form
          })
        }
    },
    mounted() {
     
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>