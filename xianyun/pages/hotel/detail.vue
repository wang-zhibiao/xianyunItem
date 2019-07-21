<template>
    <div class="hotel-detail">
        <!-- 酒店详情轮播图 -->
        <Detailsliper :data="dataList" />
        <!-- 酒店地图 -->
        <DetailMap/>
        <!-- 酒店详细信息 -->
        <DetailNews/>
        <!-- 酒店评论 -->
        <DetailComment :data="dataList"/>
    </div>
</template>
<script>
import Detailsliper from '@/components/hotel/detailsliper'
import DetailMap from '@/components/hotel/detailMap'
import DetailNews from '@/components/hotel/detailNews'
import DetailComment from '@/components/hotel/detailComment'

export default {
    data() {
        return {
            dataList:{
                scores:{}
            }
        }
    },
    components: {
        Detailsliper,DetailMap,DetailNews,DetailComment
    },
    mounted(){
        this.$axios({
            baseURL:'http://157.122.54.189:9095',
            url:'hotels',
            params:{
                id:19
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
}
</style>