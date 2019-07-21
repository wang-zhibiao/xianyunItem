<template>
    <div class="HotelList">
        <el-row type="flex" justify="space-between">
            <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
                <nuxt-link to="#"> 
                    <img data-v-0a769ebc="" 
                src="http://qcloud.dpfile.com/pc/wQ2ejOSmhB4OoEq1LYPHp_2RhNciyW026YiQFr_EEZsQrI_ZB6abZPwgKDOmI03U3dWYFEM5hoslgWXTJDjSPA.jpg" alt="好来阁商务宾馆" width="320" height="210">
            </nuxt-link>
               </el-col>
            <el-col :span="10">
                <h4>
                    <nuxt-link to="#">好来阁商务宾馆</nuxt-link>
                </h4>
                <el-col>
                    <span>hao lai ge shang wu hotel</span>
                    <i class="iconfont iconhuangguan" style="color:#f90"></i>
                    <i class="iconfont iconhuangguan" style="color:#f90"></i>
                    <i class="iconfont iconhuangguan" style="color:#f90"></i>
                    <span>经济型</span>
                <el-row type="flex" justify="space-between">
                    <el-col :span="10">
                        <div class="levels">
                            <span class="el-rate__item" style="cursor: auto;"><i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"></i></span>
                            <span class="el-rate__text" style="color: rgb(255, 153, 0);">3.5分</span>
                            </div>
                    </el-col>
                    <el-col :span="7">
                        <span>99</span>
                        条评价
                    </el-col>
                    <el-col :span="7">
                         <span>99</span>
                        篇游记
                    </el-col>
                </el-row>
                <el-row>
                    <i class="iconfont iconlocation"></i>
                    <span>位于: 高淳县淳溪镇镇兴路118号(高淳县委党校对面)</span>
                </el-row>
                </el-col>
            </el-col>
            <el-col :span="6">
                <el-row type="flex" justify="space-between">
                    <el-col :span="12">携程</el-col>
                    <el-col :span="12"><span>￥99</span>起></el-col>
                </el-row>
                <el-row type="flex" justify="space-between">
                    <el-col :span="12">携程</el-col>
                    <el-col :span="12"><span>￥99</span>起></el-col>
                </el-row>
                <el-row type="flex" justify="space-between">
                    <el-col :span="12">携程</el-col>
                    <el-col :span="12"><span>￥99</span>起></el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
.HotelList{
    width: 1000px;
    margin: 0 auto;
}
</style>