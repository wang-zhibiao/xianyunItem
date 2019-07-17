//数据存储
export const state =() => ({
    token:'',
    userInfo:{}
})
//数据处理函数
export const mutations = {
    // 登录数据存储
    serUserInfo(state,val){
        state.userInfo = val
        // localStorage.setItem('store',JSON.stringify(val))
    },
    //清除本地存储
    clearuserInfo(state){
        localStorage.removeItem('store')
        state.userInfo = {}
    }
}
//异步执行请求
export const actions = {
    // 登录请求  {commit} 是从store解构的
    login({commit},data){
        return this.$axios({
            url:'/accounts/login',
            method:"post",
            data
        })
        .then(res=>{
             commit('serUserInfo',res.data)
        })
    }
}
