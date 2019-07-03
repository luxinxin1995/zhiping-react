// 包含n个reducer函数：根据旧的state和指定的action返回一个新的state
import { combineReducers } from 'redux';
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG } from "./action-types";
import { getRedirectTo } from "../utils/index";
const initUser = {
    header: '',
    username: '',
    type: '', //用户类型
    msg: '',//错误提示信息
    redirectTo: '' // 需要自动跳转的路由 path
}
const initUserList = []
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
function userList(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state;
    }
}
// 产生聊天状态的reducer
const initChat = {
    users: {},//所有用户信息的对象，属性名userid，属性值：{username，header}
    chatMsgs: [],//当前用户所有相关msg数组
    unReadCount: 0//总未读msg数量
}
function chat(state = initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const {users,chatMsgs} = action.data
            return {
                users,
                chatMsgs,
                unReadCount:0
            }
        case RECEIVE_MSG:
            const chatMsg = action.data
            return {
                users:state.users,
                chatMsgs:[...state.chatMsgs,chatMsg],
                unReadCount:0
            }
        default:
            return state;
    }
}
// 向外暴露的状态结构
export default combineReducers({
    user, userList, chat
})


