<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <!-- <OrderForm :data="infoData"/> -->
            <OrderForm />

            <!-- 侧边栏 -->
            <OrderAside :data="$store.state.air.infoData"/>
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm"
import OrderAside from "@/components/air/orderAside"
export default {
    components: {
        OrderForm,OrderAside
    },
    data(){
        return{
             // 存储机票的保险信息
            infoData:{
                insurances:[],
                 seat_infos: {}
            }
        }
    },
    updated () {
    //     // 解构url的请求
    //   const {query} = this.$route
    //   this.$axios({
    //       url:`/airs/${query.id}`,
    //       params:{
    //           seat_xid: query.xid
    //       }
    //   }).then(res=>{
    //     //   console.log(res);
    //       this.infoData = res.data;
    //   })
    }
    
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>