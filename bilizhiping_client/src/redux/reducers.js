// 包含n个reducer函数：根据旧的state和指定的action返回一个新的state
import { combineReducers } from 'redux';
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER } from "./action-types";
import { getRedirectTo } from "../utils/index";
const initUser = {
    header: '',
    username: '',
    type: '', //用户类型
    msg: '',//错误提示信息
    redirectTo: '' // 需要自动跳转的路由 path
}
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS: //data是user
            const { type, header } = action.data
            return { ...action.data, redirectTo: getRedirectTo(type, header) }
        case ERROR_MSG://data是msg
            return { ...state, msg: action.data }
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return { ...initUser, msg: action.data }
        default:
            return state;
    }
}
// 向外暴露的状态结构
export default combineReducers({
    user
})


