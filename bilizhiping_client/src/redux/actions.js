import { reqRegister, reqLogin, reqUpdateUser } from '../api/index'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER,RESET_USER } from "./action-types";

// 授权成功的同步action
const authSuccess = (user) => ({
    type: AUTH_SUCCESS,
    data: user
})
// 错误提示信息的同步action
const errorMsg = (msg) => ({
    type: ERROR_MSG,
    data:msg
})
// 接收用户的同步action
const receiveUser = (user) => ({
    type:RECEIVE_USER,
    data:user
})
// 重置用户的同步action
const resetUser = (msg) => ({
    type:RESET_USER,
    data:msg
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
    for(var key in user){
        if(!user[key]) {
            return resetUser('请完善个人信息！')
        }
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