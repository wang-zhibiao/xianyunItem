<template>
    <div class="Hotel_strategy">
        <!-- 区域 -->
        <el-row class="hotel_area">
            <el-col :span="3">区域:</el-col>
            <el-col :span="19">
                <el-row>
                    <el-col :span="24" :class="{area_content:true,hidden:isShowArea}">
                        <nuxt-link to="#">全部</nuxt-link>
                        <span v-for="(item,index) in strategy" :key="index" :id="item.id">
                            <nuxt-link :to="`/hotel?city=${item.city}&scenic=${item.id}`" class="strategy_id">{{item.name}}</nuxt-link>
                        </span>
                         
                         </el-col>
                         <nuxt-link to="#"><i class="el-icon-d-arrow-right" @click="show_content" :class="{icon_hide:!isShowArea,icon_show:isShowArea}"></i>等{{strategy.length}}个区域</nuxt-link>
                </el-row>
            </el-col>
        </el-row>
        <!-- 攻略 -->
        <el-row class="hotel_particulars">
            <el-col :span="3" >攻略:</el-col>
            <el-col :span="19">
                <el-row>
                    <el-col :span="24">
北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</el-col>
                </el-row>
            </el-col>
        </el-row>
        <!-- 均价 -->
        <el-row class="average_price">
            <el-col :span="3">均价:</el-col>
            <el-col :span="19">
                <el-row>
                    <el-col :span="24">
                        <el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估。" placement="bottom-start">
                            <span class="HotelLever">
                                <i class="iconfont iconhuangguan" style="color:#f90"></i>
                                <i class="iconfont iconhuangguan" style="color:#f90"></i>
                                <i class="iconfont iconhuangguan" style="color:#f90"></i>
                                <span class="aver_price">$999</span>
                            </span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估。" placement="bottom-start">
                            <span class="HotelLever">
                                <i class="iconfont iconhuangguan" style="color:#f90"></i>
                                <i class="iconfont iconhuangguan" style="color:#f90"></i>
                                <i class="iconfont iconhuangguan" style="color:#f90"></i>
                                <i class="iconfont iconhuangguan" style="color:#f90"></i>
                                <span class="aver_price">$9999</span>
                            </span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估。" placement="bottom-start">
                            <span class="HotelLever">
                                <i class="iconfont iconhuangguan" style="color:#f90"></i>
                                <i class="iconfont iconhuangguan" style="color:#f90"></i>
                                <i class="iconfont iconhuangguan" style="color:#f90"></i>
                                <i class="iconfont iconhuangguan" style="color:#f90"></i>
                                <i class="iconfont iconhuangguan" style="color:#f90"></i>
                                <span class="aver_price">$99999</span>
                            </span>
                        </el-tooltip>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    props:['name'],
    data(){
        return{
            strategy:[
            ],
            isShowArea:false // 显示区域
        }
    },
    mounted () {
         this.getCityStrategy()
    },
    watch: {
      $route(){
           this.getCityStrategy()
      }  
    },
    methods: {
        //显示详情
        show_content(){
            this.isShowArea = !this.isShowArea
        },
        // 搜索城市区域景点
        getCityStrategy(){
           setTimeout(()=>{
                this.$axios({
                url:'/cities',
                params:{
                    name:this.name
                }
            }).then(res=>{
                this.strategy = res.data.data[0].scenics
            })
           },2000)
        }
    }
}
</script>
<style lang="less" scoped>
.Hotel_strategy{
    color: #666;
    .strategy_id{
        padding-right: 20px;
        &:hover{
            color:#f90;
        }
    }
    .hotel_area{
         margin-bottom: 15px;
        .area_content{
            width: 100%;
            height: 42px;
           overflow: hidden;
        }
        .hidden{
            height: 150px;
        }
        .icon_hide{
            color:red;
            transform:rotate(90deg)
        }
        .icon_show{
            color:red;
            transform:rotate(-90deg)
        }
    }
    .hotel_particulars{
        margin-bottom: 15px;
    }
    .HotelLever{
        margin-right: 15px;
    }
    .average_price{
         margin-bottom: 15px;
    }
}
</style>