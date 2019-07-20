//数据存储
export const state =() => ({
    infoData:{
      insurances:[],
      seat_infos: {}
    },
    AllPrice:30
})
//数据处理函数
export const mutations = {
   setAsideData(state,data){
    state.infoData = data
   },
   setAllPrice(state,price){
     state.AllPrice = price
   }
}
//异步执行请求
export const actions = {
  sendCode(stpre,phoneNumber ){
    return this.$axios({
        url: "/captchas",
        method: "POST",
        data: { tel:phoneNumber  }
      }).then(res => {
        console.log(res);
        return res.data.code
        // this.$confirm(`验证码是:${res.data.code}`, "验证码", {
        //   confirmButtonText: "确定",
        //   showCancelButton: false,
        //   type: "success"
        // });
      });
  }
}
