//数据存储
export const state =() => ({
   
})
//数据处理函数
export const mutations = {
   
}
//异步执行请求
export const actions = {
  sendCode(tel){
    return this.$axios({
        url: "/captchas",
        method: "POST",
        data: { tel }
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
