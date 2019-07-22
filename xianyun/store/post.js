export const state = () => ({
   
    postInfo:[]
})

export const mutations = {
    // 登录数据存储
    setpostInfo(state,val){
        state.postInfo = [...val]
    }
    
}
