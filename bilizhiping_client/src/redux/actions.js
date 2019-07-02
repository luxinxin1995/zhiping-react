import { reqRegister, reqLogin, reqUpdateUser, reqGetUser, reqUsersByType } from '../api/index'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST } from "./action-types";
// 引入socket.io实现聊天功能
import io from 'socket.io-client'
/*
 单例对象：1.创建对象之前：判断对象是否已经存在，只有不存在才创建
 2.创建对象之后：保存对象
*/
function initIO() {
    if (!io.socket) {
        // 连接服务器，得到与服务器的连接对象
        io.socket = io('ws://localhost:4000')
        // 绑定监听，接收服务器发送的消息
        io.socket.on('receiveMsg', function (data) {
            console.log('客户端接收服务器发送的消息', data)
        })
    }
}
// 发送消息的异步action
export const sendMsg = ({ from, to, content }) => {
    return dispatch => {
        console.log('send msg', { from, to, content })
        initIO()
        // 发消息
        io.socket.emit('sendMsg',{from,to,content})
    }
}

// 授权成功的同步action
const authSuccess = (user) => ({
    type: AUTH_SUCCESS,
    data: user
})
// 错误提示信息的同步action
const errorMsg = (msg) => ({
    type: ERROR_MSG,
    data: msg
})
// 接收用户的同步action
const receiveUser = (user) => ({
    type: RECEIVE_USER,
    data: user
})
// 重置用户的同步action
export const resetUser = (msg) => ({
    type: RESET_USER,
    data: msg
})
// 重置用户的同步action
export const receiveUserList = (users) => ({
    type: RECEIVE_USER_LIST,
    data: users
})

// 包含n个action creater，异步action，同步action
export const register = ({ username, password, confirmPassword, type }) => {
    if (!username || !password || !type) {
        return errorMsg('用户名密码必须输入！')
    }
    if (password !== confirmPassword) {
        return errorMsg('两次密码输入不一致！')
    }
    return async dispatch => {
        const response = await reqRegister({ username, password, type })
        const result = response.data
        if (result.code === 0) {
            // 分发成功的action
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}
export const login = ({ username, password }) => {
    if (!username || !password) {
        return errorMsg('用户和密码必须输入！')
    }
    return async dispatch => {
        const response = await reqLogin({ username, password })
        const result = response.data
        if (result.code === 0) {
            // 分发成功的action
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}

// 更新用户信息
export const updateUser = (user) => {
    if (!user.header) {
        return errorMsg('请完善个人信息！')
    }
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if (result.code === 0) {
            // 分发成功的action
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

// 获取用户异步action
export const getUser = () => {
    return async dispatch => {
        const response = await reqGetUser()
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}
// 获取列表用户
export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUsersByType(type)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}
