<template>
    <div class="Hotel_strategy">
        <!-- 区域 -->
        <el-row class="hotel_area">
            <el-col :span="3">区域:</el-col>
            <el-col :span="19">
                <el-row>
                    <el-col :span="24" :class="{area_content:true,hidden:isShowArea}">
                         <nuxt-link to="#">镇兴路沿线视觉艺术学院大成名店南京西站铜山镇大桥南路宝塔路沿线宝塔路/万
                         辰苏果珠江路沿线华侨城江浦东屏镇南京南站/明发北岭路沿线苜蓿园弘阳广场/新一城新街口地
                         区紫金山/孝陵卫火车站/玄武湖东坝镇禄口机场奥体中心雨润大街新模范马路将军山国际慢城云鼎
                         时尚街区百家湖湖南路竹山路沿线南大/南师大江宁滨江开发区湖熟镇南大和园君临紫金商业街大西门建邺万
                         达江宁科学园顾家欧亚达高淳老街谷里汤山镇雄州</nuxt-link>
                         </el-col>
                         <nuxt-link to="#"><i class="el-icon-d-arrow-right" @click="show_content" :class="{icon_hide:!isShowArea,icon_show:isShowArea}"></i>等43个区域</nuxt-link>
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
    data(){
        return{
            isShowArea:false // 显示区域
        }
    },
    mounted () {
         
    },
    methods: {
        //显示详情
        show_content(){
            this.isShowArea = !this.isShowArea
        }

    }
}
</script>
<style lang="less" scoped>
.Hotel_strategy{
    color: #666;
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