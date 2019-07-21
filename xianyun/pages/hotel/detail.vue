<template>
    <div class="">
        <!-- 酒店详情轮播图 -->
        <Detailsliper/>
        <!-- 酒店地图 -->
        <DetailMap/>
        <!-- 酒店详细信息 -->
        <DetailNews/>
        <!-- 酒店评论 -->
        <DetailComment/>
    </div>
</template>
<script>
import Detailsliper from '@/components/hotel/detailsliper'
import DetailMap from '@/components/hotel/detailMap'
import DetailNews from '@/components/hotel/detailNews'
import DetailComment from '@/components/hotel/detailComment'

export default {
    components: {
        Detailsliper,DetailMap,DetailNews,DetailComment
    }
}
</script>
<style lang="less" scoped>
</style>