<template>
    <div class="hotel-detail">
        <!-- 酒店头部 -->
        <HotelHeader :data="dataList" />
        <!-- 酒店详情轮播图 -->
        <Detailsliper :data="dataList"/>
        <!-- 酒店地图 -->
        <DetailMap />
        <!-- 酒店详细信息 -->
        <DetailNews :data="dataList"/>
        <!-- 酒店评论 -->
        <DetailComment :data="dataList"/>
    </div>
</template>
<script>
import Detailsliper from "@/components/hotel/detailsliper";
import DetailMap from "@/components/hotel/detailMap";
import DetailNews from "@/components/hotel/detailNews";
import DetailComment from "@/components/hotel/detailComment";
import HotelHeader from "@/components/hotel/hotelHeader";

export default {
    data() {
        return {
            dataList:{
                scores:{},
                hotelbrand:{}
            },
            mapData:[]
        }
    },
    components: {
        Detailsliper,DetailMap,DetailNews,DetailComment,HotelHeader
    },
    mounted(){
        this.$axios({
            baseURL:'http://157.122.54.189:9095',
            url:'hotels',
            params:{
                id:this.$route.query.id
            }
        })
        .then((res) => {
            this.dataList = res.data.data[0]
        })
    },
}
</script>
<style lang="less" scoped>
.hotel-detail{
    width: 1000px;
    margin: 0 auto;
    margin-top: 20px;
}
</style>