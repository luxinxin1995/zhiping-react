// 包含n个reducer函数：根据旧的state和指定的action返回一个新的state
import { combineReducers } from 'redux';
import { AUTH_SUCCESS,ERROR_MSG } from "./action-types";
const initUser = {
    username:'',
    type:'', //用户类型
    msg:'',//错误提示信息
    redirectTo: '' // 需要自动跳转的路由 path
}
function user(state = initUser,action) {
    switch (action.type) {
        case AUTH_SUCCESS: //data是user
            return {...action.data,redirectTo: '/'}
        case ERROR_MSG://data是msg
            return {...state,msg:action.data}
        default:
            return state;
    }
}
// 向外暴露的状态结构
export default combineReducers({
    user
})