
import {Message} from 'element-ui'
export default ({$axios,redirect}) =>{
    $axios.onError(err=>{
        console.log(err.response);
        const { statusCode,message} = err.response.data
        if(statusCode === 400){
            Message.error(message);
        }
        // 如果返回的是401 就跳转到登录
        if( statusCode === 401 || statusCode === 403 ){
            // 跳转到登录页
            redirect("/user/login");
        }
    })
}